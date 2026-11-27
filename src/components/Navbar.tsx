"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks, site } from "@/data/content";
import Container from "./Container";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface pt-[15px] md:pt-0" data-animate="nav">
      <Container>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between border-b border-divider py-3 md:py-6"
        >
          <a href="#top" className="text-[20px] leading-[normal] font-semibold md:text-[24px]">
            {site.name}
          </a>

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
            <Image src="/icons/hamburger.svg" alt="" width={31.0461} height={31.0461} priority />
          </button>
        </nav>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
