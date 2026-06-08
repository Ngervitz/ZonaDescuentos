import { Lock } from "lucide-react";
import { formatProductPrice } from "../../data/products";
import YellowButton from "../ui/YellowButton";
import InsuranceBadge from "./InsuranceBadge";

export default function ProductOfferBox({
  product,
  onOpenWizard,
  showWizardCta = true,
  compact = false,
}) {
  const canApply = product.isOperable && showWizardCta;

  return (
    <div className={`productOfferBox${compact ? " productOfferBoxCompact" : ""}`}>
      <div className="productPriceBox">
        <span className="productPriceLabel">{product.installments} cuotas desde</span>
        <strong className="productPriceMain">{formatProductPrice(product.priceMonthly)}</strong>
        <span className="productPriceUnit">por cuota</span>
        <p className="productPricePtf">
          PTF total: <span>{formatProductPrice(product.totalPrice)}</span>
        </p>
      </div>

      {product.insuranceIncluded && <InsuranceBadge compact={compact} />}

      {canApply ? (
        <YellowButton onClick={() => onOpenWizard(product)} fullWidth>
          Ver si califico
        </YellowButton>
      ) : (
        <button type="button" className="btnComingSoon" disabled>
          Próximamente
        </button>
      )}

      <p className="productCardLegal">*Sujeto a aprobación crediticia.</p>
      <p className="productCardSecure">
        <Lock size={13} strokeWidth={2.2} />
        Tus datos están protegidos.
      </p>
    </div>
  );
}
