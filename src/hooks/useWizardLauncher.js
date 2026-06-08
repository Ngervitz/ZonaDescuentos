import { useCallback, useState } from "react";
import { track } from "../services/tracking";
import { prepareApplicationFlow } from "../utils/applicationFlow";

export function useWizardLauncher() {
  const [wizardProduct, setWizardProduct] = useState(null);

  const openWizard = useCallback((product, entryPath) => {
    if (!product?.isOperable) return;

    prepareApplicationFlow({ product, entryPath });

    track("cta_click", {
      product_id: product.id,
      product_slug: product.slug,
    });

    setWizardProduct(product);
  }, []);

  const closeWizard = useCallback(() => {
    setWizardProduct(null);
  }, []);

  return { wizardProduct, openWizard, closeWizard };
}
