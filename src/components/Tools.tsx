import Image from "next/image";
import type { CSSProperties } from "react";
import { tools } from "@/data/content";
import Container from "./Container";
import SectionHeading, { Accent } from "./SectionHeading";

/** Logos are 104px on desktop (Figma); 86.57px on mobile, larger on big monitors. */
const MOBILE_SCALE = 86.57 / 104;
const XL_SCALE = 120 / 104; // ≥1536
const XXL_SCALE = 136 / 104; // ≥1920

export default function Tools() {
  return (
    <section id="tools" data-animate="section">
      <Container className="flex flex-col gap-10 lg:gap-20 2xl:gap-24">
        <SectionHeading>
          <Accent>Tools</Accent> of Choice
        </SectionHeading>

        <ul
          className="grid grid-cols-3 items-center gap-y-10 lg:flex lg:h-[140px] lg:justify-between"
          data-animate="tools"
        >
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="flex justify-start [&:nth-child(3n)]:justify-end [&:nth-child(3n+2)]:justify-center"
              data-animate="tool"
            >
              <Image
                src={tool.icon}
                alt={tool.name}
                title={tool.name}
                width={tool.width}
                height={tool.height}
                style={
                  {
                    "--w-mobile": `${tool.width * MOBILE_SCALE}px`,
                    "--w-desktop": `${tool.width}px`,
                    "--w-xl": `${tool.width * XL_SCALE}px`,
                    "--w-xxl": `${tool.width * XXL_SCALE}px`,
                  } as CSSProperties
                }
                className="h-auto w-(--w-mobile) transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none lg:w-(--w-desktop) 2xl:w-(--w-xl) 3xl:w-(--w-xxl)"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
