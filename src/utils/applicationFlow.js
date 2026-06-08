export const ENTRY_PATH = {
  PRODUCT_CARD: "product_card",
  PRODUCT_LANDING: "product_landing",
  HOME_FEATURED_PRODUCT: "home_featured_product",
};

export function buildProductContext(product, entryPath) {
  return {
    product_id: product?.id ?? null,
    product_slug: product?.slug ?? null,
    product_name: product?.name ?? null,
    product_category: product?.category ?? null,
    product_price_monthly: product?.priceMonthly ?? product?.pricing?.monthly ?? null,
    product_total_price: product?.totalPrice ?? null,
    product_installments: product?.installments ?? product?.pricing?.installments ?? null,
    entry_path: entryPath ?? null,
  };
}

/**
 * Central preparation point for "Ver si califico" CTAs.
 * Keeps wizard behavior unchanged; exposes future CRM/tracking context.
 */
export function prepareApplicationFlow({ product, productContext }) {
  const context = productContext ?? buildProductContext(product);

  // TODO: fire zd_product_cta_click when tracking layer is enabled
  // TODO: distinguish entry_path variants for acquisition vs cross-sell
  // TODO: include customer_origin_type and offer_source when available
  // TODO: include productContext in buildLeadPayload when CRM supports attribution fields

  return {
    ...context,
    customer_origin_type: null,
    offer_source: null,
  };
}
