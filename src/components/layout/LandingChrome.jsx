import { Link } from "react-router-dom";
import { directPurchaseEnabled } from "../../config/commerceFlags";
import { useCart } from "../../context/CartContext";

const CREDIZONA_LOGO =
  import.meta.env.VITE_CREDIZONA_LOGO_URL || "/credizona-logo.svg";

function CredizonaLogo() {
  return (
    <img
      src={CREDIZONA_LOGO}
      alt="credizona"
      className="credizonaLogo"
      loading="lazy"
      decoding="async"
    />
  );
}

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
          <span className="brandLogoSub">
            de <CredizonaLogo />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const { itemCount: cartCount } = useCart();

  return (
    <header className="siteHeader">
      <BrandLogo />
      <div className="siteHeaderRight">
        {directPurchaseEnabled && (
          <>
            <Link to="/tienda" className="siteNavLink">
              Tienda
            </Link>
            <Link to="/carrito" className="siteNavLink siteCartLink">
              Carrito{cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>
          </>
        )}
        <Link to="/beneficios" className="siteNavLink">
          Beneficios
        </Link>
        <span className="siteHeaderBacking">Con el respaldo de</span>
        <span className="cabalBrand">Cabal</span>
      </div>
    </header>
  );
}

export function SiteFooter() {
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
