"use client";

/**
 * Native scrolling everywhere; only in-page jumps glide. No scroll library: wheel/trackpad
 * scrolling stays exactly as the OS does it.
 *
 * `scroll-padding-top` (globals.css) keeps targets clear of the sticky navbar, so no offsets here.
 */

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scrolls to `#id` (or the top for `#top` / a missing target), smoothly unless reduced motion. */
export function scrollToHash(hash: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  const target = hash && hash !== "#top" ? document.querySelector(hash) : null;
  if (target) target.scrollIntoView({ behavior });
  else window.scrollTo({ top: 0, behavior });
}

/**
 * Makes same-page hash links (e.g. "/#skills" on the home page) glide instead of jumping.
 * Links to another page are left alone. Returns a cleanup function.
 */
export function initAnchorScroll() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.("a[href]");
    if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;

    const url = new URL(link.href);
    if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;

    // Capture phase + preventDefault also stops next/link from handling it
    e.preventDefault();
    if (url.hash !== location.hash) history.pushState(null, "", url.hash);
    scrollToHash(url.hash);
  };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
