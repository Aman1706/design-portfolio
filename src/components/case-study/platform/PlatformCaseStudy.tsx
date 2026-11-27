import type { Block, PlatformCaseStudy as Study } from "@/data/case-studies/types";
import CaseSection from "../CaseSection";
import SectionIntro from "../SectionIntro";
import ZoomableImage from "../ZoomableImage";
import Banner from "../Banner";
import PlanPanel from "./PlanPanel";
import ScreenRows from "./ScreenRows";
import { PLATFORM_THEME, type PlatformTheme } from "./theme";

const CARD_COLS = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3" } as const;

function BlockView({ block, dark, theme }: { block: Block; dark: boolean; theme: PlatformTheme }) {
  switch (block.kind) {
    case "split":
      return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div className="flex flex-col gap-4" data-animate="reveal">
            <h3 className="text-[28px] leading-[normal] font-medium lg:text-[32px]">{block.title}</h3>
            <p className="max-w-[560px] text-[16px] leading-[1.5] text-ink-soft">{block.body}</p>
          </div>
          <div data-animate="reveal">
            <ZoomableImage image={block.image} sizes="(min-width: 1024px) 772px, 100vw" />
          </div>
        </div>
      );

    case "images":
      return (
        <div className="flex flex-col gap-8 lg:gap-14">
          {block.images.map((image) => (
            <div key={image.src} data-animate="reveal">
              <ZoomableImage image={image} sizes="(min-width: 1536px) 1280px, (min-width: 1024px) 1120px, 100vw" />
            </div>
          ))}
        </div>
      );

    case "cards":
      return (
        <div className="flex flex-col gap-6">
          {block.title && (
            <h3 className="pt-6 text-[28px] leading-[normal] font-semibold lg:text-[32px]" data-animate="reveal">
              {block.title}
            </h3>
          )}
          <ul className={`grid grid-cols-1 gap-4 lg:gap-5 ${CARD_COLS[block.columns]}`}>
            {block.cards.map((card) => (
              <li key={card.src} data-animate="reveal">
                <ZoomableImage
                  image={card}
                  sizes={
                    block.columns === 2
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      );

    case "screens":
      return <ScreenRows rows={block.rows} dark={dark} theme={theme} />;

    case "plan":
      return <PlanPanel plan={block} theme={theme} />;

    case "divider":
      return <hr className={dark ? "border-divider-alt" : "border-divider"} />;
  }
}

/** Banner + sections for a UI case study (iOS / Android), rendered from its data file. */
export default function PlatformCaseStudy({ study }: { study: Study }) {
  const theme = PLATFORM_THEME[study.platform];

  return (
    <>
      <Banner banner={study.banner} />
      {study.sections.map((section) => {
        const dark = section.tone === "dark";
        return (
          <CaseSection key={section.label} tone={section.tone} label={section.title}>
            <SectionIntro
              tone={section.tone}
              titleFont={section.titleFont}
              label={section.label}
              title={section.title}
              intro={section.intro}
            />
            {section.blocks.map((block, i) => (
              <BlockView key={i} block={block} dark={dark} theme={theme} />
            ))}
          </CaseSection>
        );
      })}
    </>
  );
}
