import { ShieldCheck } from "lucide-react";
import SancorBrand from "./SancorBrand";

export default function InsuranceSection({ product }) {
  if (!product.insuranceIncluded) return null;

  return (
    <section className="insuranceSection">
      <div className="insuranceSectionInner">
        <div className="insuranceSectionIcon">
          <ShieldCheck size={24} strokeWidth={2} />
        </div>
        <div className="insuranceSectionCopy">
          <h2>Seguro Sancor incluido por 12 meses</h2>
          <p>Tu compra incluye protección adicional durante 12 meses.</p>
          <SancorBrand />
        </div>
      </div>
    </section>
  );
}
