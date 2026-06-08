import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ProductBenefitsSection() {
  return (
    <section className="productBenefitsSection">
      <div className="productBenefitsInner">
        <div className="productBenefitsIcon">
          <Sparkles size={22} strokeWidth={2} />
        </div>
        <div className="productBenefitsCopy">
          <h2>Beneficios después de tu compra</h2>
          <p>
            Además del producto, podés acceder a beneficios Cabal y futuras oportunidades.
          </p>
          <Link to="/beneficios" className="productBenefitsLink">
            Conocer beneficios
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
