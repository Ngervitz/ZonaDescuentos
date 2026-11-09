import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import ProductImage from "../components/ui/ProductImage";
import DirectBuyButton from "../components/product/DirectBuyButton";
import usePageSeo from "../hooks/usePageSeo";
import {
  formatConditionLabel,
  formatStockAvailability,
  formatUsdPrice,
} from "../data/products";
import { getProductsSync } from "../services/productCatalog";

const HERO_ALT =
  "3 notebooks. 3 ofertas imperdibles. Precios especiales en unidades seleccionadas.";

const PRIMARY_SPEC_LABELS = [
  "Procesador",
  "Memoria RAM",
  "Almacenamiento",
  "Pantalla",
];

function buildOfferSpecGroups(product) {
  const specs = product.specs ?? [];
  const primarySpecs = PRIMARY_SPEC_LABELS.map((label) =>
    specs.find((spec) => spec.label === label)
  ).filter(Boolean);
  const conditionSpec = {
    label: "Condición",
    value: formatConditionLabel(product.condition),
  };
  const fullSpecs = [...specs, conditionSpec];

  return { primarySpecs, fullSpecs };
}

function OfferSpecList({ specs, className = "", ariaLabel }) {
  if (!specs.length) return null;

  return (
    <ul className={`nbOfferSpecs ${className}`.trim()} aria-label={ariaLabel}>
      {specs.map((spec) => (
        <li
          key={`${spec.label}-${spec.value}`}
          className={spec.wide ? "nbOfferSpecWide" : undefined}
        >
          <span>{spec.label}</span>
          <strong>{spec.value}</strong>
        </li>
      ))}
    </ul>
  );
}

function NotebookOfferBlock({ product, offerIndex }) {
  const title =
    product.displayName?.trim() || `${product.brand} ${product.model}`.trim();
  const { primarySpecs, fullSpecs } = buildOfferSpecGroups(product);

  return (
    <article className="nbOffer" id={`oferta-${offerIndex}`}>
      <div className="nbOfferMedia">
        <ProductImage
          src={product.mainImage}
          product={product}
          alt={title}
          className="nbOfferImage"
          eager={offerIndex === 1}
        />
      </div>
      <div className="nbOfferBody">
        <p className="nbOfferKicker">Oferta {offerIndex}</p>
        <h2 className="nbOfferTitle">{title}</h2>
        {product.shortDescription ? (
          <p className="nbOfferLead">{product.shortDescription}</p>
        ) : null}
        <OfferSpecList
          specs={primarySpecs}
          className="nbOfferSpecsPrimary"
          ariaLabel="Características principales"
        />
        <div className="nbOfferBuyBlock">
          <div className="nbOfferPriceBlock">
            <p className="nbOfferPriceLabel">Precio ilustrativo</p>
            <p className="nbOfferPrice">{formatUsdPrice(product.priceUsd)}</p>
          </div>
          <p className="nbOfferDemoTag">Producto de demostración</p>
          <DirectBuyButton productId={product.id} />
        </div>
        <details className="nbOfferDetails">
          <summary className="nbOfferDetailsSummary">
            Ver especificaciones completas
          </summary>
          <div className="nbOfferDetailsBody">
            <OfferSpecList
              specs={fullSpecs}
              className="nbOfferSpecsFull"
              ariaLabel="Especificaciones completas"
            />
            <p className="nbOfferAvailability">
              Disponibilidad: {formatStockAvailability(product.stockQuantity)}
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function HomePage() {
  const products = getProductsSync();

  usePageSeo({
    title: "3 notebooks en oferta | Zona Descuentos",
    description:
      "Gateway, Lenovo ThinkPad y HP Pro x360 — ofertas demostrativas con precios ilustrativos en USD.",
    noindex: true,
  });

  return (
    <main className="landing nbLanding">
      <SiteHeader />
      <header className="nbHeroBanner">
        <picture className="nbHeroPicture">
          <source media="(max-width: 767px)" srcSet="/hero-mobile.png" />
          <img
            src="/hero-desktop.png"
            alt={HERO_ALT}
            className="nbHeroImg"
            width={2172}
            height={724}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </header>

      <section className="nbOffers" aria-label="Ofertas de notebooks">
        {products.map((product, index) => (
          <NotebookOfferBlock key={product.id} product={product} offerIndex={index + 1} />
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
