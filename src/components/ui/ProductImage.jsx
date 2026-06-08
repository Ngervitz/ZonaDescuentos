import { useEffect, useMemo, useState } from "react";
import {
  getImageFallbackChain,
  resolveInitialImageSrc,
} from "../../utils/productImage";

export default function ProductImage({
  src,
  alt,
  product,
  galleryIndex = 0,
  className = "",
  loading = "lazy",
  eager = false,
  hideFallbackText = true,
}) {
  const fallbackChain = useMemo(
    () => getImageFallbackChain(src, product, galleryIndex),
    [src, product?.slug, galleryIndex]
  );

  const [chainIndex, setChainIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const activeSrc = fallbackChain[chainIndex] ?? null;

  useEffect(() => {
    setChainIndex(0);
    setFailed(false);
  }, [src, product?.slug, galleryIndex, fallbackChain.join("|")]);

  function handleError() {
    const nextIndex = chainIndex + 1;
    if (fallbackChain[nextIndex]) {
      setChainIndex(nextIndex);
      return;
    }
    setFailed(true);
  }

  if (!activeSrc || failed) {
    return (
      <div
        className={`productImageFallback${className ? ` ${className}` : ""}`}
        role="img"
        aria-label={alt}
      >
        {!hideFallbackText && alt ? <span>{alt}</span> : null}
      </div>
    );
  }

  return (
    <img
      key={activeSrc}
      src={activeSrc}
      alt={alt}
      className={className}
      loading={eager ? "eager" : loading}
      onError={handleError}
    />
  );
}
