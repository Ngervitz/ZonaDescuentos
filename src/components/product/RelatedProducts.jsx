import { Link } from "react-router-dom";
import { formatProductPrice } from "../../data/products";
import ProductImage from "../ui/ProductImage";

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="relatedProducts storeRelated">
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
              {product.directPriceGross != null && (
                <div className="relatedCardLargePrice relatedCardLargePriceDirect">
                  <span className="relatedCardLargePriceLabel">Precio ilustrativo</span>
                  <strong className="relatedCardLargePriceAmount">
                    {formatProductPrice(product.directPriceGross)}
                  </strong>
                </div>
              )}
              <Link to={`/producto/${product.slug}`} className="relatedCardLargeLink">
                Ver producto
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
