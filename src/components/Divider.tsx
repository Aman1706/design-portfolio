/** 1px rule that PageAnimations draws in from the left. Parent must be `relative`. */
export default function Divider({ position }: { position: "top" | "bottom" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 h-px origin-left bg-divider ${position === "top" ? "top-0" : "bottom-0"}`}
      data-animate="divider"
    />
  );
}
