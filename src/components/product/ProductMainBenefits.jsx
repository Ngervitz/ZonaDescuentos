import { Award, BedDouble, Layers, Laptop, Monitor, Sparkles, Tv } from "lucide-react";

const PRODUCT_TRAITS = {
  "sommier-colchon-2-plazas": [
    { icon: Layers, title: "Alta densidad", desc: "Espuma de alta calidad." },
    { icon: Award, title: "Soporte reforzado", desc: "Mayor durabilidad." },
    { icon: Sparkles, title: "Tela premium", desc: "Terminaciones de calidad." },
    { icon: BedDouble, title: "2 plazas", desc: "Espacio cómodo para descansar." },
    { icon: Award, title: "Garantía de fábrica", desc: "Cobertura del fabricante." },
    { icon: BedDouble, title: "Descanso ergonómico", desc: "Mayor confort diario." },
  ],
  "notebook-lenovo": [
    { icon: Laptop, title: "Rendimiento confiable", desc: "Ideal para estudiar y trabajar." },
    { icon: Monitor, title: "Pantalla clara", desc: "Buena visualización diaria." },
    { icon: Sparkles, title: "Diseño portátil", desc: "Llevá tu notebook a todos lados." },
    { icon: Award, title: "Teclado cómodo", desc: "Mejor experiencia de uso." },
    { icon: Layers, title: "Construcción sólida", desc: "Pensada para el día a día." },
    { icon: Laptop, title: "Lista para usar", desc: "Conectá y empezá." },
  ],
  "smart-tv": [
    { icon: Tv, title: "Smart TV", desc: "Accedé a tus apps favoritas." },
    { icon: Monitor, title: "Alta definición", desc: "Imagen nítida en tu hogar." },
    { icon: Sparkles, title: "Pantalla amplia", desc: "Mejor experiencia visual." },
    { icon: Award, title: "Fácil instalación", desc: "Lista para conectar." },
    { icon: Tv, title: "Ideal para streaming", desc: "Series, películas y deportes." },
    { icon: Layers, title: "Diseño moderno", desc: "Se integra a tu living." },
  ],
};

function buildProductTraits(product) {
  const preset = PRODUCT_TRAITS[product?.slug];
  if (preset?.length) return preset;

  return (product?.features ?? [])
    .filter(Boolean)
    .slice(0, 6)
    .map((text) => ({
      icon: Sparkles,
      title: text,
      desc: "",
    }));
}

export default function ProductMainBenefits({ product }) {
  const traits = buildProductTraits(product);
  if (!traits.length) return null;

  return (
    <section className="productMainBenefits" aria-label="Características del producto">
      <h2 className="productMainBenefitsTitle">Características del producto</h2>
      <div className="productMainBenefitsGrid">
        {traits.map((trait) => {
          const Icon = trait.icon;
          return (
            <article className="productMainBenefitCard" key={trait.title}>
              <span className="productMainBenefitIcon">
                <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <strong>{trait.title}</strong>
              {trait.desc && <p>{trait.desc}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
