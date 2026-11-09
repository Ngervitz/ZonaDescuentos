import { Link } from "react-router-dom";
import {
  getProductDisplaySubtitle,
  getProductDisplayTitle,
} from "../../utils/productDisplay";
import { wizardIntegrationEnabled } from "../../config/commerceFlags";
import ProductGallery from "./ProductGallery";
import ProductOfferBox from "./ProductOfferBox";
import DirectPurchasePanel from "./DirectPurchasePanel";
import FinancingPlaceholder from "./FinancingPlaceholder";

export default function ProductHero({ product, onOpenWizard, linkToProduct = false }) {
  const title = getProductDisplayTitle(product);
  const subtitle = getProductDisplaySubtitle(product);
  const productPath = `/producto/${product.slug}`;
  const showWizardOffer =
    wizardIntegrationEnabled && product.supportsWizard && typeof onOpenWizard === "function";

  return (
    <section className="productHero productHeroStore">
      {product.isTestProduct && (
        <p className="productHeroDemoBanner" role="status">
          Producto de demostración — precio ilustrativo
        </p>
      )}
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
          {product.longDescription && (
            <p className="productHeroLead">{product.longDescription}</p>
          )}
          {showWizardOffer && (
            <ProductOfferBox
              product={product}
              onOpenWizard={onOpenWizard}
              variant="conversion"
            />
          )}
          <DirectPurchasePanel product={product} />
          <FinancingPlaceholder product={product} />
        </div>
      </div>
    </section>
  );
}
