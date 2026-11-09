/** Tienda ecommerce (catálogo + carrito). */
export const storeEnabled = import.meta.env.VITE_ENABLE_STORE !== "false";

/** Compra directa / carrito UI. Default alineado con tienda. */
export const directPurchaseEnabled =
  import.meta.env.VITE_ENABLE_DIRECT_PURCHASE === "true" || storeEnabled;

/** Wizard Cabal: conservado en código, deshabilitado hasta autorización explícita. */
export const wizardIntegrationEnabled = import.meta.env.VITE_ENABLE_WIZARD === "true";

/** Carrito en navegación / flujo principal (ECOM-13: compra directa Handy). */
export const cartNavEnabled = import.meta.env.VITE_ENABLE_CART_NAV === "true";
