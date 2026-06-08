import { Link } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import ProductOfferBox from "./ProductOfferBox";
import { resolveIcon } from "../../utils/icons";

const BADGE_VARIANTS = {
  "12 cuotas": "green",
  "Sin tarjeta": "navy",
  "Seguro incluido": "navy",
};

function badgeVariant(label) {
  return BADGE_VARIANTS[label] ?? "navy";
}

export default function ProductHero({ product, onOpenWizard }) {
  return (
    <section className="productHero">
      <nav className="productBreadcrumb" aria-label="Breadcrumb">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to="/#productos">Productos</Link>
        <span aria-hidden="true">›</span>
        <span>{product.name}</span>
      </nav>

      <div className="productHeroGrid">
        <ProductGallery product={product} />

        <div className="productHeroInfo">
          <div className="productCardBadges">
            {product.badges.map((label) => (
              <span
                className={`productBadge productBadge--${badgeVariant(label)}`}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>

          <h1>{product.name}</h1>
          <p className="productHeroSubtitle">{product.subtitle}</p>
          <p className="productHeroDescription">{product.shortDescription}</p>

          {product.extras?.length > 0 && (
            <ul className="productExtras">
              {product.extras.map((extra) => {
                const Icon = resolveIcon(extra.icon);
                return (
                  <li key={extra.id}>
                    <Icon size={16} strokeWidth={2.2} />
                    <span>{extra.label}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="productHeroOfferDesktop">
            <ProductOfferBox product={product} onOpenWizard={onOpenWizard} />
          </div>
        </div>
      </div>

      <div className="productHeroOfferMobile">
        <ProductOfferBox product={product} onOpenWizard={onOpenWizard} />
      </div>
    </section>
  );
}
