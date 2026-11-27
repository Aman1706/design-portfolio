import { uiChanges } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import SectionIntro from "../SectionIntro";

/** 13 — what was cut or moved between the flows and the UI. A table on md+, cards below. */
export default function UiChanges() {
  const [beforeCol, afterCol, whyCol] = uiChanges.columns;

  return (
    <CaseSection tone="dark" label="What changed in the UI phase">
      <SectionIntro tone="dark" label={uiChanges.label} title={uiChanges.title} intro={uiChanges.intro} />

      <div className="rounded-[24px] border border-surface/8 bg-card-dark px-5 py-2 md:px-8" data-animate="reveal">
        <table className="w-full border-collapse text-left text-[15px] max-md:block">
          <thead className="max-md:sr-only">
            <tr className="text-[12px] tracking-[0.08em] text-ink-soft-alt uppercase">
              <th scope="col" className="w-[240px] pt-5 pr-8 pb-4 font-medium">
                {beforeCol}
              </th>
              <th scope="col" className="w-[200px] pt-5 pr-8 pb-4 font-medium">
                {afterCol}
              </th>
              <th scope="col" className="pt-5 pb-4 font-medium">
                {whyCol}
              </th>
            </tr>
          </thead>
          <tbody className="max-md:block">
            {uiChanges.rows.map((row, i) => (
              <tr
                key={row.after}
                className={`flex flex-col gap-2 border-surface/10 py-5 md:table-row md:py-0 ${i > 0 ? "border-t" : "md:border-t"}`}
              >
                <td className="leading-[1.45] text-ink-soft-alt line-through md:py-6 md:pr-8 md:align-top">
                  {row.before}
                </td>
                <td className="leading-[1.45] font-semibold text-buddy md:py-6 md:pr-8 md:align-top">{row.after}</td>
                <td className="leading-[1.5] text-on-dark-soft md:py-6 md:align-top">{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        className="flex items-center gap-4 rounded-[20px] border border-dashed border-buddy px-5 py-5 text-[16px] leading-[normal] md:px-7 md:py-6"
        data-animate="reveal"
      >
        <span className="size-2.5 shrink-0 rounded-full bg-buddy" aria-hidden="true" />
        <span>
          {uiChanges.note.before}
          <a href={uiChanges.note.ios.href} className="link-underline font-semibold text-buddy">
            {uiChanges.note.ios.label}
          </a>{" "}
          and{" "}
          <a href={uiChanges.note.android.href} className="link-underline font-semibold text-buddy">
            {uiChanges.note.android.label}
          </a>
          {uiChanges.note.after}
        </span>
      </p>
    </CaseSection>
  );
}
