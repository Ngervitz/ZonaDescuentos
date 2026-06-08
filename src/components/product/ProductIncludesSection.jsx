import { CheckCircle2 } from "lucide-react";

const MAX_ITEMS = 5;

function buildIncludeItems(product) {
  const raw = product.includes ?? [];
  return raw
    .filter((item) => {
      if (!product.insuranceIncluded && /seguro|sancor/i.test(item)) return false;
      return Boolean(item);
    })
    .slice(0, MAX_ITEMS);
}

export default function ProductIncludesSection({ product }) {
  const items = buildIncludeItems(product);
  if (!items.length) return null;

  return (
    <section className="productIncludesSection productIncludesCompact">
      <h2>Qué incluye</h2>
      <ul className="productIncludesGrid">
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={14} strokeWidth={2.4} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {/* TODO: technical specs accordion — hidden from main conversion landing */}
    </section>
  );
}
