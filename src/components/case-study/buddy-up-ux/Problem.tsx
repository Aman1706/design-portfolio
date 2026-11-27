import Image from "next/image";
import { problem } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import { SectionLabel } from "../SectionIntro";

export default function Problem() {
  return (
    <CaseSection tone="light" label="Problem statement">
      <div className="flex flex-col gap-5">
        <SectionLabel>{problem.label}</SectionLabel>
        <h2
          className="flex flex-col text-[36px] leading-[1.12] font-bold md:text-[48px] lg:text-[64px] 2xl:text-[72px]"
          data-animate="heading"
        >
          {problem.title.map((line) => (
            <span key={line} className="-mb-[0.15em] block overflow-hidden pb-[0.15em]">
              <span className="block" data-animate="mask-inner">
                {line}
              </span>
            </span>
          ))}
        </h2>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Photo with the overlay card */}
        <figure
          className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] p-4 md:min-h-[480px] md:p-8 lg:w-[53.6%] lg:shrink-0 lg:rounded-[32px]"
          data-animate="reveal"
        >
          <Image
            src={problem.image.src}
            alt={problem.image.alt}
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-buddy/10 to-buddy/15" aria-hidden="true" />
          <figcaption className="relative flex flex-col gap-2 rounded-[20px] bg-buddy-tint px-5 py-5 lg:rounded-[24px] lg:px-7 lg:py-6">
            <span className="text-[28px] leading-[normal] font-semibold lg:text-[36px]">
              {problem.overlay.title} <span className="text-buddy">{problem.overlay.accent}</span>
            </span>
            <span className="text-[16px] leading-[normal] text-ink-soft lg:text-[17px]">{problem.overlay.body}</span>
          </figcaption>
        </figure>

        {/* The three questions */}
        <ol className="flex flex-col gap-4 lg:flex-1">
          {problem.questions.map((q, i) => (
            <li
              key={q.title}
              className="flex flex-1 items-center gap-5 rounded-[24px] bg-white p-6"
              data-animate="reveal"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-[16px] bg-buddy-soft text-[18px] font-semibold text-buddy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1 leading-[normal]">
                <span className="text-[13px] text-ink-soft-alt">{q.kicker}</span>
                <span className="text-[20px] font-semibold lg:text-[22px]">{q.title}</span>
                <span className="text-[16px] text-ink-soft">{q.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="flex flex-col gap-3 rounded-[24px] bg-ink px-6 py-7 lg:px-10 lg:py-8"
        data-cursor-tone="light"
        data-animate="reveal"
      >
        <p className="text-[13px] leading-[normal] font-medium tracking-[0.08em] text-accent-alt">HOW MIGHT WE</p>
        <p className="text-[20px] leading-[1.35] text-surface md:text-[24px] lg:text-[28px]">{problem.hmw}</p>
      </div>
    </CaseSection>
  );
}
