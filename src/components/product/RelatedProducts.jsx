import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatProductPrice } from "../../data/products";
import ProductImage from "../ui/ProductImage";
export default function RelatedProducts({ products, onOpenWizard }) {
  if (!products.length) return null;

  return (
    <section className="relatedProducts">
      <h2>Productos relacionados</h2>
      <div className="relatedProductsGrid">
        {products.map((product) => (
          <article className="relatedCard" key={product.slug}>
            <div className="relatedCardMedia">
              <ProductImage
                src={product.mainImage}
                alt={product.name}
                className="relatedCardImage"
              />
            </div>
            <div className="relatedCardBody">
              <h3>{product.name}</h3>
              <p className="relatedCardSubtitle">{product.subtitle}</p>
              <p className="relatedCardPrice">
                Desde <strong>{formatProductPrice(product.priceMonthly)}</strong> / mes
              </p>
              <div className="relatedCardCtas">
                <Link className="relatedCardLink" to={`/producto/${product.slug}`}>
                  Ver detalles
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                {product.isOperable && (
                  <button
                    type="button"
                    className="relatedCardWizardBtn"
                    onClick={() => onOpenWizard(product)}
                  >
                    Ver si califico
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
