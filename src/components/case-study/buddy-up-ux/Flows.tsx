import Image from "next/image";
import type { ReactNode } from "react";
import { flows } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import SectionIntro, { Chip } from "../SectionIntro";
import ZoomableImage from "../ZoomableImage";
import { DIAGRAM_SIZES } from "./DiagramSection";

function SubHeading({ chip, lead, aside }: { chip: string; lead: string; aside?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12" data-animate="reveal">
      <div className="flex max-w-[835px] flex-col gap-3">
        <Chip variant="solid">{chip}</Chip>
        <h3 className="text-[20px] leading-[1.35] font-medium lg:text-[24px]">{lead}</h3>
      </div>
      {aside}
    </div>
  );
}

/** 11 — task flows and the full user flow (both exported diagrams). */
export default function Flows() {
  const { taskFlow, userFlow } = flows;

  return (
    <CaseSection tone="white" label="Task flow and user flow">
      <SectionIntro label={flows.label} title={flows.title} intro={flows.intro} />

      <div className="flex flex-col gap-8 lg:gap-12">
        <SubHeading chip={taskFlow.chip} lead={taskFlow.lead} />
        <div data-animate="reveal">
          <ZoomableImage image={taskFlow.image} sizes={DIAGRAM_SIZES} />
        </div>
      </div>

      <div className="flex flex-col gap-8 pt-6 lg:gap-12 lg:pt-12">
        <SubHeading
          chip={userFlow.chip}
          lead={userFlow.lead}
          aside={
            <Image
              src={userFlow.legend.src}
              alt={userFlow.legend.alt}
              width={userFlow.legend.width}
              height={userFlow.legend.height}
              sizes="205px"
              className="w-[180px] shrink-0 lg:w-[205px]"
            />
          }
        />
        <div data-animate="reveal">
          <ZoomableImage image={userFlow.image} sizes={DIAGRAM_SIZES} />
        </div>
      </div>
    </CaseSection>
  );
}
