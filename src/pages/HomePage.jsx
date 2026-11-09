import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import ProductImage from "../components/ui/ProductImage";
import usePageSeo from "../hooks/usePageSeo";
import { formatProductPrice } from "../data/products";
import { SITE_SEO } from "../utils/seo";
import { getFeaturedProductSync, getProductsSync } from "../services/productCatalog";

export default function HomePage() {
  const featured = getFeaturedProductSync();
  const products = getProductsSync();

  usePageSeo({
    ...SITE_SEO,
    title: "Tienda | Zona Descuentos",
    description: SITE_SEO.description,
  });

  return (
    <main className="landing storeHome">
      <SiteHeader />
      <section className="storeHero">
        <h1>Zona Descuentos</h1>
        <p className="storeHeroLead">
          Tienda en construcción. Explorá productos de demostración, probá el carrito y conocé
          las fichas que usaremos con catálogo real.
        </p>
        <Link to="/tienda" className="storeHeroCta">
          Ver todos los productos
        </Link>
      </section>

      {featured && (
        <section className="storeFeatured">
          <h2>Destacado</h2>
          <article className="storeFeaturedCard">
            <Link to={`/producto/${featured.slug}`} className="storeFeaturedMedia">
              <ProductImage
                src={featured.mainImage}
                product={featured}
                alt={featured.name}
                className="storeFeaturedImage"
              />
            </Link>
            <div className="storeFeaturedBody">
              <p className="storeFeaturedCategory">{featured.category}</p>
              <h3>
                <Link to={`/producto/${featured.slug}`}>{featured.name}</Link>
              </h3>
              <p className="storeFeaturedPrice">
                {featured.directPriceGross != null && (
                  <>Precio ilustrativo {formatProductPrice(featured.directPriceGross)}</>
                )}
              </p>
              <Link to={`/producto/${featured.slug}`} className="storeCardLink">
                Ver ficha
              </Link>
            </div>
          </article>
        </section>
      )}

      <section className="storeGridSection">
        <h2>Productos</h2>
        <div className="catalogGrid storeHomeGrid">
          {products.map((product) => (
            <article className="catalogCard" key={product.id}>
              {product.isTestProduct && (
                <span className="catalogDemoBadge">Producto de demostración</span>
              )}
              <Link to={`/producto/${product.slug}`} className="catalogCardMedia">
                <ProductImage
                  src={product.mainImage}
                  product={product}
                  alt={product.name}
                  className="catalogCardImage"
                />
              </Link>
              <div className="catalogCardBody">
                <p className="catalogCardCategory">{product.category}</p>
                <h3>
                  <Link to={`/producto/${product.slug}`}>{product.name}</Link>
                </h3>
                {product.directPriceGross != null && (
                  <p className="catalogCardPriceDirect">
                    Precio ilustrativo{" "}
                    <strong>{formatProductPrice(product.directPriceGross)}</strong>
                  </p>
                )}
                <Link to={`/producto/${product.slug}`} className="catalogCardLink">
                  Ver producto
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
