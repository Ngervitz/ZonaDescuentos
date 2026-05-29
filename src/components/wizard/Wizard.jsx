import { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import WizardStep from "./WizardStep";
import WizardField from "./WizardField";
import WizardProgress from "./WizardProgress";
import WizardLoading from "./WizardLoading";
import WizardSuccess from "./WizardSuccess";
import WizardError from "./WizardError";
import ClientFound from "./ClientFound";
import ClientNew from "./ClientNew";
import MainButton from "../ui/MainButton";
import { buildLeadPayload, lookupClient, submitLead } from "../../services/crm";
import {
  trackClientFound,
  trackClientNew,
  trackWizardError,
  trackWizardOpen,
  trackWizardStep,
  trackWizardSubmit,
  trackWizardSuccess,
} from "../../services/tracking";
import { DEPARTMENTS, EMPLOYMENT_OPTIONS, hasErrors, validateWizardStep } from "../../utils/validation";

const TOTAL_STEPS = 4;

const INITIAL_FORM = {
  name: "",
  phone: "",
  document: "",
  income: "",
  employment: "",
  department: "",
};

export default function Wizard({ product, onClose }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [clientStatus, setClientStatus] = useState(null);
  const [foundClient, setFoundClient] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  useEffect(() => {
    trackWizardOpen(product);
  }, [product]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleClientLookup(document) {
    setLookupLoading(true);
    setClientStatus(null);
    setFoundClient(null);

    try {
      const result = await lookupClient(document);

      if (result.found) {
        setClientStatus("found");
        setFoundClient(result.client);
        setForm((prev) => ({
          ...prev,
          name: result.client.name,
          phone: result.client.phone,
        }));
        trackClientFound(product, document);
      } else {
        setClientStatus("new");
        trackClientNew(product);
      }
    } catch {
      setClientStatus("new");
      trackClientNew(product);
    } finally {
      setLookupLoading(false);
    }
  }

  async function next() {
    const stepErrors = validateWizardStep(step, form);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }

    if (step === 2 && !clientStatus) {
      await handleClientLookup(form.document);
      return;
    }

    if (step < TOTAL_STEPS) {
      trackWizardStep(step + 1, product);
      setStep((current) => current + 1);
      return;
    }

    setStatus("loading");
    trackWizardSubmit(product);

    const payload = buildLeadPayload({
      product,
      form,
      clientStatus: clientStatus ?? "new",
    });

    try {
      await submitLead(payload);
      setStatus("success");
      trackWizardSuccess(product);
    } catch (error) {
      setStatus("error");
      trackWizardError(product, error.message);
    }
  }

  function back() {
    if (step > 1 && status === "idle") {
      setStep((current) => current - 1);
    }
  }

  function retry() {
    setStatus("idle");
    setStep(TOTAL_STEPS);
  }

  const isBusy = status === "loading" || lookupLoading;

  return (
    <div className="wizardOverlay" role="dialog" aria-modal="true" aria-label="Solicitud de calificación">
      <div className="wizard">
        <button className="close" onClick={onClose} type="button" aria-label="Cerrar">
          <X size={22} />
        </button>

        <div className="wizardTop">
          {step > 1 && status === "idle" ? (
            <button className="back" onClick={back} type="button">
              <ChevronLeft size={18} /> Atrás
            </button>
          ) : (
            <span />
          )}
          <small>{product.name}</small>
        </div>

        {status === "idle" && <WizardProgress step={step} totalSteps={TOTAL_STEPS} />}

        {status === "loading" && <WizardLoading />}

        {status === "success" && <WizardSuccess onClose={onClose} />}

        {status === "error" && <WizardError onRetry={retry} />}

        {status === "idle" && (
          <>
            {step === 1 && (
              <WizardStep title="Empecemos con tus datos." subtitle="Te lleva menos de un minuto.">
                <WizardField label="Nombre" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ej: Juan"
                    autoComplete="name"
                  />
                </WizardField>
                <WizardField label="Celular" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="Ej: 099123456"
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                </WizardField>
              </WizardStep>
            )}

            {step === 2 && (
              <WizardStep title="Ahora tu cédula." subtitle="La usamos para identificar tu solicitud.">
                <WizardField label="Cédula" error={errors.document}>
                  <input
                    value={form.document}
                    onChange={(e) => {
                      update("document", e.target.value);
                      setClientStatus(null);
                      setFoundClient(null);
                    }}
                    placeholder="Sin puntos ni guion"
                    inputMode="numeric"
                  />
                </WizardField>

                {lookupLoading && <p className="lookupHint">Buscando tus datos...</p>}
                {clientStatus === "found" && foundClient && <ClientFound client={foundClient} />}
                {clientStatus === "new" && !lookupLoading && <ClientNew />}
              </WizardStep>
            )}

            {step === 3 && (
              <WizardStep title="Unos datos más." subtitle="Esto nos ayuda a verificar si calificás.">
                <WizardField label="Ingreso mensual aproximado" error={errors.income}>
                  <input
                    value={form.income}
                    onChange={(e) => update("income", e.target.value)}
                    placeholder="Ej: 35000"
                    inputMode="numeric"
                  />
                </WizardField>

                <WizardField label="Situación laboral" error={errors.employment}>
                  <select
                    value={form.employment}
                    onChange={(e) => update("employment", e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {EMPLOYMENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </WizardField>

                <WizardField label="Departamento" error={errors.department}>
                  <select
                    value={form.department}
                    onChange={(e) => update("department", e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </WizardField>
              </WizardStep>
            )}

            {step === 4 && (
              <WizardStep title="Último paso." subtitle="Vamos a enviar tu solicitud.">
                <div className="summary">
                  <strong>{product.name}</strong>
                  <span>Hasta {product.pricing.installmentsLabel} sin recargo</span>
                  <span>Desde {product.pricing.monthlyFormatted} / mes</span>
                  {clientStatus === "found" && (
                    <span className="summaryTag">Cliente registrado</span>
                  )}
                  <small>
                    Si calificás, recibís la compra y luego tu tarjeta Cabal para pagar las cuotas.
                    *Sujeto a aprobación crediticia. PTF informado al finalizar.
                  </small>
                </div>
              </WizardStep>
            )}

            <MainButton full onClick={next} disabled={isBusy}>
              {lookupLoading
                ? "Verificando..."
                : step === TOTAL_STEPS
                  ? "Enviar solicitud"
                  : "Continuar"}
            </MainButton>
          </>
        )}
      </div>
    </div>
  );
}
