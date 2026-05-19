import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Menu,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCheck,
  X,
} from "lucide-react";
import "./styles.css";

const PRODUCTS = [
  {
    id: "sommier-premium",
    name: "Sommier Premium 2 plazas",
    shortName: "2 plazas",
    category: "Sommier Premium",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop",
    monthly: "$2.990",
    installments: "12 cuotas",
    units: 18,
    description: "Confort, calidad y descanso que se siente.",
  },
  {
    id: "notebook-lenovo",
    name: "Notebook Lenovo",
    shortName: "Notebook Lenovo",
    category: "Tecnología",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1400&auto=format&fit=crop",
    monthly: "$3.490",
    installments: "12 cuotas",
    units: 12,
    description: "Ideal para estudiar, trabajar y emprender.",
  },
  {
    id: "smart-tv",
    name: 'Smart TV 50"',
    shortName: 'Smart TV 50"',
    category: "Electro",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1400&auto=format&fit=crop",
    monthly: "$2.790",
    installments: "12 cuotas",
    units: 9,
    description: "Entretenimiento grande, fácil y en cuotas.",
  },
];

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [wizardOpen, setWizardOpen] = useState(false);

  const secondaryProducts = useMemo(
    () => PRODUCTS.filter((product) => product.id !== selectedProduct.id),
    [selectedProduct]
  );

  function openWizard(product) {
    setSelectedProduct(product);
    setWizardOpen(true);
    trackEvent("cta_click", { product_id: product.id });
  }

  return (
    <main>
      <Header />

      <section className="hero">
        <div className="heroCopy">
          <div className="badges">
            <span className="badge red">Lote limitado</span>
            <span className="badge green">12 cuotas</span>
            <span className="badge navy">Sin tarjeta</span>
          </div>

          <p className="eyebrow">{selectedProduct.category}</p>
          <h1>{selectedProduct.shortName}</h1>
          <p className="description">{selectedProduct.description}</p>

          <PriceCard product={selectedProduct} />
        </div>

        <div className="heroImage">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>

        <div className="heroAction">
          <button className="mainBtn" onClick={() => openWizard(selectedProduct)}>
            Ver si califico <ArrowRight size={22} />
          </button>
          <p>*Sujeto a aprobación crediticia. PTF informado al finalizar la solicitud.</p>
        </div>
      </section>

      <ProductSelector
        products={secondaryProducts}
        onSelect={(product) => {
          setSelectedProduct(product);
          trackEvent("product_view", { product_id: product.id });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onWizard={openWizard}
      />

      <Process />

      <CabalBox />

      <section className="finalCta">
        <h2>Tu próxima compra puede estar más cerca.</h2>
        <p>Elegí el producto, verificá si calificás y recibilo en tu casa.</p>
        <button className="mainBtn" onClick={() => openWizard(selectedProduct)}>
          Ver si califico ahora <ArrowRight size={22} />
        </button>
      </section>

      <Footer />

      {wizardOpen && (
        <Wizard
          product={selectedProduct}
          onClose={() => setWizardOpen(false)}
          apiUrl={API_URL}
        />
      )}
    </main>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logoMark">%</div>
        <div>
          <strong>zona<br />descuentos</strong>
        </div>
      </div>

      <div className="associated">
        <span>asociada a</span>
        <strong>credizona</strong>
      </div>

      <button className="menuBtn" aria-label="Menú">
        <Menu size={30} />
      </button>
    </header>
  );
}

function PriceCard({ product }) {
  return (
    <div className="priceCard">
      <span>Desde</span>
      <strong>{product.monthly}</strong>
      <small>por mes</small>
      <div>Hasta en <b>{product.installments}</b> sin recargo</div>
    </div>
  );
}

function ProductSelector({ products, onSelect, onWizard }) {
  return (
    <section className="products">
      <div className="sectionTitle">
        <h2>También podés elegir</h2>
        <p>Probá con otros productos seleccionados.</p>
      </div>

      <div className="productList">
        {products.map((product) => (
          <article className="productItem" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <span>{product.category}</span>
              <h3>{product.name}</h3>
              <p>Desde <strong>{product.monthly}</strong> / mes</p>
              <small>*Sujeto a aprobación crediticia.</small>
              <div className="productButtons">
                <button onClick={() => onSelect(product)}>Ver producto</button>
                <button className="secondaryBtn" onClick={() => onWizard(product)}>Calificar</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      icon: <ShoppingCart />,
      title: "Elegís tu producto",
      text: "Seleccionás el producto que querés comprar.",
    },
    {
      icon: <UserCheck />,
      title: "Verificamos si calificás",
      text: "Completás tus datos y vemos si podés avanzar.",
    },
    {
      icon: <Truck />,
      title: "Recibís tu compra",
      text: "Si se aprueba, coordinamos la entrega.",
    },
    {
      icon: <CreditCard />,
      title: "Recibís tu tarjeta Cabal",
      text: "Después te llega para pagar cuotas y acceder a beneficios.",
    },
  ];

  return (
    <section className="process">
      <div className="sectionTitle center">
        <h2>¿Cómo <span>funciona?</span></h2>
        <p>Un proceso simple, transparente y 100% online.</p>
      </div>

      <div className="stepsLine">
        {steps.map((step, index) => (
          <div className="step" key={step.title}>
            <div className="stepIcon">
              {step.icon}
              <span>{index + 1}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CabalBox() {
  return (
    <section className="cabalBox">
      <div className="cabalLogo">CABAL</div>
      <div>
        <h3>Tu tarjeta Cabal tiene muchos beneficios</h3>
        <p>Descuentos, cuotas en comercios adheridos, promociones exclusivas y más. Conocelos en los Términos y Condiciones.</p>
      </div>
      <ArrowRight size={26} />
    </section>
  );
}

function Wizard({ product, onClose, apiUrl }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    document: "",
    income: "",
    employment: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validateStep() {
    const nextErrors = {};

    if (step === 1) {
      if (form.name.trim().length < 2) nextErrors.name = "Ingresá tu nombre.";
      if (!/^09\d{7}$/.test(form.phone.replace(/\s/g, ""))) {
        nextErrors.phone = "Ingresá un celular uruguayo válido. Ej: 099123456";
      }
    }

    if (step === 2) {
      if (!/^\d{7,8}$/.test(form.document.replace(/\D/g, ""))) {
        nextErrors.document = "Ingresá una cédula válida.";
      }
    }

    if (step === 3) {
      if (!form.income || Number(form.income) < 1) nextErrors.income = "Ingresá tu ingreso mensual.";
      if (!form.employment) nextErrors.employment = "Seleccioná tu situación laboral.";
      if (!form.department) nextErrors.department = "Seleccioná tu departamento.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function next() {
    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
      trackEvent(`wizard_step_${step}_completed`, { product_id: product.id });
      return;
    }

    setStatus("loading");
    trackEvent("form_completed", { product_id: product.id });

    const payload = {
      contact: {
        name: form.name,
        phone: form.phone,
        document: form.document,
      },
      operation: {
        type: "financed_purchase",
        product_id: product.id,
        product_name: product.name,
        monthly_price: product.monthly,
        status: "lead_received",
        source: "zona_descuentos_landing",
        financing_note:
          "Cliente solicita compra financiada. Si califica, recibe el producto y luego tarjeta Cabal para pagar cuotas.",
      },
      financial: {
        income: form.income,
        employment: form.employment,
        department: form.department,
      },
      meta: {
        created_at: new Date().toISOString(),
      },
    };

    try {
      if (apiUrl) {
        await fetch(`${apiUrl}/lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("CRM payload:", payload);
      }

      setStatus("success");
      trackEvent("lead_sent_to_crm", { product_id: product.id });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="wizardOverlay">
      <div className="wizard">
        <button className="close" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="wizardTop">
          {step > 1 && status === "idle" ? (
            <button className="back" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={18} /> Atrás
            </button>
          ) : <span />}
          <small>{product.name}</small>
        </div>

        <div className="progress">
          <div style={{ width: `${progress}%` }} />
        </div>

        {status === "success" ? (
          <div className="result">
            <CheckCircle2 size={56} />
            <h2>Solicitud recibida.</h2>
            <p>
              Estamos verificando tus datos. Si calificás, avanzamos con la compra,
              coordinamos la entrega y luego recibirás tu tarjeta Cabal para pagar las cuotas.
            </p>
            <button className="mainBtn" onClick={onClose}>Cerrar</button>
          </div>
        ) : status === "error" ? (
          <div className="result">
            <h2>No pudimos enviar la solicitud.</h2>
            <p>Probá nuevamente en unos minutos.</p>
            <button className="mainBtn" onClick={() => setStatus("idle")}>Reintentar</button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <WizardStep title="Empecemos con tus datos." subtitle="Te lleva menos de un minuto.">
                <Field label="Nombre" error={errors.name}>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ej: Juan" />
                </Field>
                <Field label="Celular" error={errors.phone}>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Ej: 099123456" inputMode="numeric" />
                </Field>
              </WizardStep>
            )}

            {step === 2 && (
              <WizardStep title="Ahora tu cédula." subtitle="La usamos para identificar tu solicitud.">
                <Field label="Cédula" error={errors.document}>
                  <input value={form.document} onChange={(e) => update("document", e.target.value)} placeholder="Sin puntos ni guion" inputMode="numeric" />
                </Field>
              </WizardStep>
            )}

            {step === 3 && (
              <WizardStep title="Unos datos más." subtitle="Esto nos ayuda a verificar si calificás.">
                <Field label="Ingreso mensual aproximado" error={errors.income}>
                  <input value={form.income} onChange={(e) => update("income", e.target.value)} placeholder="Ej: 35000" inputMode="numeric" />
                </Field>

                <Field label="Situación laboral" error={errors.employment}>
                  <select value={form.employment} onChange={(e) => update("employment", e.target.value)}>
                    <option value="">Seleccionar</option>
                    <option value="dependiente">Dependiente</option>
                    <option value="independiente">Independiente</option>
                    <option value="jubilado">Jubilado / pensionista</option>
                    <option value="otro">Otro</option>
                  </select>
                </Field>

                <Field label="Departamento" error={errors.department}>
                  <select value={form.department} onChange={(e) => update("department", e.target.value)}>
                    <option value="">Seleccionar</option>
                    {["Montevideo","Canelones","Maldonado","Rocha","Colonia","San José","Florida","Lavalleja","Durazno","Flores","Soriano","Río Negro","Paysandú","Salto","Artigas","Rivera","Tacuarembó","Cerro Largo","Treinta y Tres"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </Field>
              </WizardStep>
            )}

            {step === 4 && (
              <WizardStep title="Último paso." subtitle="Vamos a enviar tu solicitud.">
                <div className="summary">
                  <strong>{product.name}</strong>
                  <span>Hasta 12 cuotas sin recargo</span>
                  <span>Desde {product.monthly} / mes</span>
                  <small>
                    Si calificás, recibís la compra y luego tu tarjeta Cabal para pagar las cuotas.
                    *Sujeto a aprobación crediticia. PTF informado al finalizar.
                  </small>
                </div>
              </WizardStep>
            )}

            <button className="mainBtn full" onClick={next} disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : step === 4 ? "Enviar solicitud" : "Continuar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function WizardStep({ title, subtitle, children }) {
  return (
    <div className="wizardStep">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <small className="error">{error}</small>}
    </label>
  );
}

function Footer() {
  return (
    <footer>
      <strong>Zona Descuentos</strong>
      <span>asociada a credizona</span>
      <small>
        *Sujeto a aprobación crediticia. La disponibilidad, cuotas y condiciones pueden variar según producto y evaluación.
        La tarjeta Cabal se emite según aprobación y condiciones del emisor.
      </small>
    </footer>
  );
}

function trackEvent(name, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (window.gtag) window.gtag("event", name, params);
  if (window.fbq) window.fbq("trackCustom", name, params);
}

createRoot(document.getElementById("root")).render(<App />);
