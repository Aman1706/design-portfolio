import CaseStudies from "@/components/CaseStudies";
import Certificates from "@/components/Certificates";
import CursorDot from "@/components/CursorDot";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PageAnimations from "@/components/PageAnimations";
import ScrollToTop from "@/components/ScrollToTop";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";

export default function Home() {
  return (
    <div className="flex flex-col gap-[60px] md:gap-[90px] lg:gap-[120px] 2xl:gap-[140px] 3xl:gap-[160px]">
      <Navbar />
      <main className="flex flex-col gap-[60px] md:gap-[90px] lg:gap-[120px] 2xl:gap-[140px] 3xl:gap-[160px]">
        <Hero />
        <Skills />
        <Tools />
        <CaseStudies />
        <Certificates />
      </main>
      <Footer />
      <ScrollToTop />
      <CursorDot />
      <PageAnimations />
    </div>
  );
}
