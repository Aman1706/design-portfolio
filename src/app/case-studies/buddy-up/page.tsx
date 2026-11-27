import type { Metadata } from "next";
import Banner from "@/components/case-study/Banner";
import CaseStudyShell from "@/components/case-study/CaseStudyShell";
import DiagramSection from "@/components/case-study/buddy-up-ux/DiagramSection";
import Flows from "@/components/case-study/buddy-up-ux/Flows";
import Persona from "@/components/case-study/buddy-up-ux/Persona";
import Problem from "@/components/case-study/buddy-up-ux/Problem";
import Research from "@/components/case-study/buddy-up-ux/Research";
import Role from "@/components/case-study/buddy-up-ux/Role";
import UiChanges from "@/components/case-study/buddy-up-ux/UiChanges";
import Usability from "@/components/case-study/buddy-up-ux/Usability";
import Wireframes from "@/components/case-study/buddy-up-ux/Wireframes";
import SectionIntro, { Chip, SectionLabel, SectionText, SectionTitle } from "@/components/case-study/SectionIntro";
import { cardSort, competitive, hero, ia, journey, meta, process, strategy } from "@/data/case-studies/buddy-up-ux";

export const metadata: Metadata = {
  title: `${meta.title} · Aman Nayak`,
  description: meta.description,
};

/** Title on the left, intro on the right (desktop) — used by Competitive Analysis and Card Sorting. */
function SplitIntro({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <div className="flex flex-col gap-4 lg:gap-12">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionTitle>{title}</SectionTitle>
        <SectionText className="max-w-[480px] lg:pb-3">{intro}</SectionText>
      </div>
    </div>
  );
}

export default function BuddyUpUxCaseStudy() {
  return (
    <CaseStudyShell>
      <Banner banner={hero} />
      <Problem />
      <Role />

      <DiagramSection
        tone="dark"
        label="Design process"
        image={process.image}
        intro={<SectionIntro tone="dark" label={process.label} title={process.title} intro={process.intro} />}
      />

      <DiagramSection
        tone="light"
        label="Design strategy"
        image={strategy.image}
        intro={
          <div className="flex flex-col gap-4">
            <SectionLabel>{strategy.label}</SectionLabel>
            <div className="flex flex-col gap-2" data-animate="reveal">
              <p className="text-[13px] leading-[normal] tracking-[0.08em] text-ink-soft uppercase">
                {strategy.kicker}
              </p>
              <h2 className="text-[32px] leading-[1.2] font-light md:text-[40px] lg:text-[48px]">{strategy.title}</h2>
            </div>
          </div>
        }
      />

      <DiagramSection
        tone="white"
        label="Competitive analysis"
        image={competitive.image}
        note={competitive.note}
        intro={<SplitIntro label={competitive.label} title={competitive.title} intro={competitive.intro} />}
      />

      <Research />
      <Persona />

      <DiagramSection
        tone="light"
        label="Journey map"
        image={journey.image}
        intro={<SectionIntro label={journey.label} title={journey.title} intro={journey.intro} />}
      />

      <DiagramSection
        tone="white"
        label="Card sorting"
        image={cardSort.image}
        intro={<SplitIntro label={cardSort.label} title={cardSort.title} intro={cardSort.intro} />}
      />

      <DiagramSection
        tone="light"
        label="Information architecture"
        image={ia.image}
        intro={
          <div className="flex flex-col gap-4 lg:gap-6">
            <SectionLabel>{ia.label}</SectionLabel>
            <Chip>{ia.chip}</Chip>
            <h2 className="max-w-[760px] text-[22px] leading-[1.35] font-medium lg:text-[28px]" data-animate="reveal">
              {ia.lead}
            </h2>
          </div>
        }
      />

      <Flows />
      <Wireframes />
      <UiChanges />
      <Usability />
    </CaseStudyShell>
  );
}
