export default function ProductDetailsSection({ product }) {
  const hasFeatures = product.features?.length > 0;
  const hasSpecs = product.specs?.length > 0;
  const hasRecommended = product.recommendedFor?.length > 0;
  const hasConditions = product.conditions?.length > 0;

  if (!hasFeatures && !hasSpecs && !hasRecommended && !hasConditions && !product.longDescription) {
    return null;
  }

  return (
    <section className="productDetailsSection">
      <h2>Detalles del producto</h2>

      {product.longDescription && (
        <p className="productDetailsLead">{product.longDescription}</p>
      )}

      <div className="productDetailsGrid">
        {hasFeatures && (
          <article className="detailCard">
            <h3>Características</h3>
            <ul>
              {product.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        {hasSpecs && (
          <article className="detailCard">
            <h3>Especificaciones</h3>
            <dl className="specsList">
              {product.specs.map((spec) => (
                <div className="specsRow" key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        )}

        {hasRecommended && (
          <article className="detailCard">
            <h3>Recomendado para</h3>
            <ul>
              {product.recommendedFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        {hasConditions && (
          <article className="detailCard detailCardWide">
            <h3>Condiciones</h3>
            <ul>
              {product.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}
