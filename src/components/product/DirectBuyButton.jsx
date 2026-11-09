import MainButton from "../ui/MainButton";

/** Compra directa Handy (sin integración operativa aún). */
export default function DirectBuyButton({ productId }) {
  return (
    <MainButton type="button" disabled fullWidth className="directBuyBtn">
      Compra próximamente
      <span className="srOnly"> — producto {productId}</span>
    </MainButton>
  );
}
