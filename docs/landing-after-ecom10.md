# Landings post ECOM-10 — comparación

Con `VITE_ENABLE_DIRECT_PURCHASE=false` (default), la landing de producto **wizard** (`purchaseModes: ['wizard']`) mantiene:

| Elemento | Baseline | Después |
|----------|----------|---------|
| ProductOfferBox conversion | 12 cuotas desde, hook Cabal, Ver si califico, Sujeto a aprobación | **Sin cambios** (mismo componente, mismo texto) |
| ProductPagePromoBar | 4 ítems Cabal | **Igual** si `supportsWizard` |
| ProductSheetDelivery / Legal / Pre-FAQ CTA | Textos crediticios | **Igual** si `supportsWizard` |
| Header | Beneficios + Cabal | **Igual** (sin Tienda/Carrito) |
| Rutas | /, /beneficios, /producto/:slug | **Igual** |

Diferencias **solo** cuando el flag está activo o el producto incluye `direct`:

- Panel `DirectPurchasePanel` (compra con tarjeta, agregar al carrito).
- Enlaces Tienda / Carrito en header.
- Rutas `/tienda` y `/carrito`.
- Producto `smart-tv` tiene además modo direct (no visible sin flag).

Cambios de carga:

- Home y PDP cargan catálogo vía `async getProduct` / `getFeaturedProduct` (breve “Cargando…”).

Productos con solo wizard: bloques Cabal idénticos al baseline documentado en `landing-baseline-ecom10.md`.
