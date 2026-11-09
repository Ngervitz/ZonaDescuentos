import { wizardIntegrationEnabled } from "../../config/commerceFlags";

/** Opción de financiación futura (sin CDV ni wizard hasta autorización). */
export default function FinancingPlaceholder({ product }) {
  if (wizardIntegrationEnabled || !product?.financingEligible) return null;

  return (
    <div className="financingPlaceholder" aria-label="Financiación próximamente">
      <p className="financingPlaceholderTitle">Financiación</p>
      <p className="financingPlaceholderCopy">
        Próximamente podrás elegir financiación como medio de pago en este producto. Por ahora
        solo está disponible la compra ilustrativa al carrito.
      </p>
    </div>
  );
}
