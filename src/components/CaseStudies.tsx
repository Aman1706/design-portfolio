import { caseStudies } from "@/data/content";
import CaseStudyCard from "./CaseStudyCard";
import Container from "./Container";
import SectionHeading, { Accent } from "./SectionHeading";

export default function CaseStudies() {
  return (
    <section id="case-studies" data-animate="section">
      <Container className="flex flex-col gap-10 lg:gap-20 2xl:gap-24">
        <SectionHeading>
          Case <Accent>Studies</Accent>
        </SectionHeading>

        <div className="flex flex-col gap-10 lg:gap-20">
          <CaseStudyCard study={caseStudies.featured} layout="featured" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-[26px] 2xl:gap-x-8 3xl:gap-x-10">
            {caseStudies.platforms.map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
