export const BENEFITS_DISCLAIMER =
  "Los beneficios pueden variar según vigencia, comercios adheridos y condiciones de Cabal o del emisor. Las promociones mostradas son ilustrativas y pueden modificarse.";

export const benefitCategories = [
  { id: "compra", name: "Beneficios de tu compra", icon: "ShoppingBag" },
  { id: "cabal", name: "Beneficios Cabal", icon: "CreditCard" },
  { id: "hogar", name: "Hogar", icon: "Home" },
  { id: "salud", name: "Salud y farmacia", icon: "HeartPulse" },
  { id: "cine", name: "Cine y entretenimiento", icon: "Ticket" },
  { id: "viajes", name: "Viajes y movilidad", icon: "Plane" },
  { id: "vehiculos", name: "Vehículos", icon: "Car" },
  { id: "adicionales", name: "Beneficios adicionales", icon: "Sparkles" },
];

export const benefits = [
  {
    id: "compra-sin-tarjeta",
    title: "Primera compra sin tarjeta",
    description: "Comenzá tu compra financiada sin necesidad de contar con tarjeta previa.",
    category: "compra",
    icon: "ShieldCheck",
  },
  {
    id: "compra-cuotas",
    title: "Hasta 12 cuotas",
    description: "Pagá en cuotas accesibles según el producto y condiciones vigentes.",
    category: "compra",
    icon: "Calendar",
  },
  {
    id: "compra-seguro",
    title: "Seguro incluido Sancor 12 meses",
    description: "Productos seleccionados incluyen cobertura asociada a Sancor Seguros.",
    category: "compra",
    icon: "Shield",
  },
  {
    id: "compra-entrega",
    title: "Entrega coordinada",
    description: "Si calificás, coordinamos la entrega de tu compra en tu domicilio.",
    category: "compra",
    icon: "Truck",
  },
  {
    id: "compra-solicitud",
    title: "Solicitud simple",
    description: "Completá tus datos en pocos pasos y recibí respuesta de calificación.",
    category: "compra",
    icon: "ClipboardCheck",
  },
  {
    id: "cabal-comercios",
    title: "Compras en comercios adheridos",
    description: "Usá tu tarjeta Cabal en una amplia red de comercios participantes.",
    category: "cabal",
    icon: "Store",
  },
  {
    id: "cabal-promos",
    title: "Promociones y descuentos",
    description: "Accedé a oportunidades especiales según vigencia y rubros adheridos.",
    category: "cabal",
    icon: "BadgePercent",
  },
  {
    id: "cabal-financiacion",
    title: "Cuotas y financiación",
    description: "Aprovechá planes de pago en comercios del ecosistema Cabal.",
    category: "cabal",
    icon: "CreditCard",
  },
  {
    id: "cabal-pais",
    title: "Uso en todo el país",
    description: "Beneficios y compras disponibles en distintos puntos del país.",
    category: "cabal",
    icon: "MapPin",
  },
  {
    id: "hogar-muebles",
    title: "Beneficios en muebles",
    description: "Promociones y financiación en muebles para equipar tu hogar.",
    category: "hogar",
    icon: "Armchair",
  },
  {
    id: "hogar-colchones",
    title: "Beneficios en colchones",
    description: "Oportunidades en descanso y productos para el dormitorio.",
    category: "hogar",
    icon: "BedDouble",
  },
  {
    id: "hogar-decoracion",
    title: "Beneficios en decoración",
    description: "Descuentos y cuotas en artículos de decoración y ambientación.",
    category: "hogar",
    icon: "Lamp",
  },
  {
    id: "salud-farmacia",
    title: "Promociones en farmacias",
    description: "Beneficios en medicamentos y productos de farmacia adherida.",
    category: "salud",
    icon: "Pill",
  },
  {
    id: "salud-bienestar",
    title: "Beneficios de bienestar",
    description: "Oportunidades en salud, cuidado personal y rubros asociados.",
    category: "salud",
    icon: "Heart",
  },
  {
    id: "cine-promos",
    title: "Promociones y descuentos",
    description: "Salidas y entretenimiento con beneficios en cines y locales adheridos.",
    category: "cine",
    icon: "Clapperboard",
  },
  {
    id: "cine-recreativo",
    title: "Beneficios recreativos",
    description: "Experiencias de ocio y entretenimiento con tu tarjeta Cabal.",
    category: "cine",
    icon: "Ticket",
  },
  {
    id: "viajes-beneficios",
    title: "Beneficios de viajes",
    description: "Promociones y cuotas en operadores y servicios de viaje adheridos.",
    category: "viajes",
    icon: "Luggage",
  },
  {
    id: "viajes-telepeaje",
    title: "Telepeaje",
    description: "Ahorros y facilidades en servicios de peaje electrónico.",
    category: "viajes",
    icon: "Navigation",
  },
  {
    id: "viajes-transporte",
    title: "Transporte",
    description: "Beneficios en traslados y servicios de movilidad regional.",
    category: "viajes",
    icon: "Ship",
  },
  {
    id: "vehiculos-auto",
    title: "Beneficios asociados al automóvil",
    description: "Promociones y servicios pensados para tu vehículo.",
    category: "vehiculos",
    icon: "Car",
  },
  {
    id: "vehiculos-servicios",
    title: "Servicios y promociones",
    description: "Asistencias, mantenimiento y oportunidades en rubros automotrices.",
    category: "vehiculos",
    icon: "Wrench",
  },
  {
    id: "adicional-futuras",
    title: "Futuras compras",
    description: "Seguí accediendo a productos y oportunidades con tu tarjeta Cabal.",
    category: "adicionales",
    icon: "ShoppingCart",
  },
  {
    id: "adicional-promos",
    title: "Promociones especiales",
    description: "Beneficios seleccionados que se renuevan periódicamente.",
    category: "adicionales",
    icon: "Star",
  },
  {
    id: "adicional-productos",
    title: "Más productos disponibles",
    description: "Explorá el catálogo y encontrá nuevas opciones de compra.",
    category: "adicionales",
    icon: "Package",
  },
  {
    id: "adicional-soporte",
    title: "Soporte",
    description: "Acompañamiento durante tu experiencia de compra y postventa.",
    category: "adicionales",
    icon: "Headphones",
  },
];

export function getBenefitsGrouped() {
  return benefitCategories
    .map((category) => ({
      ...category,
      benefits: benefits.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.benefits.length > 0);
}
