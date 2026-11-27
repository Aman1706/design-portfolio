import type { ReactNode } from "react";
import CaseStudyAnimations from "../CaseStudyAnimations";
import CursorDot from "../CursorDot";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";
import Lightbox from "./Lightbox";

/** Page frame shared by every case study: nav, footer, scroll-to-top, image lightbox, cursor and motion. */
export default function CaseStudyShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Navbar progress />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <Lightbox />
      <CursorDot />
      <CaseStudyAnimations />
    </div>
  );
}
