import { ShieldCheck } from "lucide-react";
import SancorBrand from "./SancorBrand";

export default function InsuranceBadge({ compact = false }) {
  return (
    <div className={`insuranceBadge${compact ? " insuranceBadgeCompact" : ""}`}>
      <ShieldCheck size={18} strokeWidth={2.2} aria-hidden="true" className="insuranceBadgeIcon" />
      <div className="insuranceBadgeCopy">
        <p className="insuranceBadgeTitle">Seguro incluido por 12 meses</p>
        <SancorBrand />
        {!compact && (
          <p className="insuranceBadgeSub">Protección adicional incluida en tu compra.</p>
        )}
      </div>
    </div>
  );
}
