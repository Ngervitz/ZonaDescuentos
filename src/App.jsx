import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  CreditCard,
  IdCard,
  Lock,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import Wizard from "./components/wizard/Wizard";
import BenefitsPage from "./pages/BenefitsPage";
import { BrandLogo } from "./components/layout/LandingChrome";
import { getActiveProducts, getMainProduct, getProductBySlug } from "./data/products";
import { track } from "./services/tracking";

const FLOW_STEPS = [
  {
    icon: ShoppingCart,
    title: "Elegís tu producto",
    text: "Seleccioná lo que querés y comenzá tu solicitud.",
  },
  {
    icon: IdCard,
    title: "Verificamos si calificás",
    text: "Completá tus datos y te damos respuesta.",
  },
  {
    icon: Truck,
    title: "Recibís tu compra",
    text: "Si calificás, coordinamos la entrega.",
  },
  {
    icon: CreditCard,
    title: "Recibís tu tarjeta Cabal",
    text: "La recibís en tu casa, pagás tus cuotas y accedés a los beneficios de Cabal.",
    link: { href: "/beneficios", label: "Conocé todos los beneficios →" },
  },
];

const PRODUCT_BULLETS = [
  { icon: ShieldCheck, title: "Primera compra sin tarjeta", text: "Comprá hoy y pagá después." },
  { icon: Calendar, title: "Hasta 12 cuotas", text: "Financiación accesible en tu compra." },
  { icon: Truck, title: "Recibí tu compra", text: "Coordinamos la entrega si calificás." },
  { icon: CreditCard, title: "Tarjeta Cabal", text: "Accedé a beneficios con tu tarjeta." },
];

function formatPrice(amount) {
  return `$ ${amount.toLocaleString("es-UY")}`;
}

function HomePage() {
  const mainProduct = getMainProduct();
  if (!mainProduct) {
    return (
      <main className="landing">
        <section className="notFound">
          <h1>Producto no disponible</h1>
        </section>
      </main>
    );
  }
  return <Navigate to={`/producto/${mainProduct.slug}`} replace />;
}

function NotFoundPage() {
  const mainProduct = getMainProduct();
  if (mainProduct) {
    return <Navigate to={`/producto/${mainProduct.slug}`} replace />;
  }
  return (
    <main className="landing">
      <SiteHeader />
      <section className="notFound">
        <h1>Producto no disponible</h1>
      </section>
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="siteHeader">
      <BrandLogo />
      <div className="siteHeaderRight">
        <Link to="/beneficios" className="siteNavLink">
          Beneficios
        </Link>
        <span className="siteHeaderBacking">Con el respaldo de</span>
        <span className="cabalBrand">Cabal</span>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="siteFooter">
      <BrandLogo />
      <div className="siteFooterRight">
        <Link to="/beneficios" className="siteNavLink">
          Beneficios
        </Link>
        <span className="siteHeaderBacking">Con el respaldo de</span>
        <span className="cabalBrand">Cabal</span>
      </div>
    </footer>
  );
}

function PromoBar() {
  return (
    <div className="promoBar">
      <div className="promoItem">
        <ShieldCheck size={18} strokeWidth={2.2} />
        <span>Primera compra sin tarjeta</span>
      </div>
      <div className="promoItem">
        <Calendar size={18} strokeWidth={2.2} />
        <span>Hasta 12 cuotas</span>
      </div>
      <div className="promoItem">
        <Package size={18} strokeWidth={2.2} />
        <span>Recibí tu compra</span>
      </div>
    </div>
  );
}

function YellowButton({ children, onClick, compact = false, fullWidth = false }) {
  return (
    <button
      type="button"
      className={`btnYellow${compact ? " btnYellowCompact" : ""}${fullWidth ? " btnYellowFull" : ""}`}
      onClick={onClick}
    >
      {children}
      <ArrowRight size={compact ? 18 : 22} strokeWidth={2.5} />
    </button>
  );
}

function HowItWorksSection() {
  return (
    <section className="flowBlock">
      <h2>¿Cómo funciona?</h2>
      <div className="flowSteps">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="flowStepWrap" key={step.title}>
              <article className="flowStep">
                <div className="flowStepVisual">
                  <span className="flowStepNumber">{index + 1}</span>
                  <div className="flowStepIcon">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.link && (
                  <Link className="flowStepLink" to={step.link.href}>
                    {step.link.label}
                  </Link>
                )}
              </article>
              {index < FLOW_STEPS.length - 1 && (
                <div className="flowArrow" aria-hidden="true">
                  <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                    <path
                      d="M0 6h24M24 6l-3-3M24 6l-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SancorBrand() {
  const [logoFailed, setLogoFailed] = useState(false);

  if (logoFailed) {
    return <span className="sancorBrandText">Sancor Seguros</span>;
  }

  return (
    <img
      src="/logos/sancor-seguros.png"
      alt="Sancor Seguros"
      className="sancorBrandLogo"
      loading="lazy"
      onError={() => setLogoFailed(true)}
    />
  );
}

function InsuranceBadge() {
  return (
    <div className="insuranceBadge">
      <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" />
      <span>Seguro incluido por 12 meses</span>
      <SancorBrand />
    </div>
  );
}

function InsuranceDetailBlock() {
  return (
    <section className="insuranceDetailBlock">
      <h3>Seguro incluido</h3>
      <p>
        Este producto incluye seguro asociado a Sancor Seguros. Las coberturas y
        condiciones aplican según los términos de la póliza.
      </p>
      <ul className="insuranceDetailList">
        <li>Protección adicional incluida en la compra</li>
        <li>Asociado a Sancor Seguros</li>
        <li>Detalles sujetos a condiciones de póliza</li>
      </ul>
    </section>
  );
}

function ProductCard({ product, onOpenWizard }) {
  const monthly = product.pricing.monthly;
  const finalPrice = monthly * product.pricing.installments;

  return (
    <article className="productCard" id={`producto-${product.slug}`}>
      <div className="productCardMedia">
        {product.isMain && <span className="productCardFeatured">DESTACADO</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="productCardBody">
        <div className="productCardBadges">
          {product.badges.map((badge) => (
            <span className={`productBadge productBadge--${badge.variant}`} key={badge.label}>
              {badge.label}
            </span>
          ))}
        </div>
        <h2>
          {product.name}
          <span className="productCardSubtitle">{product.shortName}</span>
        </h2>
        <p className="productCardDesc">{product.description}</p>
        <ul className="productCardBullets">
          {PRODUCT_BULLETS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <span className="productCardBulletIcon">
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                <span>
                  <strong>{item.title}.</strong> {item.text}
                </span>
              </li>
            );
          })}
        </ul>
        {product.insuranceIncluded && <InsuranceDetailBlock />}
      </div>

      <div className="productCardOffer">
        <div className="productPriceBox">
          <span className="productPriceLabel">12 cuotas desde</span>
          <strong className="productPriceMain">{formatPrice(monthly)}</strong>
          <span className="productPriceUnit">por cuota</span>
          <p className="productPricePtf">
            PTF total: <span>{formatPrice(finalPrice)}</span>
          </p>
        </div>
        {product.insuranceIncluded && <InsuranceBadge />}
        <YellowButton onClick={() => onOpenWizard(product)} fullWidth>
          Ver si califico
        </YellowButton>
        <p className="productCardLegal">*Sujeto a aprobación crediticia.</p>
        <p className="productCardSecure">
          <Lock size={13} strokeWidth={2.2} />
          Tus datos están protegidos.
        </p>
      </div>
    </article>
  );
}

function ProductsSection({ products, onOpenWizard }) {
  return (
    <section className="productsBlock">
      <div className="productsBlockInner">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} onOpenWizard={onOpenWizard} />
        ))}
      </div>
    </section>
  );
}

function MoreBenefitsSection() {
  return (
    <section className="moreBenefitsBlock">
      <div className="moreBenefitsIcon">
        <Sparkles size={22} strokeWidth={2} />
      </div>
      <div className="moreBenefitsCopy">
        <h2>Más beneficios para tu compra</h2>
        <p>
          Además de comprar en cuotas, podés acceder a beneficios asociados a Cabal,
          promociones y futuras oportunidades de compra.
        </p>
        <Link to="/beneficios" className="moreBenefitsLink">
          Ver beneficios
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}

function ProductLanding() {
  const { slug } = useParams();
  const activeProduct = getProductBySlug(slug);
  const products = getActiveProducts();
  const mainProduct = getMainProduct();
  const [wizardProduct, setWizardProduct] = useState(null);

  useEffect(() => {
    if (!activeProduct) return;

    track("product_view", {
      product_id: activeProduct.id,
      product_slug: activeProduct.slug,
    });

    const timer = window.setTimeout(() => {
      const target = document.getElementById(`producto-${activeProduct.slug}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [activeProduct]);

  if (!activeProduct) {
    return <NotFoundPage />;
  }

  function openWizard(product) {
    setWizardProduct(product);
    track("cta_click", {
      product_id: product.id,
      product_slug: product.slug,
    });
  }

  return (
    <main className="landing">
      <SiteHeader />
      <PromoBar />
      <HowItWorksSection />
      <ProductsSection products={products} onOpenWizard={openWizard} />
      <MoreBenefitsSection />

      <section className="finalBlock">
        <div className="finalBlockIcon">
          <ShoppingBag size={24} strokeWidth={2.2} />
        </div>
        <div className="finalBlockText">
          <h2>
            Productos que querés,
            <br />
            cuotas que podés.
          </h2>
          <p>La forma más simple de comprar hoy y construir tu futuro con Cabal.</p>
        </div>
        <YellowButton onClick={() => openWizard(mainProduct ?? activeProduct)} compact>
          Ver si califico
        </YellowButton>
      </section>

      <SiteFooter />

      {wizardProduct && (
        <Wizard product={wizardProduct} onClose={() => setWizardProduct(null)} />
      )}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beneficios" element={<BenefitsPage />} />
        <Route path="/producto/:slug" element={<ProductLanding />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
