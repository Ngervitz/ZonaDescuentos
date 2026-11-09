function formatPrice(amount) {
  return `$ ${amount.toLocaleString("es-UY")}`;
}

const DEFAULT_PURCHASE_MODES = ["wizard"];

function resolvePurchaseModes(product) {
  const modes = Array.isArray(product?.purchaseModes)
    ? product.purchaseModes.filter((m) => m === "wizard" || m === "direct")
    : [];
  return modes.length ? modes : [...DEFAULT_PURCHASE_MODES];
}

/** Enriches product with legacy fields used by Wizard and CRM. */
export function normalizeProduct(product) {
  if (!product) return null;

  const purchaseModes = resolvePurchaseModes(product);
  const priceMonthly = Number(product.priceMonthly) || 0;
  const installments = Number(product.installments) || 12;
  const totalPrice = Number(product.totalPrice) || priceMonthly * installments;
  const directPriceGross =
    product.directPriceGross != null ? Number(product.directPriceGross) : null;
  const mainImage = product.mainImage || product.image || null;
  const rawGallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
  const gallery = rawGallery.length > 0 ? rawGallery : mainImage ? [mainImage] : [];

  return {
    ...product,
    purchaseModes,
    supportsWizard: purchaseModes.includes("wizard"),
    supportsDirect: purchaseModes.includes("direct"),
    directPriceGross,
    isTestProduct: product.isTestProduct === true,
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
    faqs: Array.isArray(product.faqs)
      ? product.faqs.filter((faq) => faq?.question && faq?.answer)
      : [],
    insuranceIncluded: product.insuranceIncluded === true,
    image: mainImage,
    shortName: product.subtitle ?? "",
    description: product.shortDescription ?? "",
    isActive: product.status === "active",
    isOperable: product.status === "active" && purchaseModes.includes("wizard"),
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
    directPricing:
      directPriceGross != null
        ? { gross: directPriceGross, grossFormatted: formatPrice(directPriceGross) }
        : null,
  };
}

export function formatProductPrice(amount) {
  return formatPrice(amount);
}
