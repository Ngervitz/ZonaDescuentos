/**
 * Smoke: localStorage solo { productId, qty }; el precio se lee del catálogo al normalizar.
 * Run: node scripts/ecom10-cart-price-smoke.mjs
 */
import { catalogProducts } from "../src/data/products.catalog.js";
import { normalizeProduct } from "../src/data/products.js";
import { writeCartLines, readCartLines } from "../src/utils/cartStorage.js";

globalThis.localStorage = {
  _data: {},
  getItem(key) {
    return this._data[key] ?? null;
  },
  setItem(key, val) {
    this._data[key] = String(val);
  },
};

const raw = catalogProducts.find((p) => p.slug === "gateway-ryzen5-8-256");
if (!raw) {
  console.error("FAIL: gateway-ryzen5-8-256 not in catalog");
  process.exit(1);
}

writeCartLines([{ productId: raw.id, qty: 2 }]);
const stored = readCartLines();
if (stored.length !== 1 || stored[0].qty !== 2) {
  console.error("FAIL: storage", stored);
  process.exit(1);
}

const before = normalizeProduct({ ...raw }).priceUsd;
const bumped = { ...raw, priceUsd: before + 50 };
const after = normalizeProduct(bumped).priceUsd;

if (after !== before + 50 || stored[0].productId !== raw.id) {
  console.error("FAIL", { before, after, stored });
  process.exit(1);
}

console.log("PASS: storage ids/qty only; price follows catalog", { stored, before, after });
