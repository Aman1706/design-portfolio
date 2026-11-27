"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToHash } from "@/lib/smooth-scroll";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll lock without touching `overflow`: changing overflow on <html>/<body> removes the
  // scrollbar (page reflows ~15px) and can toggle mobile browser toolbars — both made the page
  // behind the fading overlay flicker. The overlay covers the whole viewport, so swallowing
  // wheel/touch gestures on it is enough.
  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Links are "/#id". On the home page, scroll there; elsewhere (case studies) let the link navigate.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    const url = new URL(href, window.location.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;
    e.preventDefault();
    requestAnimationFrame(() => scrollToHash(url.hash));
  };

  // Stay mounted after `open` turns false so the close animation can play, then unmount.
  // (Adjusting state during render is React's recommended pattern for deriving from props.)
  const [rendered, setRendered] = useState(open);
  if (open && !rendered) setRendered(true);
  const closeTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!rendered) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const links = "[data-animate='menu-link']";

      if (open) {
        // Reopened mid-close: cancel the close so it can't unmount the menu
        closeTl.current?.kill();
        closeTl.current = null;
        if (reduceMotion) return;
        // Open: overlay fades in, links slide up one after another
        gsap
          .timeline()
          .fromTo(ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
          .fromTo(links, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 0.05);
        return;
      }

      // Close: links lift away (last first), then the overlay eases out
      if (reduceMotion) {
        setRendered(false);
        return;
      }
      closeTl.current = gsap
        .timeline({ onComplete: () => setRendered(false) })
        .to(links, { y: -12, autoAlpha: 0, duration: 0.25, stagger: { each: 0.03, from: "end" }, ease: "power2.in" })
        .to(ref.current, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, 0.1);
    },
    { scope: ref, dependencies: [open, rendered] },
  );

  if (!rendered) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      inert={!open}
      aria-label="Menu"
      className="fixed inset-0 z-50 flex touch-none flex-col overscroll-contain bg-surface px-4 pt-[15px] pb-10 md:hidden"
      data-animate="mobile-menu"
    >
      <div className="flex items-center justify-between border-b border-divider py-3">
        <span className="text-[20px] leading-[normal] font-semibold">{site.name}</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="-m-1 flex size-[39px] items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <ul className="mt-10 flex flex-col gap-4">
        {navLinks.map((link) => (
          <li key={link.href} data-animate="menu-link">
            <a
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              className="font-display text-[48px] leading-[normal] font-bold transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href={`mailto:${site.email}`} className="mt-auto text-[18px] text-ink-soft">
        {site.email}
      </a>
    </div>
  );
}
