import { useState } from "react";

export default function ProductImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  eager = false,
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`productImageFallback${className ? ` ${className}` : ""}`}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : loading}
      onError={() => setFailed(true)}
    />
  );
}
