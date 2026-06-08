import { useEffect, useState } from "react";
import ProductImage from "../ui/ProductImage";

export default function ProductGallery({ product }) {
  const images = product.gallery?.length ? product.gallery : [product.mainImage];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

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
