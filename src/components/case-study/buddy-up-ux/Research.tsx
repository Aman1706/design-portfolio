import { qualitative, quantitative } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import SectionIntro, { SectionTitle, SectionText } from "../SectionIntro";
import StatRing from "../StatRing";
import ZoomableImage from "../ZoomableImage";
import { darkCard } from "../styles";
import { DIAGRAM_SIZES } from "./DiagramSection";

const BAR_FILL = { "accent-alt": "bg-accent-alt", buddy: "bg-buddy", lavender: "bg-lavender" } as const;

/** 06 — survey results (rings, bar charts, findings, wish list) and the interview findings. */
export default function Research() {
  const q = quantitative;

  return (
    <CaseSection tone="dark" label="Quantitative and qualitative research">
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Quantitative ── */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionIntro tone="dark" label={q.label} title={q.title} intro={q.intro} />

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {q.rings.map((ring) => (
              <li
                key={ring.label}
                className={`${darkCard} flex flex-col items-center gap-5 px-6 py-8 text-center`}
                data-animate="reveal"
              >
                <StatRing value={ring.value} color={ring.color} />
                <p className="text-[15px] leading-[1.4] text-on-dark-soft">{ring.label}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            {q.charts.map((chart) => (
              <div
                key={chart.title}
                className={`${darkCard} flex flex-col gap-[18px] p-6 lg:p-8`}
                data-animate="reveal"
              >
                <h3 className="text-[18px] leading-[normal] font-semibold">{chart.title}</h3>
                <ul className="flex flex-col gap-[18px]">
                  {chart.rows.map((row) => (
                    <li key={row.label} className="flex flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-4 leading-[normal]">
                        <span className="text-[14px] text-on-dark-soft">{row.label}</span>
                        <span className="shrink-0 text-[13px] text-ink-soft-alt">
                          {row.count} of {q.total}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-pill-border" aria-hidden="true">
                        <div
                          className={`h-full rounded-full ${BAR_FILL[chart.color]}`}
                          style={{ width: `${(row.count / q.total) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {q.findings.map((f) => (
              <li key={f.value} className={`${darkCard} flex flex-col gap-2 p-7`} data-animate="reveal">
                <p className="font-display text-[32px] leading-[normal] font-bold lg:text-[36px]">{f.value}</p>
                <p className="text-[15px] leading-[1.4] text-ink-soft-alt">{f.label}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5" data-animate="reveal">
            <h3 className="text-[20px] leading-[1.3] font-medium lg:text-[24px]">{q.wishTitle}</h3>
            <ul className="flex flex-wrap gap-3">
              {q.wishes.map((wish, i) => (
                <li
                  key={wish}
                  className={`rounded-[24px] px-5 py-3 text-[15px] leading-[normal] text-ink ${
                    i % 2 === 0 ? "bg-lavender" : "bg-white"
                  }`}
                >
                  {wish}
                </li>
              ))}
            </ul>
            <p className="text-[13px] leading-[1.45] text-ink-soft-alt">{q.note}</p>
          </div>
        </div>

        {/* ── Qualitative ── */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <SectionTitle>{qualitative.title}</SectionTitle>
            <SectionText tone="dark">{qualitative.intro}</SectionText>
          </div>

          <div data-animate="reveal">
            <ZoomableImage image={qualitative.image} sizes={DIAGRAM_SIZES} />
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {qualitative.insights.map((insight) => (
              <li key={insight.title} className={`${darkCard} flex flex-col gap-3 p-6 lg:p-8`} data-animate="reveal">
                <p className="text-[12px] leading-[normal] font-medium tracking-[0.08em] text-accent-alt uppercase">
                  {insight.kicker}
                </p>
                <h3 className="text-[22px] leading-[normal] font-semibold lg:text-[24px]">{insight.title}</h3>
                <p className="text-[16px] leading-[1.45] text-ink-soft-alt">{insight.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CaseSection>
  );
}
