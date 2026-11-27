"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/data/content";
import Container from "./Container";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    // The header's background stays solid while its contents fade in (data-animate="nav" is on <nav>):
    // when the page loads scrolled (back button, /#section links) a fading header would let the
    // content underneath show through.
    <header className="sticky top-0 z-40 bg-surface pt-[15px] md:pt-0">
      <Container>
        <nav
          aria-label="Primary"
          data-animate="nav"
          className="flex items-center justify-between border-b border-divider py-3 md:py-6"
        >
          {/* <Link>, not <a>: next lint requires it for a literal "/" href (see CLAUDE.md → Links) */}
          <Link href="/#top" className="text-[20px] leading-[normal] font-semibold md:text-[24px]">
            {site.name}
          </Link>

          <ul className="hidden items-center gap-6 text-[18px] leading-[normal] font-medium md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-underline transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="-m-1 p-1 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            {/* Inline (not next/image): no extra request, and it's only shown below md */}
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden="true" className="block">
              <path
                d="M5.2 9.05h20.7M5.2 15.5h20.7M5.2 22h20.7"
                stroke="currentColor"
                strokeWidth="1.94"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
