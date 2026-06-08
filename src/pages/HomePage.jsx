import { useEffect } from "react";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import PromoBar from "../components/sections/PromoBar";
import TrustBlock from "../components/sections/TrustBlock";
import WhyZonaSection from "../components/sections/WhyZonaSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductsSection from "../components/sections/ProductsSection";
import NotQualifiedBlock from "../components/sections/NotQualifiedBlock";
import FinalCtaSection from "../components/sections/FinalCtaSection";
import usePageSeo from "../hooks/usePageSeo";
import { useWizardLauncher } from "../hooks/useWizardLauncher";
import { buildProductContext, ENTRY_PATH } from "../utils/applicationFlow";
import { SITE_SEO } from "../utils/seo";
import {
  getFeaturedProduct,
  listVisibleProducts,
} from "../services/productCatalog";
import { track } from "../services/tracking";

export default function HomePage() {
  const products = listVisibleProducts();
  const mainProduct = getFeaturedProduct();
  const { wizardProduct, wizardContext, openWizard, closeWizard } = useWizardLauncher();

  usePageSeo(SITE_SEO);

  useEffect(() => {
    track("home_view", {});
  }, []);

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
        onOpenWizard={() =>
          mainProduct &&
          openWizard(
            mainProduct,
            buildProductContext(mainProduct, ENTRY_PATH.HOME_FEATURED_PRODUCT)
          )
        }
      />
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
