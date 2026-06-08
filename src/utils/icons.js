import {
  CreditCard,
  Gift,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

const ICON_MAP = {
  Truck,
  Wrench,
  Package,
  CreditCard,
  ShieldCheck,
  Gift,
  Sparkles,
  ShoppingBag,
};

export function resolveIcon(name, fallback = Package) {
  return ICON_MAP[name] ?? fallback;
}
