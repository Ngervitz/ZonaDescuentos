import {
  getProductDisplaySubtitle,
  getProductDisplayTitle,
} from "../../utils/productDisplay";
import ProductGallery from "./ProductGallery";
import ProductOfferBox from "./ProductOfferBox";

export default function ProductHero({ product, onOpenWizard }) {
  const title = getProductDisplayTitle(product);
  const subtitle = getProductDisplaySubtitle(product);

  return (
    <section className="productHero productHeroConversion">
      <div className="productHeroGrid">
        <div className="productHeroMedia">
          <ProductGallery product={product} />
        </div>

        <div className="productHeroAside">
          <div className="productHeroHeading">
            <h1 className="productHeroTitle">{title}</h1>
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
