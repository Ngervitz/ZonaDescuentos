import { useCallback, useState } from "react";
import { track } from "../services/tracking";
import {
  buildProductContext,
  prepareApplicationFlow,
} from "../utils/applicationFlow";

export function useWizardLauncher() {
  const [wizardProduct, setWizardProduct] = useState(null);
  const [wizardContext, setWizardContext] = useState(null);

  const openWizard = useCallback((product, productContext) => {
    if (!product?.isOperable) return;

    const context = productContext ?? buildProductContext(product);

    prepareApplicationFlow({ product, productContext: context });

    track("cta_click", {
      product_id: product.id,
      product_slug: product.slug,
    });

    if (import.meta.env.DEV) {
      console.debug("[ZonaDescuentos] wizard open", {
        product_slug: product.slug,
        productContext: context,
      });
    }

    setWizardProduct(product);
    setWizardContext(context);
  }, []);

  const closeWizard = useCallback(() => {
    setWizardProduct(null);
    setWizardContext(null);
  }, []);

  return { wizardProduct, wizardContext, openWizard, closeWizard };
}
