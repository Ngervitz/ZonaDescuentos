import { useEffect, useState } from "react";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import PromoBar from "../components/sections/PromoBar";
import TrustBlock from "../components/sections/TrustBlock";
import WhyZonaSection from "../components/sections/WhyZonaSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductsSection from "../components/sections/ProductsSection";
import NotQualifiedBlock from "../components/sections/NotQualifiedBlock";
import FinalCtaSection from "../components/sections/FinalCtaSection";
import { getActiveProducts, getMainProduct } from "../data/products";
import { track } from "../services/tracking";

export default function HomePage() {
  const products = getActiveProducts();
  const mainProduct = getMainProduct();
  const [wizardProduct, setWizardProduct] = useState(null);

  useEffect(() => {
    track("home_view", {});
  }, []);

  function openWizard(product) {
    setWizardProduct(product);
    track("cta_click", {
      product_id: product.id,
      product_slug: product.slug,
    });
  }

  return (
    <main className="landing">
      <SiteHeader />
      <PromoBar />
      <TrustBlock />
      <WhyZonaSection />
      <HowItWorksSection />
      <ProductsSection products={products} onOpenWizard={openWizard} />
      <NotQualifiedBlock />
      <FinalCtaSection
        onOpenWizard={() => mainProduct && openWizard(mainProduct)}
      />
      <SiteFooter />

      {wizardProduct && (
        <Wizard product={wizardProduct} onClose={() => setWizardProduct(null)} />
      )}
    </main>
  );
}
