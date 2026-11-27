import { wireframes } from "@/data/case-studies/buddy-up-ux";
import CaseSection from "../CaseSection";
import SectionIntro from "../SectionIntro";
import ZoomableImage from "../ZoomableImage";

/** 12 — nine wireframe screens, each exported separately so the grid can reflow. */
export default function Wireframes() {
  return (
    <CaseSection tone="white" label="Wireframes">
      <SectionIntro label={wireframes.label} title={wireframes.title} intro={wireframes.intro} />

      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-10 lg:gap-x-[40px] lg:gap-y-14 lg:px-[22px]">
        {wireframes.screens.map((screen) => (
          <li key={screen.caption} data-animate="reveal">
            <figure className="flex flex-col items-center gap-4">
              <ZoomableImage
                image={screen.image}
                fit
                sizes="(min-width: 1024px) 322px, (min-width: 768px) 30vw, 45vw"
                className="mx-auto max-w-[322px]"
              />
              <figcaption className="text-center text-[14px] leading-[normal] font-medium lg:text-[16px]">
                {screen.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}
