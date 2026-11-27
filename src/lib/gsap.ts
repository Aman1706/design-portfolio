"use client";

/**
 * Single entry point for GSAP. Import gsap, plugins and useGSAP from here (not from "gsap"
 * directly) so plugins are always registered exactly once.
 *
 *   import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
 *
 * Only use inside client components. Wrap animations in useGSAP() — it scopes selectors to a
 * container ref and reverts everything on unmount.
 *
 * Add more plugins here when needed (e.g. SplitText, ScrollSmoother — all GSAP plugins are free).
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export { gsap, ScrollTrigger, useGSAP };
