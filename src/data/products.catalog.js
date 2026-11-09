/** Catálogo de producción (sin productos de prueba). */
export const MAIN_PRODUCT_SLUG = "sommier-colchon-2-plazas";

export const catalogProducts = [
  {
    id: "sommier-colchon-2-plazas",
    slug: "sommier-colchon-2-plazas",
    status: "active",
    purchaseModes: ["wizard"],
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
    faqs: [
      {
        question: "¿Qué incluye la compra del sommier?",
        answer:
          "Incluye sommier, colchón de 2 plazas, seguro Sancor por 12 meses y coordinación de entrega. Si calificás, también accedés a tarjeta Cabal y sus beneficios.",
      },
      {
        question: "¿Necesito tarjeta de crédito para comprar?",
        answer:
          "No. Podés solicitar tu primera compra sin contar con tarjeta previa. La aprobación depende de la evaluación crediticia.",
      },
      {
        question: "¿Cómo funciona el seguro incluido?",
        answer:
          "Tu compra incluye protección Sancor durante 12 meses sin costo adicional, según las condiciones de la cobertura.",
      },
      {
        question: "¿Cuándo se coordina la entrega?",
        answer:
          "Una vez aprobada tu solicitud, nos contactamos para acordar fecha y lugar de entrega según tu zona.",
      },
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
    purchaseModes: ["wizard"],
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
    faqs: [
      {
        question: "¿Para qué está pensada esta notebook?",
        answer:
          "Es ideal para estudiar, trabajar y resolver tareas del día a día con una herramienta confiable y práctica.",
      },
      {
        question: "¿La notebook viene con seguro?",
        answer:
          "Sí. Incluye seguro Sancor por 12 meses sin costo extra al aprobarse tu solicitud.",
      },
      {
        question: "¿Puedo pagar en cuotas sin tarjeta?",
        answer:
          "Sí. Podés solicitar hasta 12 cuotas sin necesidad de contar con tarjeta de crédito previa.",
      },
      {
        question: "¿Cómo recibo el producto?",
        answer:
          "Coordinamos la entrega después de aprobar tu solicitud, acordando fecha y lugar contigo.",
      },
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
    purchaseModes: ["wizard"],
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
    faqs: [
      {
        question: "¿Qué tipo de TV es?",
        answer:
          "Es una Smart TV pensada para disfrutar series, películas, deportes y streaming desde tu hogar.",
      },
      {
        question: "¿Incluye seguro?",
        answer:
          "Sí. Tu compra incluye protección Sancor por 12 meses sin costo adicional.",
      },
      {
        question: "¿Cuántas cuotas puedo solicitar?",
        answer:
          "Podés solicitar hasta 12 cuotas. El monto de cuota y PTF se confirman al finalizar la solicitud.",
      },
      {
        question: "¿La entrega está incluida?",
        answer:
          "Coordinamos la entrega una vez aprobada tu solicitud. Nos contactamos para acordar fecha y lugar.",
      },
    ],
    seoTitle: "Smart TV en cuotas | Zona Descuentos",
    seoDescription:
      "Smart TV para tu hogar en hasta 12 cuotas, sin tarjeta y con seguro incluido.",
    isMain: false,
    units: 10,
  },
];
