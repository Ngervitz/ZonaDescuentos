import MainButton from "../ui/MainButton";

export default function WizardError({ onRetry }) {
  return (
    <div className="result">
      <h2>No pudimos enviar la solicitud.</h2>
      <p>Probá nuevamente en unos minutos.</p>
      <MainButton onClick={onRetry}>Reintentar</MainButton>
    </div>
  );
}
