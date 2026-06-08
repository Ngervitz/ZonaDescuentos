import { useEffect, useMemo, useState } from "react";
import ProductImage from "../ui/ProductImage";

function resolveGalleryImages(product) {
  const fromGallery = product.gallery?.filter(Boolean) ?? [];
  if (fromGallery.length > 0) return fromGallery;
  if (product.mainImage) return [product.mainImage];
  return [];
}

export default function ProductGallery({ product }) {
  const images = useMemo(() => resolveGalleryImages(product), [product]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

  if (images.length === 0) {
    return (
      <div className="productGallery">
        <div className="productGalleryMain">
          <ProductImage src={null} alt={product.name || "Producto"} eager />
        </div>
      </div>
    );
  }

  return (
    <div className="productGallery">
      <div className="productGalleryMain">
        {product.isMain && <span className="productGalleryFeatured">DESTACADO</span>}
        <ProductImage
          src={images[activeIndex]}
          alt={`${product.name} - imagen ${activeIndex + 1}`}
          className="productGalleryMainImage"
          eager
        />
      </div>
      {images.length > 1 && (
        <div className="productGalleryThumbs" role="tablist" aria-label="Miniaturas">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Imagen ${index + 1}`}
              className={`productGalleryThumb${index === activeIndex ? " isActive" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <ProductImage src={src} alt="" className="productGalleryThumbImage" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
