import type { ReactNode } from "react";

/**
 * Oswald section title — 48px on mobile, 64px on desktop (larger on big screens).
 * Wrap the accent word in <Accent>. The inner span sits in a clipping mask for the
 * slide-up reveal in PageAnimations.
 */
export default function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[48px] leading-[normal] font-bold text-ink lg:text-[64px] 2xl:text-[72px] 3xl:text-[80px] ${className}`}
      data-animate="heading"
    >
      <span className="block overflow-hidden">
        <span className="block" data-animate="mask-inner">
          {children}
        </span>
      </span>
    </h2>
  );
}

export function Accent({ children, className = "text-accent" }: { children: ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
