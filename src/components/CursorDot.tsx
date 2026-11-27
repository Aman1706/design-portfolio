"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type CursorState = "default" | "link" | "view";
type Tone = "dark" | "light" | "cream";

/** `fill` true = solid dot; false = outlined ring with a transparent centre. */
const STATES: Record<CursorState, { size: number; fill: boolean }> = {
  default: { size: 16, fill: true },
  link: { size: 40, fill: false },
  view: { size: 80, fill: true },
};

/**
 * Colour token per tone, picked by the nearest `data-cursor-tone` ancestor:
 * deep red on the light page (default), bright red over dark areas ("light"),
 * cream over red areas ("cream"). The "View" label is cream, so tones must stay non-cream
 * wherever `data-cursor="view"` can appear.
 */
const TONE_TOKENS: Record<Tone, string> = {
  dark: "--color-accent",
  light: "--color-accent-alt",
  cream: "--color-surface",
};

/**
 * Red dot that trails the native cursor (which stays visible). Over links/buttons it opens into
 * a ring; over elements marked `data-cursor="view"` it becomes a "View" badge. Inside elements
 * marked `data-cursor-tone="light"` (dark backgrounds) it uses the brighter red; inside
 * `data-cursor-tone="cream"` (red backgrounds) it turns cream.
 * Only active on fine pointers with hover and when motion is allowed; otherwise never shown.
 */
export default function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = dot.current!;
      const rootStyle = getComputedStyle(document.documentElement);
      const rgb = (tone: Tone) => {
        const [r, g, b] = gsap.utils.splitColor(rootStyle.getPropertyValue(TONE_TOKENS[tone]).trim());
        return `${r}, ${g}, ${b}`;
      };
      const colors: Record<Tone, string> = { dark: rgb("dark"), light: rgb("light"), cream: rgb("cream") };

      let state: CursorState = "default";
      let tone: Tone = "dark";
      let shown = false;

      const styleFor = (s: CursorState, t: Tone) => ({
        width: STATES[s].size,
        height: STATES[s].size,
        borderColor: `rgba(${colors[t]}, 1)`,
        backgroundColor: `rgba(${colors[t]}, ${STATES[s].fill ? 1 : 0})`,
      });

      gsap.set(el, { xPercent: -50, yPercent: -50, ...styleFor(state, tone) });

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

      const update = (nextState: CursorState, nextTone: Tone) => {
        if (nextState === state && nextTone === tone) return;
        state = nextState;
        tone = nextTone;
        gsap.to(el, { ...styleFor(state, tone), duration: 0.3, overwrite: "auto" });
        gsap.to(label.current, { autoAlpha: state === "view" ? 1 : 0, duration: 0.2, overwrite: "auto" });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!shown) {
          shown = true;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onLeave = () => {
        shown = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      };

      const onOver = (e: PointerEvent) => {
        const target = e.target as Element | null;
        if (!target?.closest) return;
        // Pointer events stop at an iframe (the embedded prototype), so hide rather than freeze at its edge.
        if (target.tagName === "IFRAME") return onLeave();
        update(
          target.closest("[data-cursor='view']")
            ? "view"
            : target.closest("a, button, [role='button']")
              ? "link"
              : "default",
          (target.closest("[data-cursor-tone]")?.getAttribute("data-cursor-tone") as Tone | null) ?? "dark",
        );
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border-[1.5px] border-solid opacity-0"
    >
      <span
        ref={label}
        className="invisible text-[14px] leading-none font-semibold whitespace-nowrap text-surface opacity-0"
      >
        View
      </span>
    </div>
  );
}
