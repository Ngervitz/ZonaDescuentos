import { Link } from "react-router-dom";
import {
  getProductDisplaySubtitle,
  getProductDisplayTitle,
} from "../../utils/productDisplay";
import ProductGallery from "./ProductGallery";
import ProductOfferBox from "./ProductOfferBox";

export default function ProductHero({ product, onOpenWizard, linkToProduct = false }) {
  const title = getProductDisplayTitle(product);
  const subtitle = getProductDisplaySubtitle(product);
  const productPath = `/producto/${product.slug}`;

  return (
    <section className="productHero productHeroConversion">
      <div className="productHeroGrid">
        <div className="productHeroMedia">
          <ProductGallery product={product} linkToProduct={linkToProduct} />
        </div>

        <div className="productHeroAside">
          <div className="productHeroHeading">
            {linkToProduct ? (
              <Link to={productPath} className="productHeroTitleLink">
                <h1 className="productHeroTitle">{title}</h1>
              </Link>
            ) : (
              <h1 className="productHeroTitle">{title}</h1>
            )}
            {subtitle && <p className="productHeroSubtitle">{subtitle}</p>}
          </div>
          <ProductOfferBox
            product={product}
            onOpenWizard={onOpenWizard}
            variant="conversion"
          />
        </div>
      </div>
    </section>
  );
}
