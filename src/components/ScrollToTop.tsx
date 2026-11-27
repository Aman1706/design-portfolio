"use client";

import { useEffect, useState } from "react";
import { scrollToHash } from "@/lib/smooth-scroll";

/** Floating "back to top" button that appears once the footer (#contact) scrolls into view. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToHash("#top")}
      aria-label="Scroll to top"
      data-cursor-tone="cream"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center rounded-full bg-surface text-ink shadow-lg transition-all duration-300 ease-out hover:bg-accent-alt hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-alt motion-reduce:transition-none md:right-10 md:bottom-10 lg:size-14 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      data-animate="scroll-to-top"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 16V4M10 4L4.5 9.5M10 4l5.5 5.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
