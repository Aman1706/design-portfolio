"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Motion for the case-study pages: the hero load, masked section titles and a
 * run-once fade-up for every `data-animate="reveal"` block. Hidden states live in globals.css;
 * nothing runs under reduced motion.
 */
const sel = (name: string) => `[data-animate="${name}"]`;

export default function CaseStudyAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Nav fades in on load (the header image fades up with the other reveals) ──
      gsap.fromTo(sel("nav"), { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" });

      // ── Section titles: slide up from behind their mask ──
      gsap.utils.toArray<HTMLElement>(sel("heading")).forEach((heading) => {
        gsap.fromTo(
          heading.querySelectorAll(sel("mask-inner")),
          { yPercent: 110, autoAlpha: 1 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          },
        );
      });

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

      // Fonts and lazy images can shift layout; recalc trigger positions once they're in
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    });

    return () => mm.revert();
  });

  return null;
}
