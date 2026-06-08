import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Gift,
  ShieldCheck,
  Truck,
} from "lucide-react";

function getBenefitTiles(product) {
  const tiles = [];
  if (product?.insuranceIncluded) {
    tiles.push({
      icon: ShieldCheck,
      label: "Seguro incluido",
      sub: "12 meses Sancor",
    });
  }
  tiles.push(
    { icon: Truck, label: "Entrega coordinada", sub: "A tu domicilio" },
    { icon: CreditCard, label: "Tarjeta Cabal", sub: "Si calificás" },
    { icon: Gift, label: "Beneficios", sub: "Promociones Cabal" }
  );
  return tiles;
}

export default function ProductBenefitsSection({ product }) {
  const tiles = getBenefitTiles(product);

  return (
    <section className="productBenefitsSection productBenefitsConversion">
      <div className="productBenefitsConversionInner">
        <div className="productBenefitsConversionHead">
          <h2>Más que el producto</h2>
          <p>Comprá hoy y accedé a beneficios con Cabal.</p>
        </div>
        <div className="productBenefitsTiles">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <article className="productBenefitTile" key={tile.label}>
                <span className="productBenefitTileIcon">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <strong>{tile.label}</strong>
                <small>{tile.sub}</small>
              </article>
            );
          })}
        </div>
        <Link to="/beneficios" className="productBenefitsLink">
          Conocer todos los beneficios
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
