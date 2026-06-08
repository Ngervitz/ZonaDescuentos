import { Link } from "react-router-dom";
import {
  BadgeCheck,
  CreditCard,
  ShoppingCart,
  Truck,
} from "lucide-react";

const FLOW_STEPS = [
  {
    icon: ShoppingCart,
    title: "Elegís tu producto",
    text: "Seleccioná lo que querés y comenzá tu solicitud.",
  },
  {
    icon: BadgeCheck,
    title: "Verificamos si calificás",
    text: "Completá tus datos y te damos respuesta.",
  },
  {
    icon: Truck,
    title: "Recibís tu compra",
    text: "Si calificás, coordinamos la entrega.",
  },
  {
    icon: CreditCard,
    title: "Recibís tu tarjeta Cabal",
    text: "La recibís en tu casa, pagás tus cuotas y accedés a los beneficios de Cabal.",
    link: { href: "/beneficios", label: "Conocé todos los beneficios →" },
  },
];

export default function HowItWorksSection() {
  return (
    <section className="flowBlock">
      <h2>¿Cómo funciona?</h2>
      <div className="flowSteps">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="flowStepWrap" key={step.title}>
              <article className="flowStep">
                <div className="flowStepVisual">
                  <span className="flowStepNumber">{index + 1}</span>
                  <div className="flowStepIcon">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.link && (
                  <Link className="flowStepLink" to={step.link.href}>
                    {step.link.label}
                  </Link>
                )}
              </article>
              {index < FLOW_STEPS.length - 1 && (
                <div className="flowArrow" aria-hidden="true">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path
                      d="M0 6h16M16 6l-3-3M16 6l-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
