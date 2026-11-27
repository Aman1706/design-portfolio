"use client";

import { fadeInNav, onNextFrame, playOnceInView, REVEAL_START, revealMaskedHeadings, sel } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { initAnchorScroll } from "@/lib/smooth-scroll";

/**
 * All page-level motion: gliding in-page links, the hero load + scroll-out, and run-once scroll reveals.
 * Targets the `data-animate` attributes in the (server-rendered) section components.
 * Initial hidden states live in globals.css; everything here is skipped for reduced motion.
 */
/** Rendered width of a `data-animate` element (0 if missing). */
const widthOf = (name: string) => document.querySelector(sel(name))?.getBoundingClientRect().width ?? 0;

/** Whether the tagline's word box drops to the next line when widened from "build" to "design". */
function wrapsWhenWider() {
  const word = document.querySelector<HTMLElement>(sel("tagline-word"));
  if (!word) return false;
  const prev = word.style.width;
  const top = word.getBoundingClientRect().top;
  word.style.width = `${widthOf("tagline-new")}px`;
  const wraps = word.getBoundingClientRect().top > top + 1;
  word.style.width = prev;
  return wraps;
}

export default function PageAnimations() {
  useGSAP(() => {
    // Not motion-gated: it falls back to an instant jump under reduced motion
    const stopAnchorScroll = initAnchorScroll();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      // ── Hero: load sequence ───────────────────────────────────────────
      gsap
        .timeline()
        .add(fadeInNav())
        .fromTo(
          `${sel("hero-title")} ${sel("mask-inner")}`,
          // Start well below: the hero masks have extra bottom padding for descenders
          { yPercent: 140, autoAlpha: 1 },
          { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          "-=0.3",
        )
        .fromTo(sel("hero-avatar"), { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9 }, "-=0.7")
        .fromTo(sel("hero-text"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 }, "-=0.5")
        // Tagline: "build" is struck through and swaps to "design" (engineer → designer).
        // The word box starts at "build"'s width and grows to "design"'s, so there's no gap before " for it."
        .set(sel("tagline-old"), { autoAlpha: 1 }, 0)
        .set(sel("tagline-new"), { autoAlpha: 0 }, 0)
        .set(sel("tagline-word"), { width: () => widthOf("tagline-old") }, 0)
        // If "design" wraps to the next line but "build" doesn't, break before "build" too, so the word
        // doesn't jump lines mid-swap (cleared at the end: by then the natural wrap matches)
        .set(sel("tagline-break"), { display: () => (wrapsWhenWider() ? "block" : "none") }, 0)
        .fromTo(sel("tagline-strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "-=0.25")
        .to(sel("tagline-old"), { yPercent: -50, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, "+=0.05")
        .to(
          sel("tagline-word"),
          { width: () => widthOf("tagline-new"), duration: 0.4, ease: "power2.inOut", clearProps: "width" },
          "<",
        )
        .fromTo(
          sel("tagline-new"),
          { yPercent: 50, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.5, clearProps: "transform" },
          "-=0.1",
        )
        .set(sel("tagline-break"), { clearProps: "display" });

      // Everything below is scroll-triggered: set up once the route's scroll position has settled
      return onNextFrame(context, () => {
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
        revealMaskedHeadings();

        // ── Skill + certificate rows: fade up, dividers draw left → right ─
        gsap.utils.toArray<HTMLElement>(sel("list")).forEach((list) => {
          const tl = gsap.timeline();
          playOnceInView(list, tl);
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
    });

    return () => {
      mm.revert();
      stopAnchorScroll();
    };
  });

  return null;
}
