import Image from "next/image";
import type { Block } from "@/data/case-studies/types";
import ZoomableImage from "../ZoomableImage";
import type { PlatformTheme } from "./theme";

type Plan = Extract<Block, { kind: "plan" }>;

/**
 * "Here's your plan": gradient panel with Bud, and the generated-plan phone overlapping its
 * bottom edge. Desktop follows the Figma positions (1120 × 480 panel); smaller screens stack.
 */
export default function PlanPanel({ plan, theme }: { plan: Plan; theme: PlatformTheme }) {
  return (
    <div className="relative lg:mb-[90px]" data-animate="reveal">
      <div
        className={`relative flex flex-col overflow-hidden rounded-[24px] px-6 pt-8 pb-44 text-white md:px-10 lg:block lg:h-[480px] lg:rounded-[32px] lg:p-0 ${theme.planGradient}`}
      >
        {/* Decorative circles (Figma ellipses), as % of the 1120 × 480 panel */}
        <span
          className="absolute top-[-37.5%] left-[67.9%] aspect-square w-[39.3%] rounded-full bg-white/10"
          aria-hidden="true"
        />
        <span
          className="absolute top-[56.3%] left-[28.6%] aspect-square w-[35.7%] rounded-full bg-white/10"
          aria-hidden="true"
        />
        <span
          className="absolute top-[-6.3%] left-[2.7%] aspect-square w-[16.1%] rounded-full bg-white/10"
          aria-hidden="true"
        />

        <div className="relative flex max-w-[320px] flex-col gap-3 leading-[1.5] lg:absolute lg:top-16 lg:left-14 lg:w-[320px]">
          {plan.step && (
            <p className={`flex items-center gap-2 text-[13px] font-semibold ${theme.planText}`}>
              <span
                className={`flex size-7 items-center justify-center rounded-full bg-white text-[11px] font-bold ${theme.badgeOnPanel}`}
              >
                {plan.step.n}
              </span>
              {plan.step.label}
            </p>
          )}
          <h3 className="text-[28px] font-semibold lg:text-[32px]">{plan.title}</h3>
          <p className={`text-[16px] ${theme.planText}`}>{plan.body}</p>
        </div>

        <Image
          src="/images/case-studies/bud.webp"
          alt=""
          width={800}
          height={836}
          sizes="(min-width: 1024px) 300px, 50vw"
          className="relative mx-auto mt-8 w-[55%] max-w-[240px] lg:absolute lg:top-[110px] lg:left-[37.5%] lg:mt-0 lg:w-[26.8%] lg:max-w-none"
        />
      </div>

      {/* The phone hangs off the bottom of the panel */}
      <div className="relative z-10 mx-auto -mt-36 w-[52%] max-w-[232px] lg:absolute lg:top-16 lg:right-[5%] lg:mt-0 lg:w-[20.7%] lg:max-w-none">
        <ZoomableImage image={plan.phone} fit sizes="(min-width: 1024px) 240px, 52vw" />
      </div>
    </div>
  );
}
