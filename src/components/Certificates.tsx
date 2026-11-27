import { certificates } from "@/data/content";
import Container from "./Container";
import Divider from "./Divider";
import SectionHeading, { Accent } from "./SectionHeading";

export default function Certificates() {
  return (
    <section id="certificates" data-animate="section">
      <Container className="flex flex-col gap-10 lg:gap-20 2xl:gap-24">
        <SectionHeading>
          <Accent>Certificates</Accent> Achieved
        </SectionHeading>

        <ul className="relative flex flex-col" data-animate="list">
          <Divider position="top" />
          {certificates.map((cert) => (
            <li key={cert.title} className="relative py-5 lg:py-10">
              <div
                className="flex flex-col gap-2 leading-[normal] lg:flex-row lg:items-center lg:justify-between lg:gap-6"
                data-animate="certificate"
              >
                <h3 className="max-w-[320px] font-display text-[24px] font-bold lg:w-[320px] 3xl:w-[380px] 3xl:max-w-[380px] 3xl:text-[28px]">
                  {cert.title}
                </h3>
                {/* Fixed-width box (98px in Figma) so issuers share a left edge across rows */}
                <p className="text-[20px] tracking-[-0.8px] text-ink-soft lg:w-[5em] lg:shrink-0 lg:whitespace-nowrap 3xl:text-[22px]">
                  {cert.issuer}
                </p>
                <p className="text-[20px] tracking-[-0.8px] text-ink-soft lg:w-[243px] lg:shrink-0 3xl:w-[270px] 3xl:text-[22px]">
                  {cert.date}
                </p>
              </div>
              <Divider position="bottom" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
