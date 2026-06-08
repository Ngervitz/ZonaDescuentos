import { CheckCircle2 } from "lucide-react";

export default function ProductIncludesSection({ product }) {
  if (!product.includes?.length) return null;

  return (
    <section className="productIncludesSection">
      <h2>Qué incluye</h2>
      <ul className="productIncludesList">
        {product.includes.map((item) => (
          <li key={item}>
            <CheckCircle2 size={18} strokeWidth={2.2} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
