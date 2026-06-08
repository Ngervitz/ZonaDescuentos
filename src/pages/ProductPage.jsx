import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, Package, ShieldCheck } from "lucide-react";
import Wizard from "../components/wizard/Wizard";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ProductHero from "../components/product/ProductHero";
import ProductFinalCta from "../components/product/ProductFinalCta";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductNotFoundPage from "./ProductNotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { useWizardLauncher } from "../hooks/useWizardLauncher";
import { buildProductContext, ENTRY_PATH } from "../utils/applicationFlow";
import { getProductSeo } from "../utils/seo";
import { getProduct, listRelatedProducts } from "../services/productCatalog";
import { track } from "../services/tracking";
import YellowButton from "../components/ui/YellowButton";

const PRODUCT_PROMO_ITEMS = [
  { emoji: "⚡", text: "Primera compra sin tarjeta" },
  { emoji: "🛡", text: "Seguro incluido" },
  { emoji: "📦", text: "Entrega coordinada" },
  { emoji: "💳", text: "Tarjeta Cabal con beneficios" },
];

const DELIVERY_COPY = [
  "La entrega se coordina luego de aprobada tu solicitud.",
  "Nos ponemos en contacto para acordar fecha y lugar.",
];

const LEGAL_LINES = [
  "Imágenes ilustrativas.",
  "Stock sujeto a disponibilidad.",
  "Sujeto a aprobación crediticia.",
  "PTF informado al finalizar la solicitud.",
];

function ProductPagePromoBar() {
  return (
    <div
      className="promoBar productPagePromoBar productPagePromoBarCompact"
      aria-label="Beneficios de compra"
    >
      {PRODUCT_PROMO_ITEMS.map((item) => (
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

function ProductSheetIncludes({ product }) {
  const items = product.includes ?? [];
  if (!items.length) return null;

  return (
    <section className="productSheetSection productSheetIncludes">
      <h2>Qué incluye</h2>
      <ul className="productSheetIncludesList">
        {items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductSheetSpecs({ product }) {
  const specs = product.specs ?? [];
  const features = product.features ?? [];
  if (!specs.length && !features.length) return null;

  return (
    <section className="productSheetSection productSheetSpecs">
      {specs.length > 0 && (
        <>
          <h2>Especificaciones</h2>
          <div className="productSheetSpecsTableWrap">
            <table className="productSheetSpecsTable">
              <thead>
                <tr>
                  <th scope="col">Característica</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((spec) => (
                  <tr key={`${spec.label}-${spec.value}`}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {features.length > 0 && (
        <div className="productSheetFeatures">
          <h2>Características</h2>
          <ul className="productSheetFeaturesList">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function ProductSheetSancorLogo() {
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

function ProductSheetInsurance({ product }) {
  if (!product.insuranceIncluded) return null;

  const insuranceText =
    product.insuranceText ?? "Protección adicional incluida en tu compra.";
  const durationMonths = product.installments ?? 12;

  return (
    <section className="productSheetSection productSheetInsurance">
      <h2>Garantía y seguro</h2>
      <div className="productSheetInsuranceCard">
        <div className="productSheetInsuranceIcon">
          <ShieldCheck size={24} strokeWidth={2} aria-hidden="true" />
        </div>
        <div className="productSheetInsuranceCopy">
          {product.insuranceProvider && (
            <p className="productSheetInsuranceProvider">{product.insuranceProvider}</p>
          )}
          <p>{insuranceText}</p>
          <p className="productSheetInsuranceDuration">
            Cobertura por {durationMonths} meses
          </p>
          <ProductSheetSancorLogo />
        </div>
      </div>
    </section>
  );
}

function ProductSheetDelivery() {
  return (
    <section className="productSheetSection productSheetDelivery">
      <h2>Entrega</h2>
      <div className="productSheetDeliveryCard">
        <div className="productSheetDeliveryIcon">
          <Package size={22} strokeWidth={2} aria-hidden="true" />
        </div>
        <div className="productSheetDeliveryCopy">
          {DELIVERY_COPY.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSheetPreFaqCta({ product, onOpenWizard }) {
  if (!product?.isOperable) return null;

  return (
    <section className="productSheetPreFaqCta">
      <div className="productSheetPreFaqCtaInner">
        <h2>¿Listo para verificar si calificás?</h2>
        <p>Completá tu solicitud online y recibí respuesta en minutos.</p>
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
      </div>
    </section>
  );
}

function ProductSheetFaqs({ product }) {
  const faqs = product.faqs ?? [];
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs.length) return null;

  return (
    <section className="productSheetSection productSheetFaqs">
      <h2>Preguntas frecuentes</h2>
      <div className="productSheetFaqList">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `product-faq-panel-${index}`;
          const buttonId = `product-faq-button-${index}`;

          return (
            <div
              className={`productSheetFaqItem${isOpen ? " isOpen" : ""}`}
              key={faq.question}
            >
              <button
                type="button"
                id={buttonId}
                className="productSheetFaqTrigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="productSheetFaqPanel"
                hidden={!isOpen}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProductSheetLegal() {
  return (
    <section className="productSheetSection productSheetLegal" aria-label="Aviso legal">
      {LEGAL_LINES.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const related = listRelatedProducts(slug);
  const { wizardProduct, wizardContext, openWizard, closeWizard } = useWizardLauncher();
  const seo = useMemo(() => getProductSeo(product), [product]);

  usePageSeo(seo);

  useEffect(() => {
    if (!product) return;

    track("product_view", {
      product_id: product.id,
      product_slug: product.slug,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return (
    <main className="landing landingProduct">
      <SiteHeader />
      <ProductHero product={product} onOpenWizard={openWizard} />
      <ProductPagePromoBar />
      <ProductSheetIncludes product={product} />
      <ProductSheetSpecs product={product} />
      <ProductSheetInsurance product={product} />
      <ProductSheetDelivery />
      <ProductSheetPreFaqCta product={product} onOpenWizard={openWizard} />
      <ProductSheetFaqs product={product} />
      <ProductSheetLegal />
      <HowItWorksSection compact />
      <RelatedProducts products={related} onOpenWizard={openWizard} />
      <ProductFinalCta product={product} onOpenWizard={openWizard} />
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
