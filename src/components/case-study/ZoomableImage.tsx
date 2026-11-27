import Image from "next/image";
import type { CaseImage } from "@/data/case-studies/types";

/**
 * An exported Figma diagram that fits its column and opens full-size in the page's `Lightbox`
 * (mounted by `CaseStudyShell`) on click/tap. The image travels in `data-zoom-*` attributes, so
 * this stays a server component.
 * `fit` is for tall, narrow images (wireframes, phones): shown whole, scaled to the viewport height.
 */
export default function ZoomableImage({
  image,
  sizes,
  fit = false,
  className = "",
  imageClassName = "",
}: {
  image: CaseImage;
  sizes: string;
  fit?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <button
      type="button"
      aria-label={`Enlarge image: ${image.alt}`}
      aria-haspopup="dialog"
      data-cursor="view"
      data-zoom-src={image.src}
      data-zoom-alt={image.alt}
      data-zoom-width={image.width}
      data-zoom-height={image.height}
      data-zoom-fit={fit ? "" : undefined}
      className={`group block w-full cursor-zoom-in rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--zoom-ring) ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={`h-auto w-full ${imageClassName}`}
      />
    </button>
  );
}
