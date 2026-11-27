import type { ReactNode } from "react";
import CaseStudyAnimations from "../CaseStudyAnimations";
import CursorDot from "../CursorDot";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";

/** Page frame shared by every case study: nav, footer, scroll-to-top, cursor and motion. */
export default function CaseStudyShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <CursorDot />
      <CaseStudyAnimations />
    </div>
  );
}
