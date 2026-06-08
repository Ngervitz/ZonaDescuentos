import { ShieldCheck } from "lucide-react";
import SancorBrand from "./SancorBrand";

export default function InsuranceBadge({ compact = false, hero = false }) {
  const showSub = hero || !compact;

  return (
    <div
      className={`insuranceBadge${compact && !hero ? " insuranceBadgeCompact" : ""}${hero ? " insuranceBadgeHero" : ""}`}
    >
      <ShieldCheck
        size={hero ? 26 : 18}
        strokeWidth={2.2}
        aria-hidden="true"
        className="insuranceBadgeIcon"
      />
      <div className="insuranceBadgeCopy">
        <p className="insuranceBadgeTitle">Seguro incluido por 12 meses</p>
        <SancorBrand />
        {showSub && (
          <p className="insuranceBadgeSub">Protección adicional incluida en tu compra.</p>
        )}
      </div>
    </div>
  );
}
