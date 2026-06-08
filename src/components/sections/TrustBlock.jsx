import { CheckCircle2 } from "lucide-react";

const TRUST_BULLETS = [
  "Solicitud 100% online",
  "Seguro incluido por 12 meses",
  "Respaldo Cabal",
  "Entrega coordinada",
];

export default function TrustBlock() {
  return (
    <section className="trustBlock">
      <div className="trustBlockInner">
        <h2>Comprá hoy, construí tu próxima oportunidad financiera.</h2>
        <p>
          Elegí un producto, completá tu solicitud y, si calificás, recibís tu compra,
          tu tarjeta Cabal y acceso a beneficios futuros.
        </p>
        <ul className="trustBlockList">
          {TRUST_BULLETS.map((item) => (
            <li key={item}>
              <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
