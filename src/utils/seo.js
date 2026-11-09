export const SITE_SEO = {
  title: "Zona Descuentos — Tienda",
  description:
    "Catálogo y carrito demostrativo de Zona Descuentos. Precios ilustrativos; compras próximamente.",
};

export const NOT_FOUND_SEO = {
  title: "No encontrado | Zona Descuentos",
  description: "El producto o la página que buscás no está disponible.",
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

export function applyPageSeo({ title, description, noindex = false } = SITE_SEO) {
  if (title) {
    document.title = title;
  }
  setMetaDescription(description);
  setRobotsMeta(noindex);
}
