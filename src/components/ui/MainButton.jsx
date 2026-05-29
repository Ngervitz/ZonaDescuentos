import { ArrowRight } from "lucide-react";

export default function MainButton({
  children,
  onClick,
  disabled = false,
  full = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      className={`btnYellow${full ? " btnYellowFull" : ""} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <ArrowRight size={22} strokeWidth={2.5} />
    </button>
  );
}
