import { usability } from "@/data/case-studies/buddy-up-ux";
import BulletList from "../BulletList";
import CaseSection from "../CaseSection";
import SectionIntro from "../SectionIntro";
import { darkCard, smallCaps } from "../styles";

function Bullets({ items, dot }: { items: string[]; dot: string }) {
  return <BulletList items={items} dot={dot} className="gap-2.5 text-[15px]" textClassName="leading-[1.45]" />;
}

/** 14 — tasks, per-participant feedback, and what we learned. */
export default function Usability() {
  const { conclusion } = usability;

  return (
    <CaseSection tone="dark" label="Usability testing">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="lg:flex-1">
          <SectionIntro tone="dark" label={usability.label} title={usability.title} intro={usability.intro} />
          <a
            href={usability.prototype.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-block text-[18px] transition-colors hover:text-accent-alt"
            data-animate="reveal"
          >
            {usability.prototype.label} <span className="text-accent-alt">↗</span>
          </a>
        </div>
        <dl className="flex gap-8 leading-[normal] lg:gap-10" data-animate="reveal">
          {usability.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-[14px] text-ink-soft-alt">{stat.label}</dt>
              <dd
                className={`font-display text-[48px] font-bold lg:text-[64px] ${stat.highlight ? "text-active" : ""}`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-5" data-animate="reveal">
        <h3 className={`${smallCaps} text-[13px] text-ink-soft-alt`}>{usability.tasksLabel}</h3>
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {usability.tasks.map((task, i) => (
            <li
              key={task}
              className="flex items-center gap-2.5 rounded-[16px] border border-surface/8 bg-card-dark px-5 py-4 leading-[normal]"
            >
              <span className="text-[14px] font-semibold text-buddy">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[16px] font-medium">{task}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className={`${smallCaps} text-[13px] text-ink-soft-alt`} data-animate="reveal">
          {usability.participantsLabel}
        </h3>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {usability.participants.map((p) => (
            <li key={p.name} className={`${darkCard} flex flex-col gap-6 p-6 lg:p-7`} data-animate="reveal">
              <div className="flex items-center gap-3.5">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-buddy font-display text-[20px] font-bold"
                  aria-hidden="true"
                >
                  {p.initial}
                </span>
                <div className="flex flex-col gap-0.5 leading-[normal]">
                  <h4 className="text-[20px] font-semibold">{p.name}</h4>
                  <p className="text-[14px] text-ink-soft-alt">{p.role}</p>
                </div>
              </div>
              <p className="flex items-center gap-2 self-start rounded-[16px] bg-active/15 px-3.5 py-2 text-[13px] leading-[normal] font-medium text-active">
                <span className="size-2 rounded-full bg-active" aria-hidden="true" />
                {p.completed}
              </p>
              <div className="flex flex-col gap-2.5">
                <h5 className={`${smallCaps} text-[12px] text-active`}>What went well</h5>
                <Bullets items={p.well} dot="text-active" />
              </div>
              <div className="flex flex-col gap-2.5">
                <h5 className={`${smallCaps} text-[12px] text-accent-alt`}>Suggestions</h5>
                {p.suggestions.length > 0 ? (
                  <Bullets items={p.suggestions} dot="text-accent-alt" />
                ) : (
                  <p className="text-[15px] leading-[1.45] text-ink-soft-alt">{p.noSuggestions}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex flex-col gap-8 rounded-[24px] border border-dashed border-surface/20 p-5 md:p-8 lg:rounded-[32px] lg:p-12"
        data-animate="reveal"
      >
        <div className="flex flex-col gap-4 lg:gap-8">
          <p className={`${smallCaps} text-[13px] text-ink-soft-alt`}>{conclusion.label}</p>
          <h3 className="text-[32px] leading-[normal] font-medium lg:text-[40px]">{conclusion.title}</h3>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {conclusion.patterns.map((pattern) => (
            <li key={pattern.title} className="flex flex-col gap-2.5 rounded-[20px] bg-card-dark p-6">
              <h4 className="text-[18px] leading-[normal] font-semibold">{pattern.title}</h4>
              <p className="text-[15px] leading-[1.45] text-ink-soft-alt">{pattern.body}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3.5 rounded-[20px] bg-buddy/12 p-6 leading-[normal] lg:p-7">
          <h4 className="text-[18px] font-semibold">{conclusion.nextTitle}</h4>
          <ol className="flex flex-col gap-3.5">
            {conclusion.next.map((step, i) => (
              <li key={step} className="flex items-baseline gap-3">
                <span className="text-[14px] font-semibold text-buddy">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </CaseSection>
  );
}
