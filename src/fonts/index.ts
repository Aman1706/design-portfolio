import localFont from "next/font/local";

/** Headings — Oswald (variable, weights 200–700). */
export const oswald = localFont({
  src: "./Oswald-Variable.woff2",
  variable: "--font-oswald",
  weight: "200 700",
  display: "swap",
});

/** Body — DM Sans (variable, weights 100–1000, optical size axis). */
export const dmSans = localFont({
  src: "./DMSans-Variable.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});
