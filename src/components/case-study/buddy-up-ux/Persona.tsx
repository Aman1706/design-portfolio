import Image from "next/image";
import { empathy, persona } from "@/data/case-studies/buddy-up-ux";
import BulletList from "../BulletList";
import CaseSection from "../CaseSection";
import SectionIntro, { SectionText, SectionTitle } from "../SectionIntro";

/** 07 — the persona (Abhinav) and his empathy map. */
export default function Persona() {
  return (
    <CaseSection tone="dark" label="Persona and empathy map">
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Persona ── */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionIntro tone="dark" label={persona.label} title={persona.title} intro={persona.intro} />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <figure className="flex flex-col items-center gap-[30px] lg:flex-1" data-animate="reveal">
              <Image
                src={persona.image.src}
                alt={persona.image.alt}
                width={persona.image.width}
                height={persona.image.height}
                sizes="(min-width: 1024px) 406px, 90vw"
                className="aspect-[406/424] w-full max-w-[406px] rounded-[20px] object-cover"
              />
              <blockquote className="max-w-[520px] text-center text-[16px] leading-[1.5] text-on-dark-soft lg:text-[18px]">
                {persona.quote}
              </blockquote>
            </figure>

            <div className="flex flex-col gap-5 lg:flex-1" data-animate="reveal">
              <h3 className="text-[36px] leading-[normal] font-semibold lg:text-[44px]">{persona.name}</h3>
              <ul className="flex flex-wrap gap-2.5" aria-label="Demographics">
                {persona.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[20px] border border-surface/50 px-3.5 py-1.5 text-[14px] leading-[normal]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3.5">
                <h4 className="self-start rounded-[16px] bg-active px-4 py-1.5 text-[14px] leading-[normal] font-medium text-white">
                  Goals
                </h4>
                <BulletList items={persona.goals} />
              </div>
              <div className="flex flex-col gap-3.5">
                <h4 className="self-start rounded-[16px] bg-accent-alt px-4 py-1.5 text-[14px] leading-[normal] font-medium text-white">
                  Pain points
                </h4>
                <BulletList items={persona.painPoints} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {persona.cards.map((c) => (
              <div
                key={c.kicker}
                className="flex flex-col gap-2.5 rounded-[24px] bg-card-dark px-6 py-7 lg:px-8"
                data-animate="reveal"
              >
                <p className="text-[12px] leading-[normal] font-medium tracking-[0.08em] text-accent-alt uppercase">
                  {c.kicker}
                </p>
                <p className="text-[17px] leading-[1.45] lg:text-[18px]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Empathy map ── */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <SectionTitle>{empathy.title}</SectionTitle>
            <SectionText tone="dark">{empathy.intro}</SectionText>
          </div>

          <div className="relative" data-animate="reveal">
            {/* Cross dividers + Abhinav in the middle (desktop); a single column on smaller screens */}
            <div className="absolute inset-y-0 left-1/2 hidden w-px bg-surface/25 md:block" aria-hidden="true" />
            <div className="absolute inset-x-0 top-1/2 hidden h-px bg-surface/25 md:block" aria-hidden="true" />
            <Image
              src={persona.image.src}
              alt=""
              width={254}
              height={266}
              sizes="127px"
              className="absolute top-1/2 left-1/2 hidden h-[133px] w-[127px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover md:block"
            />

            <div className="grid grid-cols-1 md:grid-cols-2">
              {empathy.quadrants.map((quad, i) => (
                <div
                  key={quad.title}
                  className={`flex flex-col gap-3.5 border-surface/25 py-8 max-md:border-t md:px-6 md:py-6 lg:py-8 ${
                    i % 2 === 0 ? "md:pr-[90px]" : "md:pl-[90px]"
                  } ${i < 2 ? "md:pb-[90px]" : "md:pt-[90px]"}`}
                >
                  <h3 className="text-[24px] leading-[normal] font-semibold lg:text-[26px]">{quad.title}</h3>
                  <ul className="flex flex-col gap-3.5">
                    {quad.items.map((item) => (
                      <li key={item} className="text-[16px] leading-[1.45] text-on-dark-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
