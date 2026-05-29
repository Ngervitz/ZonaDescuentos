import {
  Armchair,
  BadgePercent,
  BedDouble,
  Car,
  Calendar,
  Clapperboard,
  ClipboardCheck,
  CreditCard,
  Headphones,
  Heart,
  HeartPulse,
  Home,
  Lamp,
  Luggage,
  MapPin,
  Navigation,
  Package,
  Pill,
  Plane,
  Shield,
  ShieldCheck,
  Ship,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Ticket,
  Truck,
  Wrench,
} from "lucide-react";
import { BENEFITS_DISCLAIMER, getBenefitsGrouped } from "../data/benefits";
import { SiteFooter, SiteHeader } from "../components/layout/LandingChrome";

const ICON_MAP = {
  ShoppingBag,
  CreditCard,
  Home,
  HeartPulse,
  Ticket,
  Plane,
  Car,
  Sparkles,
  ShieldCheck,
  Calendar,
  Shield,
  Truck,
  ClipboardCheck,
  Store,
  BadgePercent,
  MapPin,
  Armchair,
  BedDouble,
  Lamp,
  Pill,
  Heart,
  Clapperboard,
  Luggage,
  Navigation,
  Ship,
  Wrench,
  ShoppingCart,
  Star,
  Package,
  Headphones,
};

function BenefitIcon({ name }) {
  const Icon = ICON_MAP[name] ?? Shield;
  return (
    <span className="benefitCardIcon">
      <Icon size={20} strokeWidth={2} />
    </span>
  );
}

function BenefitCard({ benefit }) {
  return (
    <article className="benefitCard">
      <BenefitIcon name={benefit.icon} />
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </article>
  );
}

export default function BenefitsPage() {
  const grouped = getBenefitsGrouped();

  return (
    <main className="landing benefitsPage">
      <SiteHeader />

      <section className="benefitsHero">
        <p className="benefitsHeroEyebrow">Beneficios</p>
        <h1>Todo lo que podés aprovechar con tu compra y tu tarjeta Cabal</h1>
        <p className="benefitsHeroText">
          Promociones, asistencias y oportunidades organizadas por rubro para que
          encuentres lo que te sirve.
        </p>
      </section>

      {grouped.map((group) => (
        <section className="benefitsCategory" key={group.id} id={group.id}>
          <div className="benefitsCategoryHead">
            <BenefitIcon name={group.icon} />
            <div>
              <h2>{group.name}</h2>
              <span className="benefitsCategoryLine" aria-hidden="true" />
            </div>
          </div>
          <div className="benefitsCardsGrid">
            {group.benefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </section>
      ))}

      <p className="benefitsDisclaimer">{BENEFITS_DISCLAIMER}</p>

      <SiteFooter />
    </main>
  );
}
