"use client";

/**
 * Animation pieces shared by PageAnimations (home) and CaseStudyAnimations (case studies).
 * Call them inside a `gsap.matchMedia()` callback so they're reverted and skipped under
 * reduced motion.
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Selector for a `data-animate` hook. */
export const sel = (name: string) => `[data-animate="${name}"]`;

/** Where run-once scroll reveals start. */
export const REVEAL_START = "top 85%";

/**
 * Plays a paused timeline the first time `trigger` scrolls into view. Use this instead of
 * `gsap.timeline({ scrollTrigger })`: a timeline's trigger finishes setting up a tick later, and when
 * several are created while the window is still scrolled from the previous route (a client
 * navigation), ScrollTrigger refreshes them, one fires and removes itself mid-loop, and it throws.
 */
export function playOnceInView(trigger: Element, timeline: gsap.core.Timeline, start = REVEAL_START) {
  timeline.pause();
  ScrollTrigger.create({ trigger, start, once: true, onEnter: () => void timeline.play() });
}

/**
 * Runs `setup` on the next frame, inside the matchMedia `context` (so it's still reverted with it).
 * Put scroll-triggered setup in here. After a client navigation the new page mounts while the window
 * is still at the previous page's scroll position (Next resets it right after), so triggers created
 * straight away measure against the old scroll and fire early. Returns the cleanup for `mm.add`.
 */
export function onNextFrame(context: gsap.Context, setup: () => void) {
  const id = requestAnimationFrame(() => context.add(setup));
  return () => cancelAnimationFrame(id);
}

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
