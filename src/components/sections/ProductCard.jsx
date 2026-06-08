import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { formatProductPrice } from "../../data/products";
import ProductImage from "../ui/ProductImage";
import YellowButton from "../ui/YellowButton";
import InsuranceBadge from "../product/InsuranceBadge";

const BADGE_VARIANTS = {
  "12 cuotas": "green",
  "Sin tarjeta": "navy",
  "Seguro incluido": "navy",
  "Lote limitado": "red",
};

function badgeVariant(label) {
  return BADGE_VARIANTS[label] ?? "navy";
}

export default function ProductCard({ product, onOpenWizard }) {
  const canApply = product.isOperable;
  const badges = product.badges ?? [];

  return (
    <article className="productCard" id={`producto-${product.slug}`}>
      <div className="productCardMedia">
        {product.isMain && <span className="productCardFeatured">DESTACADO</span>}
        <Link to={`/producto/${product.slug}`} className="productCardMediaLink">
          <ProductImage
            src={product.mainImage}
            alt={product.name || "Producto"}
            className="productCardImage"
          />
        </Link>
      </div>

      <div className="productCardBody">
        {badges.length > 0 && (
          <div className="productCardBadges">
            {badges.map((label) => (
              <span
                className={`productBadge productBadge--${badgeVariant(label)}`}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
        )}
        <h2>
          <Link to={`/producto/${product.slug}`} className="productCardTitleLink">
            {product.name}
          </Link>
          {product.subtitle && (
            <span className="productCardSubtitle">{product.subtitle}</span>
          )}
        </h2>
        {product.shortDescription && (
          <p className="productCardDesc">{product.shortDescription}</p>
        )}
      </div>

      <div className="productCardOffer">
        <div className="productPriceBox">
          <span className="productPriceLabel">{product.installments} cuotas desde</span>
          <strong className="productPriceMain">
            {formatProductPrice(product.priceMonthly)}
          </strong>
          <span className="productPriceUnit">por cuota</span>
          {product.totalPrice > 0 && (
            <p className="productPricePtf">
              PTF total: <span>{formatProductPrice(product.totalPrice)}</span>
            </p>
          )}
        </div>

        {product.insuranceIncluded && <InsuranceBadge compact />}

        <div className="productCardCtas">
          {canApply ? (
            <YellowButton onClick={() => onOpenWizard(product)} fullWidth>
              Ver si califico
            </YellowButton>
          ) : (
            <button type="button" className="btnComingSoon btnComingSoonFull" disabled>
              Próximamente
            </button>
          )}
          <Link to={`/producto/${product.slug}`} className="productCardSecondaryCta">
            Ver detalles
          </Link>
        </div>

        <p className="productCardLegal">*Sujeto a aprobación crediticia.</p>
        <p className="productCardSecure">
          <Lock size={13} strokeWidth={2.2} />
          Tus datos están protegidos.
        </p>
      </div>
    </article>
  );
}
