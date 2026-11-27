import Image from "next/image";
import type { CaseBanner } from "@/data/case-studies/types";

/**
 * A case-study header, exported from Figma as one image (illustration/phones + wordmark).
 * Full-bleed at its natural aspect ratio — never cropped, never capped (it's a cover, so being
 * taller than the viewport on large monitors is fine).
 *
 * Its text is repeated as real text: the h1 for screen readers, and the eyebrow/tags below the
 * image on small screens, where the baked-in text gets too small to read.
 */
export default function Banner({ banner }: { banner: CaseBanner }) {
  return (
    <section aria-label="Introduction">
      <h1 className="sr-only">
        {banner.title} — {banner.eyebrow}
      </h1>
      <div data-animate="reveal">
        <Image
          src={banner.image.src}
          alt={banner.image.alt}
          width={banner.image.width}
          height={banner.image.height}
          preload
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 px-4 pt-6 pb-2 md:px-10 lg:hidden" aria-hidden="true">
        <p className="text-[18px] leading-[1.1] font-medium">{banner.eyebrow}</p>
        <p className="text-[14px] leading-[normal] text-ink-soft">{banner.tags}</p>
      </div>
    </section>
  );
}
