import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { resolveGallerySources } from "../../utils/productImage";
import ProductImage from "../ui/ProductImage";

function resolveStockBadge(product) {
  const stock = product.stockVisual ?? product.units;
  if (stock == null || stock >= 20) return null;
  return "Lote limitado";
}

export default function ProductGallery({ product, linkToProduct = false }) {
  const images = useMemo(() => resolveGallerySources(product), [product]);
  const stockBadge = resolveStockBadge(product);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

  const activeImage = images[activeIndex] ?? images[0];

  const mainImage = (
    <div className="productGalleryMain">
      {stockBadge && (
        <span className="productGalleryFeatured">{stockBadge}</span>
      )}
      <ProductImage
        src={activeImage?.src}
        product={product}
        galleryIndex={activeImage?.index ?? activeIndex}
        alt={product.name || "Producto"}
        className="productGalleryMainImage"
        eager
      />
    </div>
  );

  return (
    <div className="productGallery">
      {linkToProduct ? (
        <Link
          to={`/producto/${product.slug}`}
          className="productGalleryMainLink"
          aria-label={`Ver ${product.name}`}
        >
          {mainImage}
        </Link>
      ) : (
        mainImage
      )}
      {images.length > 1 && (
        <div className="productGalleryThumbs" role="tablist" aria-label="Miniaturas">
          {images.map((image, index) => (
            <button
              key={`${image.src ?? "temp"}-${image.index}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Imagen ${index + 1}`}
              className={`productGalleryThumb${index === activeIndex ? " isActive" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <ProductImage
                src={image.src}
                product={product}
                galleryIndex={image.index}
                alt=""
                className="productGalleryThumbImage"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
