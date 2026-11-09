import { catalogProducts, MAIN_PRODUCT_SLUG } from "../data/products.catalog.js";
import { demoProducts } from "../data/products.demo.js";
import { normalizeProduct } from "../data/products.js";

/**
 * Catálogo local con interfaz async (futura API JANUS).
 * Inicialización síncrona: sin estados "Cargando…" en el cliente.
 * Carrito: solo { productId, qty } en localStorage; precios se resuelven aquí en cada carga.
 */

let normalizedCatalog = null;

function buildCatalog() {
  const rows = [...catalogProducts, ...demoProducts];
  return rows.map((row) => normalizeProduct(row)).filter(Boolean);
}

function getCatalog() {
  if (!normalizedCatalog) {
    normalizedCatalog = buildCatalog();
  }
  return normalizedCatalog;
}

async function ensureCatalog() {
  return getCatalog();
}

/** Invalida caché en memoria (p. ej. hot reload DEV). */
export function invalidateCatalogCache() {
  normalizedCatalog = null;
}

function isListable(product) {
  return Boolean(product?.isVisible);
}

function listableProducts(products) {
  return products.filter(isListable);
}

function filterByCategory(products, category) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

/** GET /api/products */
export async function getProducts({ category = null } = {}) {
  const all = listableProducts(getCatalog());
  return filterByCategory(all, category);
}

export function getProductsSync(opts = {}) {
  const all = listableProducts(getCatalog());
  return filterByCategory(all, opts.category || null);
}

/** GET /api/products/:slug */
export async function getProduct(slug) {
  return getProductSync(slug);
}

export function getProductSync(slug) {
  if (!slug) return null;
  const product = getCatalog().find((p) => p.slug === slug);
  if (!product || product.status === "inactive") return null;
  return product;
}

export async function getProductById(id) {
  return getProductByIdSync(id);
}

export function getProductByIdSync(id) {
  if (!id) return null;
  const product = getCatalog().find((p) => p.id === id);
  if (!product || product.status === "inactive") return null;
  return product;
}

export async function listCategories() {
  return listCategoriesSync();
}

export function listCategoriesSync() {
  const products = getProductsSync();
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}

export async function getFeaturedProduct() {
  return getFeaturedProductSync();
}

export function getFeaturedProductSync() {
  const all = listableProducts(getCatalog());
  const main =
    all.find((p) => p.isMain && p.status === "active" && p.supportsWizard) ??
    all.find((p) => p.status === "active" && p.supportsWizard);
  return main ?? null;
}

export async function listRelatedProducts(slug, limit = 2) {
  return listRelatedProductsSync(slug, limit);
}

export function listRelatedProductsSync(slug, limit = 2) {
  const source = getProductSync(slug);
  const all = getProductsSync();
  if (source?.isTestProduct) {
    return all.filter((p) => p.slug !== slug).slice(0, limit);
  }
  return all.filter((p) => p.slug !== slug && p.supportsWizard).slice(0, limit);
}

/** Compat: mismo que getProducts(). */
export async function listVisibleProducts() {
  return getProducts();
}

export { MAIN_PRODUCT_SLUG };
