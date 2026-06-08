const LOCAL_IMAGE_PREFIX = "/productos/";

const TEMP_PRODUCT_IMAGES = {
  "sommier-colchon-2-plazas":
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80&auto=format&fit=crop",
  "notebook-lenovo":
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=80&auto=format&fit=crop",
  "smart-tv":
    "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1400&q=80&auto=format&fit=crop",
};

const TEMP_GALLERY_IMAGES = {
  "sommier-colchon-2-plazas": [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80&auto=format&fit=crop",
  ],
  "notebook-lenovo": [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642532400-2682810df593?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80&auto=format&fit=crop",
  ],
  "smart-tv": [
    "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1400&q=80&auto=format&fit=crop",
  ],
};

const TEMP_CATEGORY_IMAGES = {
  Dormitorio:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80&auto=format&fit=crop",
  Tecnología:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=80&auto=format&fit=crop",
  Hogar:
    "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1400&q=80&auto=format&fit=crop",
};

function getCatalogImageSources(product) {
  if (!product) return [];

  const sources = [];
  if (product.mainImage) sources.push(product.mainImage);

  (product.gallery ?? [])
    .filter(Boolean)
    .forEach((url) => {
      if (!sources.includes(url)) sources.push(url);
    });

  return sources;
}

export function resolveProductImage(product, galleryIndex = 0) {
  if (!product) return null;

  if (product.mainImage) return product.mainImage;

  const gallery = (product.gallery ?? []).filter(Boolean);
  if (gallery.length > 0) {
    return gallery[galleryIndex] ?? gallery[0];
  }

  return getTemporaryGalleryImage(product, galleryIndex);
}

export function getTemporaryGalleryImages(product) {
  if (!product) return [];
  if (product.slug && TEMP_GALLERY_IMAGES[product.slug]) {
    return TEMP_GALLERY_IMAGES[product.slug];
  }
  const single = getTemporaryProductImage(product);
  return single ? [single] : [];
}

export function getTemporaryProductImage(product) {
  if (!product) return null;
  if (product.slug && TEMP_PRODUCT_IMAGES[product.slug]) {
    return TEMP_PRODUCT_IMAGES[product.slug];
  }
  if (product.category && TEMP_CATEGORY_IMAGES[product.category]) {
    return TEMP_CATEGORY_IMAGES[product.category];
  }
  return null;
}

export function getTemporaryGalleryImage(product, index = 0) {
  const gallery = getTemporaryGalleryImages(product);
  if (!gallery.length) return getTemporaryProductImage(product);
  return gallery[index % gallery.length];
}

export function getImageFallbackChain(src, product, galleryIndex = 0) {
  const chain = [];
  const catalog = getCatalogImageSources(product);

  if (src) {
    chain.push(src);
  } else {
    const catalogPrimary = catalog[galleryIndex] ?? catalog[0];
    if (catalogPrimary) chain.push(catalogPrimary);
  }

  catalog.forEach((url) => {
    if (url && !chain.includes(url)) chain.push(url);
  });

  const tempGallery = getTemporaryGalleryImages(product);
  for (let offset = 0; offset < tempGallery.length; offset += 1) {
    const url = tempGallery[(galleryIndex + offset) % tempGallery.length];
    if (url && !chain.includes(url)) chain.push(url);
  }

  const single = getTemporaryProductImage(product);
  if (single && !chain.includes(single)) chain.push(single);

  return chain;
}

export function shouldUseTemporaryFallback(src) {
  if (!src) return true;
  return src.startsWith(LOCAL_IMAGE_PREFIX);
}

export function resolveInitialImageSrc(src, product, galleryIndex = 0) {
  if (src) return src;
  return resolveProductImage(product, galleryIndex);
}

export function resolveGallerySources(product) {
  const localGallery = product?.gallery?.filter(Boolean) ?? [];

  if (localGallery.length > 0) {
    return localGallery.map((src, index) => ({ src, index }));
  }

  if (product?.mainImage) {
    return [{ src: product.mainImage, index: 0 }];
  }

  const tempGallery = getTemporaryGalleryImages(product);
  if (tempGallery.length > 0) {
    return tempGallery.map((src, index) => ({ src, index }));
  }

  return [{ src: null, index: 0 }];
}
