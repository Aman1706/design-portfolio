# Design portfolio

Portfolio site for Aman Nayak, product designer: a single home page plus three Buddy Up case
studies (UX, iOS, Android). Built from Figma with Next.js 16 (App Router), Tailwind CSS v4 and GSAP.

## Scripts

| Command                | What it does                        |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Dev server at http://localhost:3000 |
| `npm run build`        | Production build (all pages static) |
| `npm run start`        | Serve the production build          |
| `npm run lint`         | ESLint                              |
| `npm run format`       | Format with Prettier                |
| `npm run format:check` | Check formatting without writing    |

## Where things live

- `src/data/` — all copy and links (`content.ts`) and case-study copy (`case-studies/`).
- `src/components/` — home-page sections; `case-study/` for the case-study pages.
- `src/styles/theme.css` — colour, font and breakpoint tokens.
- `src/lib/` — GSAP setup, shared animations and in-page scrolling.
- `public/` — Figma image and icon exports.

Conventions, design decisions and gotchas are in [`CLAUDE.md`](./CLAUDE.md).
