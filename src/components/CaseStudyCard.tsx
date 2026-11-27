import Image from "next/image";
import type { CaseStudy } from "@/data/content";

type Props = {
  study: CaseStudy;
  /** "featured" puts image and text side by side on desktop; "stacked" keeps the image on top. */
  layout?: "featured" | "stacked";
};

export default function CaseStudyCard({ study, layout = "stacked" }: Props) {
  const featured = layout === "featured";

  return (
    <article
      className={`flex flex-col gap-5 lg:gap-[30px] ${featured ? "lg:flex-row lg:items-center" : ""}`}
      data-animate="case-study"
    >
      {/* Image also links to the case study; hidden from AT/tab order to avoid a duplicate link */}
      <a
        href={study.href}
        tabIndex={-1}
        aria-hidden="true"
        className={`group/image relative block aspect-[547/433] w-full overflow-hidden bg-divider ${
          featured ? "lg:w-[48.84%] lg:shrink-0" : ""
        }`}
      >
        {/* Taller than the frame so the scroll parallax never shows an edge */}
        <div className="absolute inset-x-0 -top-[5%] h-[110%]" data-animate="parallax">
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes={featured ? "(min-width: 1920px) 742px, (min-width: 1024px) 625px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      </a>

      <div className={`flex flex-col gap-5 lg:gap-[30px] ${featured ? "lg:flex-1" : ""}`}>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] leading-[normal] text-accent">{study.eyebrow}</p>
          <h3 className="font-display text-[32px] leading-[normal] font-bold 2xl:text-[36px] 3xl:text-[40px]">
            {study.title}
          </h3>
          <p className="max-w-[506px] text-[18px] leading-6 text-ink-soft 2xl:max-w-[560px] 3xl:max-w-[600px] 3xl:text-[20px] 3xl:leading-7">
            {study.description}
          </p>
        </div>
        <a
          href={study.href}
          className="group self-start text-[20px] leading-[normal] font-semibold transition-colors hover:text-accent lg:text-[16px]"
          aria-label={`View case study: ${study.title}`}
        >
          View case study{" "}
          <span className="inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}
