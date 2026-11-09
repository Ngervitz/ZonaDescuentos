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

export function SiteFooter() {
  return (
    <footer className="siteFooter storeFooter nbFooter">
      <BrandLogo />
      <p className="storeFooterNote">Precios ilustrativos · demostración · noindex</p>
    </footer>
  );
}
