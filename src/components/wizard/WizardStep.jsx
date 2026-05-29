export default function WizardStep({ title, subtitle, children }) {
  return (
    <div className="wizardStep">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </div>
  );
}
