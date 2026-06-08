// Local catalog source — consumed via services/productCatalog.js
// TODO: replace local products.js with API/CMS source
// TODO: support admin-managed product catalog
// TODO: keep product schema backwards compatible
// TODO: support product visibility rules from API
// TODO: support future pricing updates from API

export const MAIN_PRODUCT_SLUG = "sommier-colchon-2-plazas";

export const products = [
  {
    id: "sommier-colchon-2-plazas",
    slug: "sommier-colchon-2-plazas",
    status: "active",
    name: "Sommier 2 plazas +",
    subtitle: "2 plazas",
    category: "Dormitorio",
    shortDescription:
      "Confort, calidad y descanso para tu dormitorio, en cuotas accesibles.",
    longDescription:
      "Un conjunto de sommier y colchón de 2 plazas pensado para renovar tu descanso sin necesidad de contar con tarjeta previa.",
    priceMonthly: 1490,
    installments: 12,
    totalPrice: 17880,
    currency: "UYU",
    badges: ["12 cuotas", "Sin tarjeta", "Seguro incluido"],
    mainImage: "/productos/sommier/main.jpg",
    gallery: [
      "/productos/sommier/main.jpg",
      "/productos/sommier/1.jpg",
      "/productos/sommier/2.jpg",
      "/productos/sommier/3.jpg",
    ],
    insuranceIncluded: true,
    insuranceProvider: "Sancor",
    features: [
      "Sommier + colchón 2 plazas",
      "Compra en hasta 12 cuotas",
      "Seguro Sancor 12 meses",
      "Entrega coordinada",
    ],
    specs: [
      { label: "Tipo", value: "Sommier + colchón" },
      { label: "Tamaño", value: "2 plazas" },
      { label: "Cuotas", value: "12" },
    ],
    recommendedFor: [
      "Personas que quieren renovar su descanso",
      "Hogares que necesitan equipar dormitorio",
    ],
    includes: [
      "Sommier",
      "Colchón",
      "Seguro Sancor 12 meses",
      "Coordinación de entrega",
      "Tarjeta Cabal si calificás",
      "Beneficios Cabal",
    ],
    conditions: [
      "Sujeto a aprobación crediticia",
      "Stock sujeto a disponibilidad",
      "Imágenes ilustrativas",
    ],
    extras: [
      { id: "flete", label: "Flete incluido", icon: "Truck" },
    ],
    seoTitle: "Sommier + Colchón 2 plazas | Zona Descuentos",
    seoDescription:
      "Renová tu descanso con sommier y colchón de 2 plazas en cuotas, sin tarjeta y con seguro Sancor incluido.",
    isMain: true,
    units: 18,
  },
  {
    id: "notebook-lenovo",
    slug: "notebook-lenovo",
    status: "active",
    name: "Notebook Lenovo",
    subtitle: "Para estudiar y trabajar",
    category: "Tecnología",
    shortDescription:
      "Una notebook práctica para estudiar, trabajar y resolver tareas del día a día.",
    longDescription:
      "Notebook Lenovo pensada para quienes necesitan una herramienta confiable para estudiar, trabajar o emprender.",
    priceMonthly: 1290,
    installments: 12,
    totalPrice: 15480,
    currency: "UYU",
    badges: ["12 cuotas", "Sin tarjeta", "Seguro incluido"],
    mainImage: "/productos/notebook/main.jpg",
    gallery: [
      "/productos/notebook/main.jpg",
      "/productos/notebook/1.jpg",
      "/productos/notebook/2.jpg",
      "/productos/notebook/3.jpg",
    ],
    insuranceIncluded: true,
    insuranceProvider: "Sancor",
    features: [
      "Notebook Lenovo",
      "Compra en hasta 12 cuotas",
      "Seguro Sancor 12 meses",
    ],
    specs: [
      { label: "Marca", value: "Lenovo" },
      { label: "Tipo", value: "Notebook" },
      { label: "Cuotas", value: "12" },
    ],
    recommendedFor: ["Estudiantes", "Trabajadores independientes"],
    includes: [
      "Notebook Lenovo",
      "Seguro Sancor 12 meses",
      "Coordinación de entrega",
      "Tarjeta Cabal si calificás",
      "Beneficios Cabal",
    ],
    conditions: [
      "Sujeto a aprobación crediticia",
      "Modelo sujeto a disponibilidad",
      "Imágenes ilustrativas",
    ],
    seoTitle: "Notebook Lenovo en cuotas | Zona Descuentos",
    seoDescription:
      "Notebook Lenovo para estudiar y trabajar, en hasta 12 cuotas sin tarjeta previa.",
    isMain: false,
    units: 14,
  },
  {
    id: "smart-tv",
    slug: "smart-tv",
    status: "active",
    name: "Smart TV",
    subtitle: "Entretenimiento en tu hogar",
    category: "Hogar",
    shortDescription:
      "Entretenimiento para tu hogar, con cuotas accesibles y seguro incluido.",
    longDescription:
      "Smart TV ideal para disfrutar series, películas y deportes desde tu casa.",
    priceMonthly: 1690,
    installments: 12,
    totalPrice: 20280,
    currency: "UYU",
    badges: ["12 cuotas", "Sin tarjeta", "Seguro incluido"],
    mainImage: "/productos/smart-tv/main.jpg",
    gallery: [
      "/productos/smart-tv/main.jpg",
      "/productos/smart-tv/1.jpg",
      "/productos/smart-tv/2.jpg",
      "/productos/smart-tv/3.jpg",
    ],
    insuranceIncluded: true,
    insuranceProvider: "Sancor",
    features: ["Smart TV", "Compra en hasta 12 cuotas", "Seguro Sancor 12 meses"],
    specs: [
      { label: "Tipo", value: "Smart TV" },
      { label: "Uso", value: "Entretenimiento y streaming" },
      { label: "Cuotas", value: "12" },
    ],
    recommendedFor: ["Hogares que quieren renovar su TV", "Familias"],
    includes: [
      "Smart TV",
      "Seguro Sancor 12 meses",
      "Coordinación de entrega",
      "Tarjeta Cabal si calificás",
      "Beneficios Cabal",
    ],
    conditions: [
      "Sujeto a aprobación crediticia",
      "Pulgadas sujetas a disponibilidad",
      "Imágenes ilustrativas",
    ],
    seoTitle: "Smart TV en cuotas | Zona Descuentos",
    seoDescription:
      "Smart TV para tu hogar en hasta 12 cuotas, sin tarjeta y con seguro incluido.",
    isMain: false,
    units: 10,
  },
];

function formatPrice(amount) {
  return `$ ${amount.toLocaleString("es-UY")}`;
}

/** Enriches product with legacy fields used by Wizard and CRM. */
export function normalizeProduct(product) {
  if (!product) return null;

  const priceMonthly = Number(product.priceMonthly) || 0;
  const installments = Number(product.installments) || 12;
  const totalPrice = Number(product.totalPrice) || priceMonthly * installments;
  const mainImage = product.mainImage || product.image || null;
  const rawGallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
  const gallery = rawGallery.length > 0 ? rawGallery : mainImage ? [mainImage] : [];

  return {
    ...product,
    mainImage,
    gallery,
    badges: Array.isArray(product.badges) ? product.badges.filter(Boolean) : [],
    extras: Array.isArray(product.extras) ? product.extras.filter((e) => e?.id && e?.label) : [],
    features: Array.isArray(product.features) ? product.features.filter(Boolean) : [],
    specs: Array.isArray(product.specs)
      ? product.specs.filter((spec) => spec?.label && spec?.value)
      : [],
    recommendedFor: Array.isArray(product.recommendedFor)
      ? product.recommendedFor.filter(Boolean)
      : [],
    includes: Array.isArray(product.includes) ? product.includes.filter(Boolean) : [],
    conditions: Array.isArray(product.conditions) ? product.conditions.filter(Boolean) : [],
    insuranceIncluded: product.insuranceIncluded === true,
    image: mainImage,
    shortName: product.subtitle ?? "",
    description: product.shortDescription ?? "",
    isActive: product.status === "active",
    isOperable: product.status === "active",
    isVisible: product.status === "active" || product.status === "coming_soon",
    priceMonthly,
    installments,
    totalPrice,
    pricing: {
      monthly: priceMonthly,
      monthlyFormatted: formatPrice(priceMonthly),
      installments,
      installmentsLabel: `${installments} cuotas`,
      note: `${installments} cuotas sin recargo`,
    },
  };
}

export function getMainProduct() {
  const main =
    products.find((p) => p.isMain && p.status === "active") ??
    products.find((p) => p.status === "active");
  return normalizeProduct(main ?? null);
}

export function getProductBySlug(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product || product.status === "inactive") return null;
  return normalizeProduct(product);
}

export function getActiveProducts() {
  return products
    .filter((p) => p.status === "active" || p.status === "coming_soon")
    .map(normalizeProduct);
}

export function getOperableProducts() {
  return products.filter((p) => p.status === "active").map(normalizeProduct);
}

export function getRelatedProducts(slug, limit = 2) {
  return products
    .filter((p) => p.slug !== slug && p.status !== "inactive")
    .slice(0, limit)
    .map(normalizeProduct);
}

export function formatProductPrice(amount) {
  return formatPrice(amount);
}
