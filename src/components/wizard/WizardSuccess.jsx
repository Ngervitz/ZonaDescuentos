import { CheckCircle2 } from "lucide-react";
import MainButton from "../ui/MainButton";

export default function WizardSuccess({ onClose }) {
  return (
    <div className="result">
      <CheckCircle2 size={56} />
      <h2>Solicitud recibida.</h2>
      <p>
        Estamos verificando tus datos. Si calificás, avanzamos con la compra,
        coordinamos la entrega y luego recibirás tu tarjeta Cabal para pagar las cuotas.
      </p>
      <MainButton onClick={onClose}>Cerrar</MainButton>
    </div>
  );
}
