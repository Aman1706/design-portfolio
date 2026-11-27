"use client";

import { fadeInNav, revealMaskedHeadings, sel } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Motion for the case-study pages: the hero load, masked section titles and a
 * run-once fade-up for every `data-animate="reveal"` block. Hidden states live in globals.css;
 * nothing runs under reduced motion.
 */
export default function CaseStudyAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Nav fades in on load (the header image fades up with the other reveals) ──
      fadeInNav();

      // ── Section titles: slide up from behind their mask ──
      revealMaskedHeadings();

      // ── Everything else: fade up as it enters, staggered when several enter together ──
      // Hide every block up front, not when it enters: otherwise the CSS 4s fallback has already
      // shown blocks further down, and they'd flash hidden → visible when scrolled to.
      const reveals = gsap.utils.toArray<HTMLElement>(sel("reveal"));
      gsap.set(reveals, { y: 24, autoAlpha: 0 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, overwrite: true }),
      });

      // Fonts swapping in can shift layout; recalc trigger positions once they're ready.
      // (ScrollTrigger already refreshes on window load, and images reserve their size via
      // width/height, so no load listener is needed — it would never fire after client navigation.)
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  });

  return null;
}
