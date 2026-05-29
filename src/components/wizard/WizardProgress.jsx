export default function WizardProgress({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="progress">
      <div style={{ width: `${progress}%` }} />
    </div>
  );
}
