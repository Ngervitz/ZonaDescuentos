import { CreditCard, Gift, Package, ShieldCheck } from "lucide-react";

const WHY_CARDS = [
  {
    icon: CreditCard,
    title: "Primera compra sin tarjeta",
    text: "Accedé a productos seleccionados aunque todavía no tengas tarjeta.",
  },
  {
    icon: ShieldCheck,
    title: "Producto + seguro incluido",
    text: "Tu compra incluye protección Sancor por 12 meses.",
  },
  {
    icon: Package,
    title: "Tarjeta Cabal",
    text: "Si calificás, recibís tu tarjeta para pagar en cuotas.",
  },
  {
    icon: Gift,
    title: "Beneficios y futuras compras",
    text: "Accedé a promociones Cabal y nuevas oportunidades.",
  },
];

export default function WhyZonaSection() {
  return (
    <section className="whyZonaBlock">
      <div className="whyZonaBlockInner">
        <h2>Más que una compra en cuotas</h2>
        <p className="whyZonaLead">
          Zona Descuentos te permite acceder a productos seleccionados aunque todavía no
          tengas tarjeta. Si calificás, recibís tu compra, tu tarjeta Cabal y beneficios
          para futuras oportunidades.
        </p>
        <div className="whyZonaGrid">
          {WHY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article className="whyZonaCard" key={card.title}>
                <div className="whyZonaCardIcon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
