import Image from "next/image";
import { externalLinks, footerPages, site } from "@/data/content";
import Container from "./Container";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-surface" data-animate="footer" data-cursor-tone="light">
      <Container className="flex flex-col gap-10 py-5 lg:py-10 2xl:gap-12 2xl:py-14">
        {/* Email CTA */}
        <div className="flex flex-col gap-[18px]">
          <h2
            className="font-display text-[clamp(32px,10.25vw,96px)] leading-[normal] font-bold whitespace-nowrap 2xl:text-[112px] 3xl:text-[128px]"
            data-animate="heading"
          >
            <span className="block overflow-hidden">
              <span className="block" data-animate="mask-inner">
                Let&apos;s work <span className="text-accent-alt">together</span>
              </span>
            </span>
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="link-underline self-start text-[20px] leading-[normal] font-medium transition-colors hover:text-accent-alt lg:text-[24px]"
          >
            {site.email}
          </a>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-10 border-y border-divider-alt py-8 leading-[normal] lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-[509px]">
            <p className="text-[20px] font-medium">{site.name}</p>
            <p className="text-[18px] text-ink-soft-alt">{site.footerBio}</p>
            <p className="flex items-center gap-2 self-start rounded-[20px] border border-pill-border px-4 py-2 text-[16px] lg:text-[18px]">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-active opacity-50 motion-reduce:hidden" />
                <Image src="/icons/status-dot.svg" alt="" width={8} height={8} className="relative" />
              </span>
              {site.status}
            </p>
          </div>

          <nav aria-label="Footer pages" className="flex flex-col gap-4 font-medium">
            <p className="text-[20px] text-ink-soft-alt">Pages</p>
            <ul className="flex flex-col gap-4 text-[20px] lg:text-[18px]">
              {footerPages.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline transition-colors hover:text-accent-alt">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 font-medium lg:w-[96px]">
            <p className="text-[20px] text-ink-soft-alt">Elsewhere</p>
            <ul className="flex flex-col gap-4 text-[20px] lg:text-[18px]">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline whitespace-nowrap transition-colors hover:text-accent-alt"
                  >
                    {link.label} <span className="text-accent-alt">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[14px] leading-[normal] text-ink-soft-alt">{site.copyright}</p>
      </Container>
    </footer>
  );
}
