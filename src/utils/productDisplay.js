const DISPLAY_TITLES = {
  "sommier-colchon-2-plazas": "Sommier + Colchón",
  "notebook-lenovo": "Notebook Lenovo",
  "smart-tv": "Smart TV",
};

export function getProductDisplayTitle(product) {
  if (!product) return "";
  return DISPLAY_TITLES[product.slug] ?? product.name;
}

export function getProductDisplaySubtitle(product) {
  if (!product?.subtitle) return null;
  return product.subtitle;
}
