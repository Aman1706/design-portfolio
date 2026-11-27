@AGENTS.md

# Design portfolio

Single-page portfolio for Aman Nayak, built from Figma with Next.js 16 (App Router) + Tailwind CSS v4.

## Source of truth: Figma
- File key `YmXPLa6poK6K7gUTxhsELC`, page "Website".
- Desktop 1280 frame: node `190:202`. Mobile 390 frame: node `194:93`.
- Hidden frame `24:14` is an outdated desktop version — ignore it.
- Mobile case-study copy is stale; the desktop copy is used at all sizes.
- Colour + type tokens: pages "Color" (`1:3`) and "Typeface" (`1:4`).
- Case studies live in a separate file, "Buddy Up Case Studies" (`Oub5T7SK7b2MVHfWtt4YUt`): UX `95:2` (frame `95:1796`, desktop only), iOS `219:2`, Android `251:1511`.

## Conventions
- **Tokens:** colours, fonts and the `3xl` breakpoint live in `src/styles/theme.css`. Use token classes (`text-accent`, `bg-ink`, `border-divider`…), never raw hex.
- **Fonts:** Oswald (headings, `font-display`) and DM Sans (body, `font-sans`) are self-hosted in `src/fonts/` via `next/font/local`. Don't switch to `next/font/google`.
- **Content:** all copy and links live in `src/data/content.ts`; case-study copy lives in `src/data/case-studies/<slug>.ts`. Section links are `/#id` so they work from sub-pages.
- **Links:** links to case-study pages use `next/link` (prefetch, no full reload). `/#id` section links stay plain `<a>` (handled by `initAnchorScroll()` on home, a full load elsewhere — see Gotchas). Exception: the navbar logo (`/#top`) is a `<Link>`, because `@next/next/no-html-link-for-pages` rejects a literal `/` href in an `<a>`.
- **Layout:** wrap section content in `Container` (gutters 16/40/80px; content 1120 → 1280 at `2xl` → 1520 at `3xl`).
- **Breakpoints:** mobile-first. Below `lg` (1024) follows the mobile frame, `lg` is the Figma desktop, and `2xl` (1536) / `3xl` (1920) are larger steps that scale display type and spacing. Body text stays ~18–20px with capped line length.
- **Assets:** Figma exports are in `public/images` and `public/icons`. Never reference temporary `figma.com/api/mcp/asset` URLs.
- **Case studies:** one static route each under `src/app/case-studies/` (`buddy-up` = UX, `buddy-up-ios`, `buddy-up-android`), all wrapped in `CaseStudyShell`. Shared parts are in `src/components/case-study/` (`CaseSection` tones, `SectionIntro` with Oswald or DM Sans titles, `ZoomableImage`, `StatRing`, `BulletList`, and shared class strings like `darkCard` in `styles.ts`). The UX page has bespoke sections (`buddy-up-ux/`); iOS and Android are rendered from data by `platform/PlatformCaseStudy` (block kinds in `src/data/case-studies/types.ts`). Diagrams, phone screens, component cards and the UI banners are 2x PNG exports in `public/images/case-studies/<slug>/`, not rebuilt; text-heavy parts are code. Phones/cards were cropped from one export of each section's content frame, so re-export the whole frame if the Figma changes. Every image is a `ZoomableImage`: a server component whose button carries the image in `data-zoom-*` attributes. One client `Lightbox` per page (mounted by `CaseStudyShell`) opens it in a native `<dialog>` via a delegated click listener, and never touches page `overflow`.
- **Case-study tokens:** Buddy Up colours are tokens in `theme.css`: blues (`buddy`, `buddy-soft`, `buddy-wash`…), Android purples (`droid`, `droid-soft`…), `card-dark`. Per-platform accent classes live in `platform/theme.ts`. Case-study headers (UX, iOS, Android) are single exported images rendered by `case-study/Banner` (sr-only `h1`, eyebrow/tags repeated as text below `lg`), so no Paytone One font is loaded.

## Decisions
- Static pages first; animations come later with GSAP. Elements carry `data-animate="…"` hooks for this — keep them.
- **GSAP:** import `gsap`, `ScrollTrigger` and `useGSAP` only from `@/lib/gsap` (registers plugins once). Use them in client components inside `useGSAP()` with a scope ref. Register new plugins in that file. Respect `prefers-reduced-motion` (e.g. via `gsap.matchMedia()`).
- **Motion style:** subtle, short, run-once. Nothing loops except the footer status-dot ping. All motion is off under `prefers-reduced-motion`.
- **Where motion lives:**
  - Hovers are CSS only (`.link-underline` utility in `globals.css`, Tailwind `hover:` classes).
  - Load/scroll animations are all in `src/components/PageAnimations.tsx` (home) and `src/components/CaseStudyAnimations.tsx` (case studies), targeting `data-animate` attributes. Pieces both use (`sel`, `fadeInNav`, `revealMaskedHeadings`) are in `src/lib/animations.ts`. Case-study blocks use the generic `data-animate="reveal"` fade-up. Section components stay server components.
  - Scrolling is native: no smooth-scroll library (Lenis was removed as it made wheel/trackpad scrolling feel floaty). Only in-page jumps glide, via `src/lib/smooth-scroll.ts` (`initAnchorScroll()` for same-page `/#id` links on home, `scrollToHash()` for the mobile menu and scroll-to-top). `scroll-padding-top` keeps targets clear of the navbar, so don't add anchor offsets.
- **Scroll-triggered setup** goes inside `onNextFrame(context, …)` (`src/lib/animations.ts`), and a timeline that plays on scroll uses `playOnceInView(trigger, tl)`, not `gsap.timeline({ scrollTrigger })`. On a client navigation the new page mounts while the window still has the previous page's scroll, so triggers created right away fire early, and several timeline triggers created then make ScrollTrigger throw (page shows "This page couldn't load"). Only reproduces in `npm run build && npm start`, not `next dev`.
- **Hidden previous page:** Next keeps the previous page mounted but hidden, so global `querySelectorAll` in the animation components also matches the hidden page's elements.
- **Pre-animation hidden state:** the inline script in `layout.tsx` adds `.js` to `<html>`. `globals.css` hides animation targets only under `.js` + motion allowed, with a 4s fallback that reveals them. A new animated target needs its `data-animate` value added to that list, and must be revealed with `autoAlpha` via `fromTo`.
- **Masked reveals** use an `overflow-hidden` wrapper around a `data-animate="mask-inner"` span. The hero masks have extra padding for descenders; the `h1` is `flex-col` so their negative margins don't collapse.
- Navbar is plain `sticky` — no hide-on-scroll (tried and removed).
- **Cursor dot** (`src/components/CursorDot.tsx`): red dot trailing the native cursor; opens into a ring over links/buttons, "View" badge over `data-cursor="view"` (case-study images). Bright red (`accent-alt`) inside `data-cursor-tone="light"` (footer, dark case-study sections, lightbox) — add it to any new dark area; cream inside `data-cursor-tone="cream"` for red areas (scroll-to-top button, which turns red on hover). Fine pointers + motion allowed only. It's the one continuous motion besides the status-dot ping — it reacts to input, never loops.
- Scroll-to-top button appears when the footer (`#contact`) is in view.
- No dark mode: the site always uses the Figma palette.

## Gotchas
- Don't add `scroll-behavior: smooth` to `html`. On a page load to `/#section`, Chromium animates the jump to the section, and ScrollTrigger's first refresh cancels it near the top, so the page shows the hero. In-page links glide via `scrollToHash()` instead.
- Don't lock scrolling by setting `overflow` on `<html>`/`<body>`. It removes the scrollbar, so the page reflows, and on phones it can toggle the browser toolbar. Either makes content flicker behind overlays. The mobile menu blocks wheel/touch events on the overlay itself instead.
- If styles look stale or unstyled in dev (e.g. dark background, no accent colours), the dev server has cached old CSS: stop it, `rm -rf .next`, then `npm run dev`.
- Replacing an image in `public/` keeps the same URL, so `next/image` keeps serving the old optimized copy. In dev that cache is `.next/dev/cache/images` (not `.next/cache/images`); delete it, or all of `.next`.

## Checks
`npm run lint`, `npm run format:check` and `npm run build` must pass. Prettier (120 columns, `prettier-plugin-tailwindcss` sorts classes) is the formatter: run `npm run format`.
