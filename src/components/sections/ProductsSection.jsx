import ProductCard from "./ProductCard";

export default function ProductsSection({ products, onOpenWizard }) {
  return (
    <section className="productsBlock" id="productos">
      <div className="productsBlockHeader">
        <h2>Productos disponibles</h2>
        <p>Elegí el producto que mejor se adapte a vos y comenzá tu solicitud online.</p>
      </div>
      <div className="productsBlockInner">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} onOpenWizard={onOpenWizard} />
        ))}
      </div>
    </section>
  );
}
