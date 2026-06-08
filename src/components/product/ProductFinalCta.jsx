import { CheckCircle2 } from "lucide-react";
import { buildProductContext, ENTRY_PATH } from "../../utils/applicationFlow";
import YellowButton from "../ui/YellowButton";

function getTrustItems(product) {
  const items = ["100% online", "Entrega coordinada", "Respaldo Cabal"];
  if (product?.insuranceIncluded) {
    items.splice(1, 0, "Seguro incluido");
  }
  return items;
}

export default function ProductFinalCta({ product, onOpenWizard }) {
  if (!product?.isOperable) return null;

  const trustItems = getTrustItems(product);

  return (
    <section className="productFinalCta">
      <div className="productFinalCtaInner">
        <h2>¿Listo para empezar?</h2>
        <p>Elegí tu producto y verificá si calificás en minutos.</p>
        <YellowButton
          onClick={() =>
            onOpenWizard(
              product,
              buildProductContext(product, ENTRY_PATH.PRODUCT_LANDING)
            )
          }
          fullWidth
        >
          Ver si califico
        </YellowButton>
        <ul className="productFinalTrust">
          {trustItems.map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} strokeWidth={2.2} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
