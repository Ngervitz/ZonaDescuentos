export const ENTRY_PATH = {
  HOME_PRODUCT_CARD: "cold_product_acquisition",
  HOME_FINAL_CTA: "cold_product_acquisition",
  PRODUCT_HERO: "cold_product_acquisition",
  PRODUCT_RELATED: "cold_product_acquisition",
};

/**
 * Central preparation point for "Ver si califico" CTAs.
 * Keeps wizard behavior unchanged; exposes future CRM/tracking context.
 */
export function prepareApplicationFlow({ product, entryPath }) {
  // TODO: pass product_id and product_slug to application flow
  // TODO: fire zd_product_cta_click when tracking layer is enabled
  // TODO: distinguish entry_path: cold_product_acquisition vs post_loan_cross_sell
  // TODO: include customer_origin_type and offer_source when available

  return {
    product_id: product?.id ?? null,
    product_slug: product?.slug ?? null,
    product_category: product?.category ?? null,
    entry_path: entryPath,
    customer_origin_type: null,
    offer_source: null,
  };
}
