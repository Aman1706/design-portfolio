import type { ReactNode } from "react";
import type { Tone } from "./CaseSection";

/** "01 | PROBLEM STATEMENT" — Oswald eyebrow in the accent red (brighter on dark). */
export function SectionLabel({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={`font-display text-[18px] leading-[normal] font-medium tracking-[0.08em] uppercase lg:text-[24px] ${
        tone === "dark" ? "text-accent-alt" : "text-accent"
      }`}
      data-animate="reveal"
    >
      {children}
    </p>
  );
}

export type TitleFont = "display" | "sans";

const TITLE_FONTS: Record<TitleFont, string> = {
  /** Oswald — 72px in Figma */
  display: "font-display text-[40px] leading-[1.15] md:text-[56px] lg:text-[72px] lg:leading-[normal] 2xl:text-[80px]",
  /** DM Sans — 64px in Figma (UI case studies on light sections) */
  sans: "text-[36px] leading-[1.12] md:text-[48px] lg:text-[64px] 2xl:text-[72px]",
};

/** Section title with the masked slide-up reveal (same pattern as `SectionHeading`). */
export function SectionTitle({
  children,
  as: Tag = "h2",
  font = "display",
}: {
  children: ReactNode;
  as?: "h2" | "h3";
  font?: TitleFont;
}) {
  return (
    <Tag className={`font-bold ${TITLE_FONTS[font]}`} data-animate="heading">
      <span className="block overflow-hidden">
        <span className="block" data-animate="mask-inner">
          {children}
        </span>
      </span>
    </Tag>
  );
}

/** Supporting paragraph under a section title. */
export function SectionText({
  children,
  tone = "light",
  className = "max-w-[720px]",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={`text-[16px] leading-[1.5] lg:text-[18px] 3xl:text-[20px] ${
        tone === "dark" ? "text-on-dark-soft" : "text-ink-soft"
      } ${className}`}
      data-animate="reveal"
    >
      {children}
    </p>
  );
}

/** Label + title + intro, stacked. Pass `title` as null to render label and text only. */
export default function SectionIntro({
  label,
  title,
  intro,
  tone = "light",
  titleFont = "display",
}: {
  label?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  titleFont?: TitleFont;
}) {
  return (
    <div className="flex flex-col gap-4">
      {label && <SectionLabel tone={tone}>{label}</SectionLabel>}
      {title && <SectionTitle font={titleFont}>{title}</SectionTitle>}
      {intro && <SectionText tone={tone}>{intro}</SectionText>}
    </div>
  );
}

/** Small pill used to introduce a sub-part of a section ("Task flow", "User flow"…). */
export function Chip({ children, variant = "soft" }: { children: ReactNode; variant?: "soft" | "solid" }) {
  return (
    <span
      className={`self-start rounded-full px-5 py-2 text-[15px] leading-[normal] font-medium ${
        variant === "solid" ? "bg-buddy text-white" : "bg-buddy-soft text-ink"
      }`}
    >
      {children}
    </span>
  );
}
