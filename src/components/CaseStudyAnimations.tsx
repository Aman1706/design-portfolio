"use client";

import { fadeInNav, onNextFrame, playOnceInView, revealMaskedHeadings, sel } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Motion for the case-study pages: the nav load, a reading-progress line, masked section
 * titles, a run-once fade-up for every `data-animate="reveal"` block, and stats that draw/count up.
 * Hidden states live in globals.css; nothing runs under reduced motion.
 */
export default function CaseStudyAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      // ── Nav fades in on load (the header image fades up with the other reveals) ──
      fadeInNav();

      // Everything below is scroll-triggered: set up once the route's scroll position has settled.
      // Until then the CSS pre-animation state keeps these targets hidden.
      return onNextFrame(context, () => {
        // ── Reading progress along the navbar's bottom border ──
        gsap.fromTo(
          sel("progress"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
        );

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

        // ── Stats: rings draw and count up, bars grow, once each scrolls in ──
        gsap.utils.toArray<HTMLElement>(sel("stat-ring")).forEach((ring) => {
          const arc = ring.querySelector<SVGCircleElement>(sel("stat-arc"));
          const num = ring.querySelector(sel("stat-value"));
          const value = Number(ring.dataset.value);
          if (!arc || !num) return;
          const c = 2 * Math.PI * arc.r.baseVal.value;
          const tl = gsap.timeline({ defaults: { duration: 1.4, ease: "power2.out" } });
          playOnceInView(ring, tl, "top 90%");
          tl.fromTo(
            arc,
            { attr: { "stroke-dasharray": `0 ${c}` } },
            { attr: { "stroke-dasharray": `${(value / 100) * c} ${c}` } },
            0.2,
          ).fromTo(num, { innerText: 0 }, { innerText: value, snap: { innerText: 1 } }, 0.2);
        });

        // Bars grow per chart card, so each chart's rows stagger together
        gsap.utils.toArray<HTMLElement>(sel("reveal")).forEach((block) => {
          const bars = block.querySelectorAll(sel("stat-bar"));
          if (!bars.length) return;
          gsap.fromTo(
            bars,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.2,
              scrollTrigger: { trigger: block, start: "top 90%", once: true },
            },
          );
        });

        // Fonts swapping in can shift layout; recalc trigger positions once they're ready.
        // (ScrollTrigger already refreshes on window load, and images reserve their size via
        // width/height, so no load listener is needed — it would never fire after client navigation.)
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
    });

    return () => mm.revert();
  });

  return null;
}
