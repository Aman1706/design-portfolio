const STROKES = {
  buddy: "text-buddy",
  lavender: "text-lavender",
  active: "text-active",
  "accent-alt": "text-accent-alt",
} as const;

/**
 * Donut showing a percentage, with the number in the middle (Figma: 128px, 12px stroke).
 * Renders at its final value; CaseStudyAnimations draws the arc and counts the number up on scroll.
 */
export default function StatRing({ value, color }: { value: number; color: keyof typeof STROKES }) {
  const r = 58;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative size-[112px] shrink-0 lg:size-[128px]" data-animate="stat-ring" data-value={value}>
      <svg viewBox="0 0 128 128" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="12" className="stroke-pill-border" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
          className={STROKES[color]}
          data-animate="stat-arc"
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center font-display text-[26px] font-bold text-surface tabular-nums lg:text-[30px]">
        <span data-animate="stat-value">{value}</span>%
      </p>
    </div>
  );
}
