import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import PromoBar from "../components/sections/PromoBar";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductHero from "../components/product/ProductHero";
import ProductIncludesSection from "../components/product/ProductIncludesSection";
import ProductDetailsSection from "../components/product/ProductDetailsSection";
import InsuranceSection from "../components/product/InsuranceSection";
import ProductBenefitsSection from "../components/product/ProductBenefitsSection";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductNotFoundPage from "./ProductNotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { useWizardLauncher } from "../hooks/useWizardLauncher";
import { ENTRY_PATH } from "../utils/applicationFlow";
import { getProductSeo } from "../utils/seo";
import { getProduct, listRelatedProducts } from "../services/productCatalog";
import { track } from "../services/tracking";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const related = listRelatedProducts(slug);
  const { wizardProduct, openWizard, closeWizard } = useWizardLauncher();
  const seo = useMemo(() => getProductSeo(product), [product]);

  usePageSeo(seo);

  useEffect(() => {
    if (!product) return;

    track("product_view", {
      product_id: product.id,
      product_slug: product.slug,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return (
    <main className="landing landingProduct">
      <SiteHeader />
      <PromoBar />
      <ProductHero
        product={product}
        onOpenWizard={(target) => openWizard(target, ENTRY_PATH.PRODUCT_HERO)}
      />
      <ProductIncludesSection product={product} />
      <ProductDetailsSection product={product} />
      <HowItWorksSection />
      <InsuranceSection product={product} />
      <ProductBenefitsSection />
      <RelatedProducts
        products={related}
        onOpenWizard={(target) => openWizard(target, ENTRY_PATH.PRODUCT_RELATED)}
      />
      <SiteFooter />

      {wizardProduct && <Wizard product={wizardProduct} onClose={closeWizard} />}
    </main>
  );
}
