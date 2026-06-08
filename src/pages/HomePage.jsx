import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Gift,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductHero from "../components/product/ProductHero";
import ProductNotFoundPage from "./ProductNotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { useWizardLauncher } from "../hooks/useWizardLauncher";
import { buildProductContext, ENTRY_PATH } from "../utils/applicationFlow";
import { formatProductPrice } from "../data/products";
import { SITE_SEO } from "../utils/seo";
import {
  getFeaturedProduct,
  listVisibleProducts,
} from "../services/productCatalog";
import { track } from "../services/tracking";
import ProductImage from "../components/ui/ProductImage";
import YellowButton from "../components/ui/YellowButton";

const HOME_PROMO_ITEMS = [
  { emoji: "⚡", text: "Primera compra sin tarjeta" },
  { emoji: "🛡", text: "Seguro incluido" },
  { emoji: "📦", text: "Entrega coordinada" },
  { emoji: "💳", text: "Tarjeta Cabal con beneficios" },
];

const HOME_WHY_CARDS = [
  {
    icon: Wallet,
    title: "Sin tarjeta previa",
    copy: "Tu primera compra puede ser hoy.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro incluido",
    copy: "Protección Sancor por 12 meses sin costo extra.",
  },
  {
    icon: CreditCard,
    title: "Tarjeta Cabal",
    copy: "Si calificás, recibís tu tarjeta y accedés a beneficios.",
  },
  {
    icon: Gift,
    title: "Futuras oportunidades",
    copy: "Más productos, más cuotas, más beneficios.",
  },
];

function HomePromoBar() {
  return (
    <div className="promoBar productPagePromoBar" aria-label="Beneficios de compra">
      {HOME_PROMO_ITEMS.map((item) => (
        <div className="promoItem productPagePromoItem" key={item.text}>
          <span className="productPagePromoEmoji" aria-hidden="true">
            {item.emoji}
          </span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function HomeOtherProducts({ products, onOpenWizard }) {
  if (!products.length) return null;

  return (
    <section className="relatedProducts relatedProductsConversion homeOtherProducts">
      <h2>Más productos disponibles</h2>
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
                        buildProductContext(product, ENTRY_PATH.PRODUCT_CARD)
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

function HomeWhySection() {
  return (
    <section className="homeWhyBlock">
      <h2>Más que una compra en cuotas</h2>
      <div className="homeWhyGrid">
        {HOME_WHY_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <article className="homeWhyCard" key={card.title}>
              <span className="homeWhyCardIcon">
                <Icon size={28} strokeWidth={2} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function HomeFinalCta({ product, onOpenWizard }) {
  if (!product?.isOperable) return null;

  return (
    <section className="productFinalCta homeFinalCta">
      <div className="productFinalCtaInner">
        <h2>¿Listo para empezar?</h2>
        <p>Elegí tu producto y verificá si calificás en minutos.</p>
        <YellowButton
          onClick={() =>
            onOpenWizard(
              product,
              buildProductContext(product, ENTRY_PATH.HOME_FEATURED_PRODUCT)
            )
          }
          fullWidth
        >
          Ver si califico
        </YellowButton>
      </div>
    </section>
  );
}

export default function HomePage() {
  const featuredProduct = getFeaturedProduct();
  const otherProducts = useMemo(() => {
    if (!featuredProduct) return [];
    return listVisibleProducts().filter(
      (product) =>
        product.status === "active" && product.slug !== featuredProduct.slug
    );
  }, [featuredProduct]);

  const { wizardProduct, wizardContext, openWizard, closeWizard } = useWizardLauncher();

  usePageSeo(SITE_SEO);

  useEffect(() => {
    track("home_view", {});
  }, []);

  if (!featuredProduct) {
    return <ProductNotFoundPage />;
  }

  return (
    <main className="landing landingHome landingProduct">
      <SiteHeader />
      <HomePromoBar />
      <HowItWorksSection compact top />
      <ProductHero
        product={featuredProduct}
        onOpenWizard={openWizard}
        linkToProduct
      />
      <HomeOtherProducts products={otherProducts} onOpenWizard={openWizard} />
      <HomeWhySection />
      <HomeFinalCta product={featuredProduct} onOpenWizard={openWizard} />
      <SiteFooter />

      {wizardProduct && (
        <Wizard
          product={wizardProduct}
          productContext={wizardContext}
          onClose={closeWizard}
        />
      )}
    </main>
  );
}
