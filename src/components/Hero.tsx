import Image from "next/image";
import { hero, site } from "@/data/content";
import Container from "./Container";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" data-animate="hero">
      <Container className="flex flex-col gap-10 pb-10 lg:gap-20 lg:pb-20 2xl:gap-24 3xl:gap-28">
        {/* Headline: avatar sits above on mobile, to the right on desktop */}
        <div className="flex flex-col-reverse items-start gap-[30px] lg:flex-row lg:justify-between">
          <h1
            // flex-col: stops the mask spans' negative margins from collapsing (keeps 2 × line-height)
            className="flex flex-col font-display text-[clamp(64px,24.6vw,96px)] leading-[0.958] font-bold tracking-[-0.02em] lg:text-[clamp(96px,13.28vw,170px)] lg:leading-[0.9] lg:tracking-[-0.32px] 2xl:text-[200px] 3xl:text-[230px]"
            data-animate="hero-title"
          >
            {/* Each line sits in a clipping mask; padding keeps tall glyphs/descenders unclipped */}
            <span className="-mt-[0.15em] -mb-[0.3em] block overflow-hidden pt-[0.15em] pb-[0.3em]">
              <span className="block text-accent" data-animate="mask-inner">
                Product
              </span>
            </span>
            <span className="-mt-[0.15em] -mb-[0.3em] block overflow-hidden pt-[0.15em] pb-[0.3em]">
              <span className="block" data-animate="mask-inner">
                Designer
              </span>
            </span>
          </h1>
          <Image
            src="/images/avatar.webp"
            alt={`Portrait of ${site.name}`}
            width={306}
            height={306}
            preload
            sizes="(min-width: 1920px) 306px, (min-width: 1536px) 266px, (min-width: 1024px) 226px, 186px"
            className="size-[186px] shrink-0 object-cover lg:size-[clamp(186px,17.66vw,226px)] 2xl:size-[266px] 3xl:size-[306px]"
            data-animate="hero-avatar"
          />
        </div>

        {/* Description: tagline first on mobile, location left / tagline right on desktop */}
        <div className="flex flex-col gap-5 lg:flex-row-reverse lg:items-start lg:justify-between lg:gap-10">
          <p
            className="max-w-[560px] text-[20px] leading-[normal] lg:max-w-[675px] lg:text-[36px] 2xl:max-w-[770px] 2xl:text-[40px] 3xl:max-w-[860px] 3xl:text-[44px]"
            data-animate="hero-text"
          >
            {hero.tagline.before}
            {/* Forced line break, only switched on by the swap when "design" would wrap but "build" wouldn't */}
            <span className="hidden" data-animate="tagline-break" />
            {/* Both words share one grid cell. The old word is hidden (and aria-hidden) unless
                PageAnimations plays the swap, which sizes the cell to whichever word is showing. */}
            <span className="inline-grid" data-animate="tagline-word">
              <span className="col-start-1 row-start-1 justify-self-start text-accent" data-animate="tagline-new">
                {hero.tagline.highlight}
              </span>
              <span
                aria-hidden="true"
                // justify-self-start: hug the word so the strike (and the measured width) fit it
                className="invisible relative col-start-1 row-start-1 justify-self-start"
                data-animate="tagline-old"
              >
                {hero.tagline.replaces}
                <span
                  className="absolute inset-x-0 top-[55%] h-[0.07em] origin-left scale-x-0 bg-accent"
                  data-animate="tagline-strike"
                />
              </span>
            </span>
            {hero.tagline.after}
          </p>
          <p
            className="text-[14px] leading-[normal] whitespace-nowrap lg:text-[24px] 3xl:text-[26px]"
            data-animate="hero-text"
          >
            {site.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
