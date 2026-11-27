@AGENTS.md

# Design portfolio

Single-page portfolio for Aman Nayak, built from Figma with Next.js 16 (App Router) + Tailwind CSS v4.

## Source of truth: Figma
- File key `YmXPLa6poK6K7gUTxhsELC`, page "Website".
- Desktop 1280 frame: node `190:202`. Mobile 390 frame: node `194:93`.
- Hidden frame `24:14` is an outdated desktop version — ignore it.
- Mobile case-study copy is stale; the desktop copy is used at all sizes.
- Colour + type tokens: pages "Color" (`1:3`) and "Typeface" (`1:4`).

## Conventions
- **Tokens:** colours, fonts and the `3xl` breakpoint live in `src/styles/theme.css`. Use token classes (`text-accent`, `bg-ink`, `border-divider`…), never raw hex.
- **Fonts:** Oswald (headings, `font-display`) and DM Sans (body, `font-sans`) are self-hosted in `src/fonts/` via `next/font/local`. Don't switch to `next/font/google`.
- **Content:** all copy and links live in `src/data/content.ts`. Resume / LinkedIn / GitHub / case-study URLs are still `#` placeholders.
- **Layout:** wrap section content in `Container` (gutters 16/40/80px; content 1120 → 1280 at `2xl` → 1520 at `3xl`).
- **Breakpoints:** mobile-first. Below `lg` (1024) follows the mobile frame, `lg` is the Figma desktop, and `2xl` (1536) / `3xl` (1920) are larger steps that scale display type and spacing. Body text stays ~18–20px with capped line length.
- **Assets:** Figma exports are in `public/images` and `public/icons`. Never reference temporary `figma.com/api/mcp/asset` URLs.

## Decisions
- Static pages first; animations come later with GSAP. Elements carry `data-animate="…"` hooks for this — keep them.
- **GSAP:** import `gsap`, `ScrollTrigger` and `useGSAP` only from `@/lib/gsap` (registers plugins once). Use them in client components inside `useGSAP()` with a scope ref. Register new plugins in that file. Respect `prefers-reduced-motion` (e.g. via `gsap.matchMedia()`).
- **Motion style:** subtle, short, run-once. Nothing loops except the footer status-dot ping. All motion is off under `prefers-reduced-motion`.
- **Where motion lives:**
  - Hovers are CSS only (`.link-underline` utility in `globals.css`, Tailwind `hover:` classes).
  - Load/scroll animations are all in `src/components/PageAnimations.tsx`, targeting `data-animate` attributes. Section components stay server components.
  - Smooth scrolling is Lenis (`src/lib/smooth-scroll.ts`, `getLenis()`). It honours `scroll-padding-top`, so don't add anchor offsets.
- **Pre-animation hidden state:** the inline script in `layout.tsx` adds `.js` to `<html>`. `globals.css` hides animation targets only under `.js` + motion allowed, with a 4s fallback that reveals them. A new animated target needs its `data-animate` value added to that list, and must be revealed with `autoAlpha` via `fromTo`.
- **Masked reveals** use an `overflow-hidden` wrapper around a `data-animate="mask-inner"` span. The hero masks have extra padding for descenders; the `h1` is `flex-col` so their negative margins don't collapse.
- Navbar is plain `sticky` — no hide-on-scroll (tried and removed).
- Scroll-to-top button appears when the footer (`#contact`) is in view.
- No dark mode: the site always uses the Figma palette.

## Gotchas
- Don't lock scrolling by setting `overflow` on `<html>`/`<body>` (or `lenis.stop()`, which does the same). It removes the scrollbar, so the page reflows, and on phones it can toggle the browser toolbar. Either makes content flicker behind overlays. The mobile menu blocks wheel/touch events on the overlay itself instead.
- If styles look stale or unstyled in dev (e.g. dark background, no accent colours), the dev server has cached old CSS: stop it, `rm -rf .next`, then `npm run dev`.

## Checks
`npm run lint` and `npm run build` must pass.
