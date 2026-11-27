"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Lenis smooth (wheel) scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Native scrolling is kept underneath, so position: sticky and anchors still work.
 * Touch devices keep native scrolling (Lenis default).
 */
let lenis: Lenis | null = null;

/** The active Lenis instance, or null (reduced motion / not yet mounted). */
export const getLenis = () => lenis;

/** Starts smooth scrolling. Returns a cleanup function. */
export function initSmoothScroll() {
  // Anchor links: Lenis already honours `scroll-padding-top` (globals.css), which keeps
  // targets clear of the sticky navbar — so no extra offset here.
  const instance = new Lenis({ lerp: 0.1, anchors: true });
  lenis = instance;

  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
