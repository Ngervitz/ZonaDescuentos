import {
  CreditCard,
  Globe,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

const PURCHASE_BENEFIT_ICONS = [ShieldCheck, Wallet, Globe, Truck, CreditCard];

function buildPurchaseBenefits(product) {
  const items = [];

  if (product?.insuranceIncluded) {
    items.push("Seguro Sancor incluido por 12 meses");
  }

  items.push(
    `Hasta ${product?.installments ?? 12} cuotas`,
    "Solicitud 100% online",
    "Entrega coordinada",
    "Tarjeta Cabal si calificás"
  );

  return items;
}

export default function ProductPurchaseBenefits({ product }) {
  const benefits = buildPurchaseBenefits(product);
  if (!benefits.length) return null;

  return (
    <section className="productPurchaseBenefits" aria-label="Beneficios de tu compra">
      <h2 className="productPurchaseBenefitsTitle">Beneficios de tu compra</h2>
      <div className="productPurchaseBenefitsGrid">
        {benefits.map((label, index) => {
          const Icon = PURCHASE_BENEFIT_ICONS[index % PURCHASE_BENEFIT_ICONS.length];
          return (
            <article className="productPurchaseBenefitCard" key={label}>
              <span className="productPurchaseBenefitIcon">
                <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span>{label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
