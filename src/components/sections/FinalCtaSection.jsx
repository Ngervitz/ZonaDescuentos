import { ShoppingBag } from "lucide-react";
import YellowButton from "../ui/YellowButton";

export default function FinalCtaSection({ onOpenWizard }) {
  return (
    <section className="finalBlock">
      <div className="finalBlockIcon">
        <ShoppingBag size={24} strokeWidth={2.2} />
      </div>
      <div className="finalBlockText">
        <h2>
          Productos que querés,
          <br />
          oportunidades que construís.
        </h2>
        <p>Empezá con tu primera compra y accedé a beneficios futuros con Cabal.</p>
      </div>
      <YellowButton onClick={onOpenWizard} compact>
        Ver si califico
      </YellowButton>
    </section>
  );
}
