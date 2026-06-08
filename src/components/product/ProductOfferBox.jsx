import { ShieldCheck } from "lucide-react";
import { formatProductPrice } from "../../data/products";
import { buildProductContext, ENTRY_PATH } from "../../utils/applicationFlow";
import YellowButton from "../ui/YellowButton";

const SOCIAL_PROOF_LINE =
  "Compra simple y 100% online. Proceso rápido y sin trámites presenciales.";

export default function ProductOfferBox({
  product,
  onOpenWizard,
  showWizardCta = true,
  variant = "default",
  wizardEntryPath = ENTRY_PATH.PRODUCT_LANDING,
}) {
  const canApply = product.isOperable && showWizardCta;
  const isConversion = variant === "conversion";
  const installments = product.installments ?? 12;

  return (
    <div className={`productOfferBox${isConversion ? " productOfferBoxConversion" : ""}`}>
      <div className="productPriceBox productPriceBoxHero">
        <span className="productPriceLabel">{installments} cuotas desde</span>
        <strong className="productPriceMain">{formatProductPrice(product.priceMonthly)}</strong>
        {isConversion && (
          <p className="productHeroHook">
            <span>Tu primera compra sin tarjeta.</span>
            <span>
              Recibí tu producto y accedé a tu tarjeta Cabal si calificás.
            </span>
          </p>
        )}
        {product.totalPrice > 0 && !isConversion && (
          <p className="productPricePtf">
            PTF total: <span>{formatProductPrice(product.totalPrice)}</span>
          </p>
        )}
      </div>

      {product.insuranceIncluded && (
        <div className="productInsuranceCompact">
          <ShieldCheck size={14} strokeWidth={2.4} aria-hidden="true" />
          <div className="productInsuranceCompactCopy">
            <strong>Seguro Sancor incluido por 12 meses</strong>
            <span>Protección adicional incluida.</span>
          </div>
        </div>
      )}

      {canApply ? (
        <YellowButton
          onClick={() =>
            onOpenWizard(product, buildProductContext(product, wizardEntryPath))
          }
          fullWidth
        >
          Ver si califico
        </YellowButton>
      ) : (
        <button type="button" className="btnComingSoon btnComingSoonFull" disabled>
          Próximamente
        </button>
      )}

      {isConversion && (
        <p className="productHeroSocialProof">{SOCIAL_PROOF_LINE}</p>
      )}

      <p className="productCardLegal">Sujeto a aprobación crediticia.</p>
    </div>
  );
}
