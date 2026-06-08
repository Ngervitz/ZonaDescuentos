import {
  getActiveProducts,
  getMainProduct,
  getProductBySlug,
  getRelatedProducts,
} from "../data/products";

// TODO: replace local products.js with API/CMS source
// TODO: support admin-managed product catalog
// TODO: keep product schema backwards compatible
// TODO: support product visibility rules from API
// TODO: support future pricing updates from API

/** Future: GET /api/products */
export function listVisibleProducts() {
  return getActiveProducts();
}

/** Future: GET /api/products/:slug */
export function getProduct(slug) {
  return getProductBySlug(slug);
}

export function getFeaturedProduct() {
  return getMainProduct();
}

/** Future: GET /api/products?relatedTo=:slug */
export function listRelatedProducts(slug, limit = 2) {
  return getRelatedProducts(slug, limit);
}
