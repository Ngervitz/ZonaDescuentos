import { useEffect, useState } from "react";
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
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { track } from "../services/tracking";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const related = getRelatedProducts(slug);
  const [wizardProduct, setWizardProduct] = useState(null);

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

  function openWizard(target) {
    setWizardProduct(target);
    track("cta_click", {
      product_id: target.id,
      product_slug: target.slug,
    });
  }

  return (
    <main className="landing landingProduct">
      <SiteHeader />
      <PromoBar />
      <ProductHero product={product} onOpenWizard={openWizard} />
      <ProductIncludesSection product={product} />
      <ProductDetailsSection product={product} />
      <HowItWorksSection />
      <InsuranceSection product={product} />
      <ProductBenefitsSection />
      <RelatedProducts products={related} onOpenWizard={openWizard} />
      <SiteFooter />

      {wizardProduct && (
        <Wizard product={wizardProduct} onClose={() => setWizardProduct(null)} />
      )}
    </main>
  );
}
