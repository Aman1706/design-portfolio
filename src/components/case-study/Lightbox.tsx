"use client";

import { useEffect, useRef, useState } from "react";

type Zoomed = { src: string; alt: string; width: number; height: number; fit: boolean };

/**
 * The one lightbox for a case-study page (mounted by `CaseStudyShell`). `ZoomableImage` buttons
 * carry their image in `data-zoom-*` attributes; a single delegated click listener opens this
 * dialog with that image, so the images themselves stay server components and the page has one
 * <dialog> instead of one per image.
 *
 * It's a native modal <dialog> (focus trap, Esc to close, page made inert, focus returns to the
 * button on close). It scrolls itself, so the page's `overflow` is never touched (see CLAUDE.md).
 * Images are exported at 2x, so `width / 2` is the design size: the lightbox shows at least that
 * (wider than a phone, so it pans), up to 2x. `fit` shows tall, narrow images whole instead.
 */
export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [image, setImage] = useState<Zoomed | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.<HTMLElement>("[data-zoom-src]");
      const el = dialog.current;
      if (!trigger || !el) return;
      const { zoomSrc, zoomAlt, zoomWidth, zoomHeight, zoomFit } = trigger.dataset;
      setImage({
        src: zoomSrc!,
        alt: zoomAlt ?? "",
        width: Number(zoomWidth),
        height: Number(zoomHeight),
        fit: zoomFit !== undefined,
      });
      el.showModal();
      closeButton.current?.focus();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label={image?.alt}
      data-cursor-tone="light"
      onClose={() => setImage(null)}
      // Click on the dark backdrop area (not the image) closes it
      onClick={(e) => e.target === e.currentTarget.firstElementChild && dialog.current?.close()}
      className="zoom-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-surface backdrop:bg-transparent"
    >
      {/* Keyed by image so each one opens scrolled to its top-left */}
      <div
        key={image?.src}
        className={`h-full w-full overflow-auto overscroll-contain p-4 md:p-10 ${
          image?.fit ? "flex items-center justify-center" : ""
        }`}
      >
        {image && (
          // Plain <img>: only rendered once opened, at full export resolution
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt=""
            decoding="async"
            width={image.width}
            height={image.height}
            className={image.fit ? "h-full max-h-full w-auto max-w-full object-contain" : "mx-auto h-auto max-w-none"}
            style={image.fit ? undefined : { width: `clamp(${image.width / 2}px, 100%, ${image.width}px)` }}
          />
        )}
      </div>
      <button
        ref={closeButton}
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label="Close"
        // Kept clear of the image so it never covers content
        className="fixed top-3 right-3 flex size-11 items-center justify-center rounded-full bg-ink text-surface shadow-lg ring-1 ring-divider-alt transition-colors hover:bg-accent-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface md:top-6 md:right-6"
      >
        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </dialog>
  );
}
