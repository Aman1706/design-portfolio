"use client";

/**
 * Animation pieces shared by PageAnimations (home) and CaseStudyAnimations (case studies).
 * Call them inside a `gsap.matchMedia()` callback so they're reverted and skipped under
 * reduced motion.
 */
import { gsap } from "@/lib/gsap";

/** Selector for a `data-animate` hook. */
export const sel = (name: string) => `[data-animate="${name}"]`;

/** Where run-once scroll reveals start. */
export const REVEAL_START = "top 85%";

/** Navbar contents drop in on load. Returns the tween so it can lead a timeline. */
export function fadeInNav() {
  return gsap.fromTo(
    sel("nav"),
    { y: -10, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" },
  );
}

/** Every `data-animate="heading"` slides up from behind its mask(s) as it scrolls in. */
export function revealMaskedHeadings() {
  gsap.utils.toArray<HTMLElement>(sel("heading")).forEach((heading) => {
    gsap.fromTo(
      heading.querySelectorAll(sel("mask-inner")),
      { yPercent: 110, autoAlpha: 1 },
      {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: heading, start: REVEAL_START, once: true },
      },
    );
  });
}
