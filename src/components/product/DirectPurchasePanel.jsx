import { formatProductPrice } from "../../data/products";
import { directPurchaseEnabled } from "../../config/commerceFlags";
import { useCart } from "../../context/CartContext";
import MainButton from "../ui/MainButton";

export default function DirectPurchasePanel({ product }) {
  const { enabled, addProduct } = useCart();

  if (!enabled || !product?.supportsDirect) return null;

  const price =
    product.directPricing?.grossFormatted ??
    (product.directPriceGross != null ? formatProductPrice(product.directPriceGross) : null);

  if (!price) return null;

  const isDemo = product.isTestProduct;

  return (
    <div className="directPurchasePanel">
      {isDemo && (
        <p className="directPurchaseDemoBadge" role="status">
          Producto de demostración
        </p>
      )}
      <p className="directPurchaseLabel">
        {isDemo ? "Precio ilustrativo" : "Compra directa (demostración)"}
      </p>
      <p className="directPurchasePrice">{price}</p>
      <p className="directPurchaseHint">
        {isDemo
          ? "Referencia visual únicamente. No hay cobro ni checkout en esta etapa."
          : "Precio referencial en pantalla. El total final se confirmará al habilitar pedidos."}
      </p>
      <MainButton type="button" onClick={() => addProduct(product.id, 1)} fullWidth>
        Agregar al carrito
      </MainButton>
    </div>
  );
}
