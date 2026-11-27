# Resume

`resume.html` is the source for `public/Aman-Nayak-Resume.pdf` (A4, one page). It uses the site's palette and the self-hosted fonts in `src/fonts`.

`{{PROTOTYPE_URL}}` is replaced at render time with an absolute link to the coded iOS prototype (`/prototypes/buddy-up-ios/index.html` once the site has a domain).

To re-render, print it with headless Chromium, for example Playwright:

```js
await page.goto("file://" + absolutePathToRenderedHtml, { waitUntil: "networkidle" });
await page.pdf({ path: "public/Aman-Nayak-Resume.pdf", format: "A4", preferCSSPageSize: true, printBackground: true });
```

Check it stays on one page after edits.
