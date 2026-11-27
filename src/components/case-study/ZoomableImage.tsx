"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CaseImage } from "@/data/case-studies/types";

/**
 * An exported Figma diagram that fits its column and opens full-size in a lightbox on click/tap.
 *
 * The lightbox is a native modal <dialog> (focus trap, Esc to close, page made inert). It scrolls
 * itself, so the page's `overflow` is never touched (see CLAUDE.md). Images are exported at 2x, so
 * `width / 2` is the design size: the lightbox shows at least that (wider than a phone, so it pans),
 * up to 2x.
 * `fit` is for tall, narrow images (wireframes): shown whole, scaled to the viewport height.
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
  const dialog = useRef<HTMLDialogElement>(null);
  const designWidth = image.width / 2;

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge image: ${image.alt}`}
        aria-haspopup="dialog"
        data-cursor="view"
        className={`group block w-full cursor-zoom-in rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-buddy ${className}`}
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

      <dialog
        ref={dialog}
        aria-label={image.alt}
        data-cursor-tone="light"
        // Click on the dark backdrop area (not the image) closes it
        onClick={(e) => e.target === e.currentTarget.firstElementChild && dialog.current?.close()}
        className="zoom-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-surface backdrop:bg-transparent"
      >
        <div
          className={`h-full w-full overflow-auto overscroll-contain p-4 md:p-10 ${
            fit ? "flex items-center justify-center" : ""
          }`}
        >
          {/* Plain <img>: the dialog only loads it when opened, at full export resolution */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt=""
            loading="lazy"
            decoding="async"
            width={image.width}
            height={image.height}
            className={fit ? "h-full max-h-full w-auto max-w-full object-contain" : "mx-auto h-auto max-w-none"}
            style={fit ? undefined : { width: `clamp(${designWidth}px, 100%, ${image.width}px)` }}
          />
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          // Kept clear of the image so it never covers content; autoFocus puts focus here on open
          autoFocus
          className="fixed top-3 right-3 flex size-11 items-center justify-center rounded-full bg-ink text-surface shadow-lg ring-1 ring-divider-alt transition-colors hover:bg-accent-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface md:top-6 md:right-6"
        >
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
