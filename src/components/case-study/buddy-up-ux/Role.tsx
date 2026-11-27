import { role } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import { SectionLabel } from "../SectionIntro";

export default function Role() {
  return (
    <CaseSection tone="white" label="My role">
      <SectionLabel>{role.label}</SectionLabel>
      <p
        className="max-w-[1120px] text-[28px] leading-[1.2] font-light md:text-[36px] lg:text-[48px] 3xl:text-[56px]"
        data-animate="reveal"
      >
        {role.lead}
      </p>
      <dl className="flex flex-col text-[16px] leading-[normal] lg:text-[18px]" data-animate="reveal">
        {role.rows.map((row) => (
          <div
            key={row.term}
            className="flex flex-col gap-1 border-b border-divider py-4 md:flex-row md:items-start md:justify-between md:gap-8 lg:py-[22px]"
          >
            <dt className="font-medium">{row.term}</dt>
            <dd className="text-ink-soft md:text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
    </CaseSection>
  );
}
