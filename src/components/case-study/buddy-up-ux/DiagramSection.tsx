import type { ReactNode } from "react";
import type { CaseImage } from "@/data/case-studies/types";
import CaseSection, { type Tone } from "../CaseSection";
import ZoomableImage from "../ZoomableImage";

/** `sizes` for an exported diagram that spans the content column. */
export const DIAGRAM_SIZES =
  "(min-width: 1920px) 1520px, (min-width: 1536px) 1280px, (min-width: 1024px) 1120px, 100vw";

/** A section whose body is one exported diagram (plus optional footnote) under an intro. */
export default function DiagramSection({
  tone,
  label,
  intro,
  image,
  note,
}: {
  tone: Tone;
  label: string;
  intro: ReactNode;
  image: CaseImage;
  note?: string;
}) {
  return (
    <CaseSection tone={tone} label={label}>
      {intro}
      <figure className="flex flex-col gap-4" data-animate="reveal">
        <ZoomableImage image={image} sizes={DIAGRAM_SIZES} />
        {note && (
          <figcaption className="text-[13px] leading-[1.45] text-ink-soft-alt lg:text-[14px]">{note}</figcaption>
        )}
      </figure>
    </CaseSection>
  );
}
