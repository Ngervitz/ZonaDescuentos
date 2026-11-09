const STORAGE_KEY = "zd_cart_v1";
export const CART_MIN_QTY = 1;
export const CART_MAX_QTY = 99;

export function readCartLines() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((row) => ({
        productId: String(row.productId || ""),
        qty: Number(row.qty),
      }))
      .filter((row) => row.productId && Number.isFinite(row.qty));
  } catch {
    return [];
  }
}

export function writeCartLines(lines) {
  const payload = lines.map((row) => ({
    productId: row.productId,
    qty: clampQty(row.qty),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clampQty(qty) {
  const n = Math.floor(Number(qty));
  if (!Number.isFinite(n)) return CART_MIN_QTY;
  return Math.min(CART_MAX_QTY, Math.max(CART_MIN_QTY, n));
}
