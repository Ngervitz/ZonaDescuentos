import { Link } from "react-router-dom";
import { formatProductPrice } from "../../data/products";
import { buildProductContext, ENTRY_PATH } from "../../utils/applicationFlow";
import ProductImage from "../ui/ProductImage";
import YellowButton from "../ui/YellowButton";

export default function RelatedProducts({ products, onOpenWizard }) {
  if (!products.length) return null;

  return (
    <section className="relatedProducts relatedProductsConversion">
      <h2>También te puede interesar</h2>
      <div className="relatedProductsGrid">
        {products.map((product) => (
          <article className="relatedCardLarge" key={product.slug}>
            <Link
              to={`/producto/${product.slug}`}
              className="relatedCardLargeMedia relatedCardLargeMediaLink"
            >
              <ProductImage
                src={product.mainImage}
                product={product}
                alt={product.name}
                className="relatedCardLargeImage"
              />
            </Link>
            <div className="relatedCardLargeBody">
              <h3>
                <Link to={`/producto/${product.slug}`} className="relatedCardLargeTitleLink">
                  {product.name}
                </Link>
              </h3>
              {product.priceMonthly > 0 && (
                <div className="relatedCardLargePrice">
                  <span className="relatedCardLargePriceLabel">
                    {product.installments} cuotas desde
                  </span>
                  <strong className="relatedCardLargePriceAmount">
                    {formatProductPrice(product.priceMonthly)}
                  </strong>
                </div>
              )}
              <div className="relatedCardLargeCtas">
                {product.isOperable && (
                  <YellowButton
                    onClick={() =>
                      onOpenWizard(
                        product,
                        buildProductContext(product, ENTRY_PATH.PRODUCT_LANDING)
                      )
                    }
                    fullWidth
                  >
                    Ver si califico
                  </YellowButton>
                )}
                <Link to={`/producto/${product.slug}`} className="relatedCardLargeLink">
                  Ver detalles
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
