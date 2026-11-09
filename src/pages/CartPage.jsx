import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import usePageSeo from "../hooks/usePageSeo";
import { directPurchaseEnabled } from "../config/commerceFlags";
import { formatProductPrice } from "../data/products";
import { useCart } from "../context/CartContext";

const STORE_PREP_MESSAGE =
  "Estamos preparando nuestra tienda. Por ahora podés explorar los productos y probar el carrito. Las compras estarán disponibles próximamente.";

export default function CartPage() {
  const { lines, setQuantity, removeProduct, limits } = useCart();

  usePageSeo({
    title: "Carrito | Zona Descuentos",
    description: "Carrito demostrativo (cantidades en este dispositivo).",
    noindex: true,
  });

  if (!directPurchaseEnabled) {
    return null;
  }

  return (
    <main className="landing landingCart">
      <SiteHeader />
      <section className="cartPage">
        <h1>Carrito</h1>
        <p className="cartStoreNotice">{STORE_PREP_MESSAGE}</p>
        <p className="cartPageNote">
          Guardamos solo producto y cantidad en este dispositivo. Los precios siguen el catálogo
          actual; el servidor recalculará totales cuando habilitemos pedidos.
        </p>
        {lines.length === 0 && (
          <p className="cartEmpty">
            Tu carrito está vacío.{" "}
            <Link to="/tienda">Ir a la tienda</Link>
          </p>
        )}
        {lines.length > 0 && (
          <ul className="cartLineList">
            {lines.map((line) => {
              const unit =
                line.product?.directPriceGross != null
                  ? formatProductPrice(line.product.directPriceGross)
                  : "—";
              return (
                <li className="cartLine" key={line.productId}>
                  <div className="cartLineInfo">
                    <Link to={`/producto/${line.product.slug}`}>{line.product.name}</Link>
                    {line.product?.isTestProduct && (
                      <p className="cartLineDemoTag">Producto de demostración</p>
                    )}
                    <p className="cartLinePrice">Precio ilustrativo unitario: {unit}</p>
                  </div>
                  <label className="cartQtyLabel">
                    Cant.
                    <input
                      type="number"
                      min={limits.min}
                      max={limits.max}
                      value={line.qty}
                      onChange={(e) => setQuantity(line.productId, e.target.value)}
                      className="cartQtyInput"
                    />
                  </label>
                  <button
                    type="button"
                    className="cartRemoveBtn"
                    onClick={() => removeProduct(line.productId)}
                  >
                    Quitar
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
