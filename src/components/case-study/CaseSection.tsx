import type { ReactNode } from "react";
import Container from "../Container";

export type Tone = "light" | "white" | "dark" | "ios-wash" | "android-wash";

const TONES: Record<Tone, string> = {
  light: "bg-surface text-ink",
  white: "bg-white text-ink",
  dark: "bg-ink text-surface",
  "ios-wash": "bg-buddy-wash text-ink",
  "android-wash": "bg-droid-wash text-ink",
};

/**
 * Full-bleed case-study section: background tone + standard vertical rhythm, content in `Container`.
 * Dark sections switch the cursor dot to its bright red (`data-cursor-tone="light"`).
 */
export default function CaseSection({
  tone = "light",
  id,
  label,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  /** Accessible name for the section landmark (usually the visible title). */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`py-16 md:py-24 lg:py-[120px] 2xl:py-[140px] ${TONES[tone]}`}
      data-cursor-tone={tone === "dark" ? "light" : undefined}
    >
      <Container className={`flex flex-col gap-10 lg:gap-12 ${className}`}>{children}</Container>
    </section>
  );
}
