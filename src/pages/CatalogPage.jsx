import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import ProductImage from "../components/ui/ProductImage";
import usePageSeo from "../hooks/usePageSeo";
import { storeEnabled } from "../config/commerceFlags";
import { formatProductPrice } from "../data/products";
import {
  getProductsSync,
  listCategoriesSync,
} from "../services/productCatalog";

export default function CatalogPage() {
  const [category, setCategory] = useState("");
  const categories = useMemo(() => listCategoriesSync(), []);
  const products = useMemo(
    () => getProductsSync({ category: category || null }),
    [category],
  );

  usePageSeo({
    title: "Tienda | Zona Descuentos",
    description: "Catálogo demostrativo Zona Descuentos.",
    noindex: true,
  });

  const title = category ? `Tienda — ${category}` : "Todos los productos";

  if (!storeEnabled) {
    return null;
  }

  return (
    <main className="landing landingCatalog">
      <SiteHeader />
      <section className="catalogPage">
        <h1>{title}</h1>
        <p className="catalogIntro">
          Catálogo de demostración. Los precios son ilustrativos; las compras estarán disponibles
          próximamente.
        </p>
        <div className="catalogFilters" role="tablist" aria-label="Categorías">
          <button
            type="button"
            className={`catalogChip${category === "" ? " isActive" : ""}`}
            onClick={() => setCategory("")}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`catalogChip${category === cat ? " isActive" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="catalogGrid">
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
                <h2>
                  <Link to={`/producto/${product.slug}`}>{product.name}</Link>
                </h2>
                {product.supportsWizard && product.priceMonthly > 0 && (
                  <p className="catalogCardPriceWizard">
                    {product.installments} cuotas desde{" "}
                    <strong>{formatProductPrice(product.priceMonthly)}</strong>
                  </p>
                )}
                {product.supportsDirect && product.directPriceGross != null && (
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
