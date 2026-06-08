import { Link } from "react-router-dom";
import {
  BadgeCheck,
  ChevronRight,
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

export default function HowItWorksSection({ compact = false, top = false }) {
  const classes = ["flowBlock"];
  if (compact) classes.push("flowBlockProduct");
  if (top) classes.push("flowBlockProductTop");

  return (
    <section className={classes.join(" ")}>
      <h2>¿Cómo funciona?</h2>
      <div className="flowSteps">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="flowStepWrap" key={step.title}>
              <article className={`flowStep flowStep--${index + 1}`}>
                <div className="flowStepVisual">
                  <span className="flowStepNumber">{index + 1}</span>
                  <div className="flowStepIcon">
                    <Icon size={28} strokeWidth={2.2} />
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
                  <ChevronRight className="flowArrowIcon" size={30} strokeWidth={2.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
