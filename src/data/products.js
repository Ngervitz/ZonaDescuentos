export const MAIN_PRODUCT_SLUG = "sommier-colchon-2-plazas";

export const products = [
  {
    slug: "sommier-colchon-2-plazas",
    id: "sommier-colchon-2-plazas",
    name: "Sommier + Colchón",
    shortName: "2 plazas",
    category: "Sommier Premium",
    description: "Confort, calidad y descanso que se siente.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop",
    isActive: true,
    isMain: true,
    units: 18,
    pricing: {
      monthly: 1490,
      monthlyFormatted: "$ 1.490",
      installments: 12,
      installmentsLabel: "12 cuotas",
      note: "12 cuotas sin recargo",
    },
    badges: [
      { label: "Lote limitado", variant: "red" },
      { label: "12 cuotas", variant: "green" },
      { label: "Sin tarjeta", variant: "navy" },
    ],
    flags: { showCabal: true },
    insuranceIncluded: true,
  },
  {
    slug: "juego-comedor-6-sillas",
    id: "juego-comedor-6-sillas",
    name: "Juego de Comedor",
    shortName: "6 sillas",
    category: "Hogar",
    description: "Comedor completo para compartir en casa.",
    image:
      "https://images.unsplash.com/photo-1617806118773-405240a2a0e0?q=80&w=1400&auto=format&fit=crop",
    isActive: true,
    isMain: false,
    units: 12,
    pricing: {
      monthly: 1890,
      monthlyFormatted: "$ 1.890",
      installments: 12,
      installmentsLabel: "12 cuotas",
      note: "12 cuotas sin recargo",
    },
    badges: [
      { label: "12 cuotas", variant: "green" },
      { label: "Sin tarjeta", variant: "navy" },
    ],
    flags: { showCabal: true },
    insuranceIncluded: true,
  },
  {
    slug: "sillon-esquinero-3-cuerpos",
    id: "sillon-esquinero-3-cuerpos",
    name: "Sillón Esquinero",
    shortName: "3 cuerpos",
    category: "Living",
    description: "Comodidad para tu living, en cuotas accesibles.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    isActive: true,
    isMain: false,
    units: 9,
    pricing: {
      monthly: 2190,
      monthlyFormatted: "$ 2.190",
      installments: 12,
      installmentsLabel: "12 cuotas",
      note: "12 cuotas sin recargo",
    },
    badges: [
      { label: "12 cuotas", variant: "green" },
      { label: "Sin tarjeta", variant: "navy" },
    ],
    flags: { showCabal: true },
    insuranceIncluded: true,
  },
];

export function getMainProduct() {
  return products.find((p) => p.isMain && p.isActive) ?? products.find((p) => p.isActive);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug && p.isActive) ?? null;
}

export function getActiveProducts() {
  return products.filter((p) => p.isActive);
}
