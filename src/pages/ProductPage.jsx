import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import ProductHero from "../components/product/ProductHero";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductNotFoundPage from "./ProductNotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { getProductSeo } from "../utils/seo";
import { getProductSync, listRelatedProductsSync } from "../services/productCatalog";
import { track } from "../services/tracking";

const DEMO_NOTICE_LINES = [
  "Producto de demostración con precio ilustrativo.",
  "No hay checkout ni cobro en esta etapa.",
];

function ProductDemoLegal() {
  return (
    <section className="productSheetSection productSheetLegal productDemoLegal" aria-label="Aviso demo">
      <p className="productDemoLegalTitle">Producto de demostración</p>
      {DEMO_NOTICE_LINES.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
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

export default function ProductPage() {
  const { slug } = useParams();
  const product = useMemo(() => getProductSync(slug), [slug]);
  const related = useMemo(
    () => (product ? listRelatedProductsSync(slug) : []),
    [product, slug],
  );
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
    <main className="landing landingProduct storeProduct">
      <SiteHeader />
      <ProductHero product={product} />
      <ProductSheetIncludes product={product} />
      <ProductSheetSpecs product={product} />
      <ProductSheetFaqs product={product} />
      {product.isTestProduct && <ProductDemoLegal />}
      <RelatedProducts products={related} />
      <SiteFooter />
    </main>
  );
}
