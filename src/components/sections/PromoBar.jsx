import { Calendar, Package, ShieldCheck } from "lucide-react";

export default function PromoBar() {
  return (
    <div className="promoBar">
      <div className="promoItem">
        <ShieldCheck size={18} strokeWidth={2.2} />
        <span>Primera compra sin tarjeta</span>
      </div>
      <div className="promoItem">
        <Calendar size={18} strokeWidth={2.2} />
        <span>Hasta 12 cuotas</span>
      </div>
      <div className="promoItem">
        <Package size={18} strokeWidth={2.2} />
        <span>Recibí tu compra</span>
      </div>
    </div>
  );
}
