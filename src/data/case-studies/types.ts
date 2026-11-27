import type { Tone } from "@/components/case-study/CaseSection";
import type { TitleFont } from "@/components/case-study/SectionIntro";

/** An image exported from Figma. width/height are the file's pixel size (exports are 2x). */
export type CaseImage = { src: string; alt: string; width: number; height: number };

/** A case-study header: one exported image, with its text repeated for screen readers / small screens. */
export type CaseBanner = { image: CaseImage; title: string; eyebrow: string; tags: string; tagline: string };

/* ── UI case studies (iOS / Android) ─────────────────────────────────────── */

export type Note = { title: string; body: string };

/** A phone screen; Android screens carry a numbered step badge ("01 · Welcome"). */
export type Screen = CaseImage & { step?: { n: string; label: string } };

/** One or more screens with a caption underneath. */
export type ScreenGroup = Note & {
  screens: Screen[];
  /** Columns this group spans in its row on desktop (default 1). */
  span?: 1 | 2;
};

export type ScreenRow = {
  /** Desktop column count for the row. */
  columns: 2 | 3 | 4 | 5;
  groups: ScreenGroup[];
  /** Small-caps label above the row ("LOADING & EMPTY"). */
  label?: string;
  /** Heading above the label ("States"). */
  heading?: Note;
  /** Coloured band behind the row (Android). "solid" switches text to white. */
  panel?: "solid" | "soft";
};

export type Block =
  /** Intro on the left, exported image on the right (iOS colour / typography). */
  | { kind: "split"; title: string; body: string; image: CaseImage }
  /** Exported images stacked full width (Android colour / typography). */
  | { kind: "images"; images: CaseImage[] }
  /** Component cards in a grid. */
  | { kind: "cards"; title?: string; columns: 2 | 3; cards: CaseImage[] }
  /** Rows of phone screens with captions. */
  | { kind: "screens"; rows: ScreenRow[] }
  /** The gradient "Here's your plan" panel with Bud and the generated-plan phone. */
  | { kind: "plan"; step?: { n: string; label: string }; title: string; body: string; phone: CaseImage }
  /** A live coded prototype: embedded on desktop, with a link to open it full screen. */
  | { kind: "prototype"; src: string; title: string; cta: string }
  | { kind: "divider" };

export type PlatformSection = {
  label: string;
  title: string;
  intro: string;
  tone: Tone;
  titleFont: TitleFont;
  blocks: Block[];
};

export type PlatformCaseStudy = {
  platform: "ios" | "android";
  meta: { title: string; description: string };
  banner: CaseBanner;
  sections: PlatformSection[];
};
