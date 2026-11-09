export const SITE_SEO = {
  title: "Zona Descuentos | de credizona",
  description:
    "Tu primera compra sin tarjeta. Hasta 12 cuotas. Recibís tu compra y accedés a beneficios con Cabal.",
};

export const BENEFITS_SEO = {
  title: "Beneficios Cabal | Zona Descuentos",
  description:
    "Conocé los beneficios Cabal disponibles para clientes de Zona Descuentos de credizona.",
};

export const NOT_FOUND_SEO = {
  title: "Producto no encontrado | Zona Descuentos",
  description: "El producto que buscás ya no está disponible en Zona Descuentos.",
};

export function getProductSeo(product) {
  return {
    title: product?.seoTitle || product?.name || SITE_SEO.title,
    description:
      product?.seoDescription || product?.shortDescription || SITE_SEO.description,
    noindex: product?.isTestProduct === true,
  };
}

function setMetaDescription(description) {
  if (!description) return;

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

function setRobotsMeta(noindex) {
  let meta = document.querySelector('meta[name="robots"]');
  if (noindex) {
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");
    return;
  }
  if (meta) {
    meta.remove();
  }
}

/**
 * Lightweight head manager — no external SEO library.
 */
export function applyPageSeo({ title, description, noindex = false } = SITE_SEO) {
  if (title) {
    document.title = title;
  }
  setMetaDescription(description);
  setRobotsMeta(noindex);
}
