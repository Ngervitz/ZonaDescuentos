import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, CheckCircle2, ChevronLeft, Home, ShieldCheck, Truck, WalletCards, X } from "lucide-react";
import "./styles.css";

const PRODUCTS = [
  {
    id: "sommier-premium",
    name: "Sommier Premium 2 plazas",
    headline: "Renová tu descanso sin tarjeta.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    monthly: "$2.990",
    oldPrice: "$39.900",
    badge: "LOTE LIMITADO",
    units: 18,
    category: "Hogar",
  },
  {
    id: "notebook-lenovo",
    name: "Notebook Lenovo",
    headline: "Tu notebook en cuotas sin tarjeta.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    monthly: "$3.490",
    oldPrice: "$46.900",
    badge: "12 CUOTAS",
    units: 12,
    category: "Tecnología",
  },
  {
    id: "smart-tv",
    name: 'Smart TV 50"',
    headline: "Estrená TV sin usar tarjeta.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
    monthly: "$2.790",
    oldPrice: "$36.900",
    badge: "SIN TARJETA",
    units: 9,
    category: "Electro",
  },
];

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [wizardOpen, setWizardOpen] = useState(false);

  const secondaryProducts = useMemo(() => PRODUCTS.filter((p) => p.id !== selectedProduct.id), [selectedProduct]);

  function openWizard(product) {
    setSelectedProduct(product);
    setWizardOpen(true);
    trackEvent("cta_click", { product_id: product.id });
  }

  return (
    <main>
      <Header />

      <section className="hero">
        <div className="heroText">
          <div className="pill">PRIMERA COMPRA SIN TARJETA</div>
          <h1>Tu primera compra puede ser hoy.</h1>
          <p className="subtitle">Elegí tu producto y financiá hasta en <strong>12 cuotas sin recargo</strong>.</p>

          <div className="priceBlock">
            <span>Desde</span>
            <strong>{selectedProduct.monthly}</strong>
            <small>por mes</small>
          </div>

          <button className="primaryBtn" onClick={() => openWizard(selectedProduct)}>
            Ver si califico <ArrowRight size={20} />
          </button>

          <p className="legal">*Sujeto a aprobación crediticia. PTF informado al finalizar la solicitud.</p>
        </div>

        <div className="heroProduct">
          <div className="imageWrap">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="floatingBadge red">{selectedProduct.badge}</div>
            <div className="floatingBadge green">12 CUOTAS</div>
            <div className="floatingBadge blue">SIN TARJETA</div>
          </div>

          <div className="productCard">
            <div>
              <span className="category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p>Quedan {selectedProduct.units} unidades disponibles en esta tanda.</p>
            </div>
            <button onClick={() => openWizard(selectedProduct)}>Quiero este</button>
          </div>
        </div>
      </section>

      <section className="secondary">
        <div className="sectionHead">
          <h2>También podés elegir</h2>
          <p>Productos seleccionados para comprar sin tarjeta.</p>
        </div>

        <div className="productGrid">
          {secondaryProducts.map((product) => (
            <article className="miniCard" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="miniContent">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>Desde <strong>{product.monthly}</strong> / mes</p>
                <small>*Sujeto a aprobación crediticia.</small>
                <button onClick={() => openWizard(product)}>Ver si califico <ArrowRight size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <HowItWorks />
      <Benefits />

      <section className="finalCta">
        <h2>Comprá sin tarjeta, en cuotas y sin complicarte.</h2>
        <p>Elegí el producto que querés y verificá en minutos si calificás.</p>
        <button className="primaryBtn" onClick={() => openWizard(selectedProduct)}>
          Ver si califico <ArrowRight size={20} />
        </button>
      </section>

      <Footer />

      {wizardOpen && <Wizard product={selectedProduct} onClose={() => setWizardOpen(false)} apiUrl={API_URL} />}
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logoMark">%</div>
        <div>
          <strong>Zona Descuentos</strong>
          <span>asociada a credizona</span>
        </div>
      </div>
      <div className="headerTrust">
        <span><ShieldCheck size={18} /> Datos protegidos</span>
        <span><Truck size={18} /> Entrega coordinada</span>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section className="steps">
      <div className="sectionHead">
        <h2>Comprar es más fácil de lo que pensás.</h2>
        <p>Sin tarjeta. Sin vueltas. Con validación simple.</p>
      </div>
      <div className="stepsGrid">
        <div><span>1</span><h3>Elegís producto</h3><p>Seleccionás el producto que querés comprar.</p></div>
        <div><span>2</span><h3>Verificás si calificás</h3><p>Completás unos datos básicos en el formulario.</p></div>
        <div><span>3</span><h3>Recibís en tu casa</h3><p>Si se aprueba, se genera la orden de entrega.</p></div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits">
      <div><WalletCards /><strong>Hasta 12 cuotas</strong><span>Sin usar tarjeta.</span></div>
      <div><CheckCircle2 /><strong>Sin recargo</strong><span>Oferta simple y clara.</span></div>
      <div><Home /><strong>Entrega coordinada</strong><span>El proveedor recibe la orden.</span></div>
      <div><ShieldCheck /><strong>Garantía incluida</strong><span>Según producto seleccionado.</span></div>
    </section>
  );
}

function Wizard({ product, onClose, apiUrl }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", document: "", income: "", employment: "", department: "" });
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
      if (!/^09\d{7}$/.test(form.phone.replace(/\s/g, ""))) nextErrors.phone = "Ingresá un celular uruguayo válido. Ej: 099123456";
    }
    if (step === 2) {
      if (!/^\d{7,8}$/.test(form.document.replace(/\D/g, ""))) nextErrors.document = "Ingresá una cédula válida.";
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
      contact: { name: form.name, phone: form.phone, document: form.document },
      operation: {
        type: "financed_purchase",
        product_id: product.id,
        product_name: product.name,
        monthly_price: product.monthly,
        status: "lead_received",
        source: "zona_descuentos_landing",
      },
      financial: { income: form.income, employment: form.employment, department: form.department },
      meta: { created_at: new Date().toISOString() },
    };

    try {
      if (apiUrl) {
        await fetch(`${apiUrl}/lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        console.log("CRM payload:", payload);
      }
      setStatus("success");
      trackEvent("lead_sent_to_crm", { product_id: product.id });
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <div className="wizardOverlay">
      <div className="wizard">
        <button className="close" onClick={onClose}><X size={22} /></button>

        <div className="wizardTop">
          {step > 1 && status === "idle" ? <button className="back" onClick={() => setStep(step - 1)}><ChevronLeft size={18} /> Atrás</button> : <span />}
          <small>{product.name}</small>
        </div>

        <div className="progress"><div style={{ width: `${progress}%` }} /></div>

        {status === "success" ? (
          <div className="result">
            <CheckCircle2 size={54} />
            <h2>Solicitud recibida.</h2>
            <p>Estamos verificando tus datos. Si avanzás en el proceso, te vamos a contactar para continuar.</p>
            <button className="primaryBtn" onClick={onClose}>Cerrar</button>
          </div>
        ) : status === "error" ? (
          <div className="result">
            <h2>No pudimos enviar la solicitud.</h2>
            <p>Probá nuevamente en unos minutos.</p>
            <button className="primaryBtn" onClick={() => setStatus("idle")}>Reintentar</button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <WizardStep title="Empecemos con tus datos básicos." subtitle="Te lleva menos de un minuto.">
                <Field label="Nombre" error={errors.name}><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ej: Juan" /></Field>
                <Field label="Celular" error={errors.phone}><input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Ej: 099123456" inputMode="numeric" /></Field>
              </WizardStep>
            )}

            {step === 2 && (
              <WizardStep title="Ahora tu cédula." subtitle="La usamos para identificar tu solicitud.">
                <Field label="Cédula" error={errors.document}><input value={form.document} onChange={(e) => update("document", e.target.value)} placeholder="Sin puntos ni guion" inputMode="numeric" /></Field>
              </WizardStep>
            )}

            {step === 3 && (
              <WizardStep title="Unos datos más para evaluar." subtitle="Esto nos ayuda a verificar si calificás.">
                <Field label="Ingreso mensual aproximado" error={errors.income}><input value={form.income} onChange={(e) => update("income", e.target.value)} placeholder="Ej: 35000" inputMode="numeric" /></Field>
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
                    {["Montevideo","Canelones","Maldonado","Rocha","Colonia","San José","Florida","Lavalleja","Durazno","Flores","Soriano","Río Negro","Paysandú","Salto","Artigas","Rivera","Tacuarembó","Cerro Largo","Treinta y Tres"].map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
              </WizardStep>
            )}

            {step === 4 && (
              <WizardStep title="Último paso." subtitle="Vamos a enviar tu solicitud para verificar si calificás.">
                <div className="summary">
                  <strong>{product.name}</strong>
                  <span>Hasta 12 cuotas sin recargo</span>
                  <span>Desde {product.monthly} / mes</span>
                  <small>*Sujeto a aprobación crediticia. PTF informado al finalizar.</small>
                </div>
              </WizardStep>
            )}

            <button className="primaryBtn full" onClick={next} disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : step === 4 ? "Enviar solicitud" : "Continuar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function WizardStep({ title, subtitle, children }) {
  return <div className="wizardStep"><h2>{title}</h2><p>{subtitle}</p>{children}</div>;
}

function Field({ label, error, children }) {
  return <label className="field"><span>{label}</span>{children}{error && <small className="error">{error}</small>}</label>;
}

function Footer() {
  return (
    <footer>
      <strong>Zona Descuentos</strong>
      <span>asociada a credizona</span>
      <small>*Sujeto a aprobación crediticia. La disponibilidad, cuotas y condiciones pueden variar según producto y evaluación.</small>
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
