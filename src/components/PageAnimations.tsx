"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { initAnchorScroll } from "@/lib/smooth-scroll";

/**
 * All page-level motion: gliding in-page links, the hero load + scroll-out, and run-once scroll reveals.
 * Targets the `data-animate` attributes in the (server-rendered) section components.
 * Initial hidden states live in globals.css; everything here is skipped for reduced motion.
 */
const sel = (name: string) => `[data-animate="${name}"]`;
const REVEAL_START = "top 85%";

export default function PageAnimations() {
  useGSAP(() => {
    // Not motion-gated: it falls back to an instant jump under reduced motion
    const stopAnchorScroll = initAnchorScroll();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── Hero: load sequence ───────────────────────────────────────────
      gsap
        .timeline()
        .fromTo(sel("nav"), { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" })
        .fromTo(
          `${sel("hero-title")} ${sel("mask-inner")}`,
          // Start well below: the hero masks have extra bottom padding for descenders
          { yPercent: 140, autoAlpha: 1 },
          { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          "-=0.3",
        )
        .fromTo(sel("hero-avatar"), { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9 }, "-=0.7")
        .fromTo(sel("hero-text"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 }, "-=0.5");

      // ── Hero: drifts up and fades out as you scroll past ──────────────
      const hero = document.querySelector(sel("hero"));
      const heroInner = hero?.firstElementChild;
      if (hero && heroInner) {
        gsap.to(heroInner, {
          yPercent: -10,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top 15%", end: "bottom top", scrub: true },
        });
      }

      // ── Section headings: slide up from behind a mask ─────────────────
      gsap.utils.toArray<HTMLElement>(sel("heading")).forEach((heading) => {
        gsap.fromTo(
          heading.querySelector(sel("mask-inner")),
          { yPercent: 110, autoAlpha: 1 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: REVEAL_START, once: true },
          },
        );
      });

      // ── Skill + certificate rows: fade up, dividers draw left → right ─
      gsap.utils.toArray<HTMLElement>(sel("list")).forEach((list) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: list, start: REVEAL_START, once: true } });
        tl.fromTo(
          list.querySelectorAll(`${sel("skill")}, ${sel("certificate")}`),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.08 },
        ).fromTo(
          list.querySelectorAll(sel("divider")),
          { scaleX: 0, autoAlpha: 1 },
          { scaleX: 1, duration: 1, stagger: 0.08, ease: "power2.inOut" },
          0.1,
        );
      });

      // ── Tool logos: soft pop-in ───────────────────────────────────────
      const tools = document.querySelector(sel("tools"));
      if (tools) {
        gsap.fromTo(
          tools.querySelectorAll(sel("tool")),
          { scale: 0.9, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.06,
            scrollTrigger: { trigger: tools, start: REVEAL_START, once: true },
          },
        );
      }

      // ── Case studies: cards fade up, images drift gently (parallax) ───
      gsap.utils.toArray<HTMLElement>(sel("case-study")).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, scrollTrigger: { trigger: card, start: REVEAL_START, once: true } },
        );

        const layer = card.querySelector(sel("parallax"));
        if (layer) {
          gsap.fromTo(
            layer,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });

      // Fonts swapping in can shift layout; recalc trigger positions once they're ready
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => {
      mm.revert();
      stopAnchorScroll();
    };
  });

  return null;
}
