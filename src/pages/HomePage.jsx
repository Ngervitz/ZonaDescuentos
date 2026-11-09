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

function NotebookOfferBlock({ product, offerIndex }) {
  return (
    <article className="nbOffer" id={`oferta-${offerIndex}`}>
      <div className="nbOfferMedia">
        <ProductImage
          src={product.mainImage}
          product={product}
          alt={`${product.brand} ${product.model}`}
          className="nbOfferImage"
          eager={offerIndex === 1}
        />
      </div>
      <div className="nbOfferBody">
        <p className="nbOfferKicker">Oferta {offerIndex}</p>
        <h2 className="nbOfferTitle">
          {product.brand} {product.model}
        </h2>
        <p className="nbOfferCondition">
          Condición: <strong>{formatConditionLabel(product.condition)}</strong>
        </p>
        <ul className="nbOfferSpecs">
          {product.specs.map((spec) => (
            <li key={`${spec.label}-${spec.value}`}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </li>
          ))}
        </ul>
        <p className="nbOfferAvailability">
          Disponibilidad: {formatStockAvailability(product.stockQuantity)}
        </p>
        <div className="nbOfferPriceBlock">
          <p className="nbOfferPriceLabel">Precio ilustrativo</p>
          <p className="nbOfferPrice">{formatUsdPrice(product.priceUsd)}</p>
        </div>
        <p className="nbOfferDemoTag">Producto de demostración</p>
        <DirectBuyButton productId={product.id} />
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
