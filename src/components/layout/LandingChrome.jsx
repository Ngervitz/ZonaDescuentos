import { Link } from "react-router-dom";

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
          <svg
            className="brandTagCord"
            viewBox="0 0 14 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3 C4 3, 8 2, 14 3"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
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
