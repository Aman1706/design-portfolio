import type { ReactNode } from "react";

/**
 * Centers content with 16 / 40 / 80px side gutters.
 * Content width: 1120px (Figma desktop) → 1280px at ≥1536 → 1520px at ≥1920.
 */
export default function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-4 md:px-10 lg:px-20 2xl:max-w-[1440px] 3xl:max-w-[1680px] ${className}`}
    >
      {children}
    </div>
  );
}
