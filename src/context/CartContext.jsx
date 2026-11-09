import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { directPurchaseEnabled } from "../config/commerceFlags";
import { getProductByIdSync, invalidateCatalogCache } from "../services/productCatalog";
import {
  CART_MAX_QTY,
  CART_MIN_QTY,
  clampQty,
  readCartLines,
  writeCartLines,
} from "../utils/cartStorage";

const CartContext = createContext(null);

function hydrateLinesSync(rawLines) {
  const hydrated = [];
  for (const row of rawLines) {
    const product = getProductByIdSync(row.productId);
    if (!product?.isActive || !product.supportsDirect) continue;
    hydrated.push({
      productId: product.id,
      qty: clampQty(row.qty),
      product,
    });
  }
  return hydrated;
}

export function CartProvider({ children }) {
  const enabled = directPurchaseEnabled;
  const [lines, setLines] = useState(() =>
    enabled ? hydrateLinesSync(readCartLines()) : [],
  );

  const persist = useCallback((nextLines) => {
    writeCartLines(nextLines.map(({ productId, qty }) => ({ productId, qty })));
    setLines(nextLines);
  }, []);

  const addProduct = useCallback(
    (productId, qty = 1) => {
      if (!enabled) return;
      const product = getProductByIdSync(productId);
      if (!product?.supportsDirect || !product.isActive) return;

      setLines((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        let next;
        if (existing) {
          next = prev.map((l) =>
            l.productId === productId
              ? { ...l, qty: clampQty(l.qty + qty), product }
              : l,
          );
        } else {
          next = [...prev, { productId, qty: clampQty(qty), product }];
        }
        writeCartLines(next.map(({ productId: id, qty: q }) => ({ productId: id, qty: q })));
        return next;
      });
    },
    [enabled],
  );

  const setQuantity = useCallback(
    (productId, qty) => {
      if (!enabled) return;
      const clamped = clampQty(qty);
      setLines((prev) => {
        const next = prev
          .map((l) => (l.productId === productId ? { ...l, qty: clamped } : l))
          .filter((l) => l.qty >= CART_MIN_QTY);
        persist(next);
        return next;
      });
    },
    [enabled, persist],
  );

  const removeProduct = useCallback(
    (productId) => {
      if (!enabled) return;
      setLines((prev) => {
        const next = prev.filter((l) => l.productId !== productId);
        persist(next);
        return next;
      });
    },
    [enabled, persist],
  );

  const refreshPrices = useCallback(() => {
    invalidateCatalogCache();
    const next = enabled ? hydrateLinesSync(readCartLines()) : [];
    setLines(next);
  }, [enabled]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      enabled,
      ready: true,
      lines,
      itemCount,
      addProduct,
      setQuantity,
      removeProduct,
      refreshPrices,
      limits: { min: CART_MIN_QTY, max: CART_MAX_QTY },
    }),
    [enabled, lines, itemCount, addProduct, setQuantity, removeProduct, refreshPrices],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart requires CartProvider");
  }
  return ctx;
}
