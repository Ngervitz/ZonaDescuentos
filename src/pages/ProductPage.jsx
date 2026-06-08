import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductHero from "../components/product/ProductHero";
import ProductMainBenefits from "../components/product/ProductMainBenefits";
import ProductFinalCta from "../components/product/ProductFinalCta";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductNotFoundPage from "./ProductNotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { useWizardLauncher } from "../hooks/useWizardLauncher";
import { buildProductContext, ENTRY_PATH } from "../utils/applicationFlow";
import { getProductSeo } from "../utils/seo";
import { getProduct, listRelatedProducts } from "../services/productCatalog";
import { track } from "../services/tracking";
import YellowButton from "../components/ui/YellowButton";

const PRODUCT_PROMO_ITEMS = [
  { emoji: "⚡", text: "Primera compra sin tarjeta" },
  { emoji: "🛡", text: "Seguro incluido" },
  { emoji: "📦", text: "Entrega coordinada" },
  { emoji: "💳", text: "Tarjeta Cabal con beneficios" },
];

function ProductPagePromoBar() {
  return (
    <div className="promoBar productPagePromoBar" aria-label="Beneficios de compra">
      {PRODUCT_PROMO_ITEMS.map((item) => (
        <div className="promoItem productPagePromoItem" key={item.text}>
          <span className="productPagePromoEmoji" aria-hidden="true">
            {item.emoji}
          </span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function ProductMidCta({ product, onOpenWizard }) {
  if (!product?.isOperable) return null;

  return (
    <section className="productMidCta">
      <div className="productMidCtaInner">
        <h2>¿Listo para empezar?</h2>
        <p className="productMidCtaCopy">
          Completá tu solicitud y verificá si calificás en minutos.
        </p>
        <YellowButton
          onClick={() =>
            onOpenWizard(
              product,
              buildProductContext(product, ENTRY_PATH.PRODUCT_LANDING)
            )
          }
          fullWidth
        >
          Ver si califico
        </YellowButton>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const related = listRelatedProducts(slug);
  const { wizardProduct, wizardContext, openWizard, closeWizard } = useWizardLauncher();
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
      <ProductPagePromoBar />
      <HowItWorksSection compact top />
      <ProductHero product={product} onOpenWizard={openWizard} />
      <ProductMainBenefits product={product} />
      <ProductMidCta product={product} onOpenWizard={openWizard} />
      <RelatedProducts products={related} onOpenWizard={openWizard} />
      <ProductFinalCta product={product} onOpenWizard={openWizard} />
      <SiteFooter />

      {wizardProduct && (
        <Wizard
          product={wizardProduct}
          productContext={wizardContext}
          onClose={closeWizard}
        />
      )}
    </main>
  );
}
