import { Link } from "react-router-dom";
import { cartNavEnabled, storeEnabled } from "../../config/commerceFlags";
import { useCart } from "../../context/CartContext";

export function BrandLogo() {
  return (
    <Link to="/" className="brandLogoLink">
      <div className="brandLogo">
        <div className="brandTagInline" aria-hidden="true">
          <div className="brandTag">
            <span className="brandTagHole" />
            <span className="brandTagPct">%</span>
          </div>
        </div>
        <div className="brandLogoText">
          <p className="brandLogoTitle">
            <span className="brandLogoZona">Zona</span>{" "}
            <span className="brandLogoDesc">Descuentos</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const { itemCount: cartCount } = useCart();

  return (
    <header className="siteHeader storeHeader nbHeader">
      <BrandLogo />
      {storeEnabled && cartNavEnabled && (
        <nav className="siteHeaderRight storeNav" aria-label="Principal">
          <Link to="/tienda" className="siteNavLink">
            Tienda
          </Link>
          <Link to="/carrito" className="siteNavLink siteCartLink">
            Carrito{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      )}
    </header>
  );
}

const FOOTER_POLICY_ITEMS = [
  "Términos y condiciones",
  "Cambios y devoluciones",
  "Garantía de mejor precio",
  "Política de privacidad",
];

export function SiteFooter() {
  return (
    <footer className="siteFooter storeFooter nbFooter zdFooter">
      <div className="zdFooterGrid">
        <div className="zdFooterBrandBlock">
          <BrandLogo />
          <p className="zdFooterTagline">
            Tecnología y oportunidades a precios especiales
          </p>
        </div>

        <div className="zdFooterBlock">
          <h2 className="zdFooterHeading">Contacto</h2>
          <p className="zdFooterCopy">
            Datos de contacto comercial — pendientes de confirmación.
          </p>
        </div>

        <nav className="zdFooterBlock" aria-label="Información legal y comercial">
          <h2 className="zdFooterHeading">Información</h2>
          <ul className="zdFooterList">
            {FOOTER_POLICY_ITEMS.map((label) => (
              <li key={label}>
                <span className="zdFooterSoon" title="Contenido en preparación">
                  {label} — <em>Próximamente</em>
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="zdFooterMeta">
        Precios ilustrativos · demostración · noindex
      </p>
    </footer>
  );
}
