import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";

export default function ProductNotFoundPage() {
  return (
    <main className="landing">
      <SiteHeader />
      <section className="notFound productNotFound">
        <h1>Producto no encontrado</h1>
        <p>El producto que buscás no está disponible o ya no forma parte del catálogo.</p>
        <Link to="/" className="notFoundCta">
          Volver a productos
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
