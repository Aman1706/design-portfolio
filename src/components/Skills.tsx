import { skills } from "@/data/content";
import Container from "./Container";
import Divider from "./Divider";
import SectionHeading, { Accent } from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" data-animate="section">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-[200px]">
        <SectionHeading className="shrink-0">
          My <Accent>Skills</Accent>
        </SectionHeading>

        <ul className="flex flex-1 flex-col" data-animate="list">
          {skills.map((skill, i) => (
            <li key={skill.title} className="relative py-6">
              <div
                className="flex flex-col gap-5 leading-[normal] lg:flex-row lg:items-start lg:justify-between lg:gap-6"
                data-animate="skill"
              >
                <h3 className="max-w-[152px] font-display text-[24px] font-bold 3xl:max-w-[180px] 3xl:text-[28px]">
                  {skill.title}
                </h3>
                <div className="flex flex-col gap-4 lg:w-[350px] lg:shrink-0 2xl:w-[400px] 3xl:w-[440px]">
                  <p className="text-[14px] text-accent">{skill.tags}</p>
                  <p className="text-[18px] text-ink-soft">{skill.description}</p>
                </div>
              </div>
              {i < skills.length - 1 && <Divider position="bottom" />}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
