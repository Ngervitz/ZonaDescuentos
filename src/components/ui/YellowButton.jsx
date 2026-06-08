import { ArrowRight } from "lucide-react";

export default function YellowButton({
  children,
  onClick,
  compact = false,
  fullWidth = false,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btnYellow${compact ? " btnYellowCompact" : ""}${fullWidth ? " btnYellowFull" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <ArrowRight size={compact ? 18 : 22} strokeWidth={2.5} />
    </button>
  );
}
