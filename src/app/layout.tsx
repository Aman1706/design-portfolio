import type { Metadata, Viewport } from "next";
import { dmSans, oswald } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman Nayak — Product Designer",
  description: "Product designer in Bangalore. Six years of frontend engineering, now designing what I used to build.",
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before hydration
    <html lang="en" className={`${oswald.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so animation targets can start hidden (see globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
