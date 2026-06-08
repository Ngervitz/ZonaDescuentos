import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";
import usePageSeo from "../hooks/usePageSeo";
import { NOT_FOUND_SEO } from "../utils/seo";

export default function ProductNotFoundPage() {
  usePageSeo(NOT_FOUND_SEO);

  return (
    <main className="landing">
      <SiteHeader />
      <section className="notFound productNotFound">
        <h1>Producto no encontrado</h1>
        <p>El producto que buscás ya no está disponible.</p>
        <Link to="/" className="notFoundCta">
          Volver a productos
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
