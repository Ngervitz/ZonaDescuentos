import { useState } from "react";

export default function SancorBrand() {
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
