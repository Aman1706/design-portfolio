import type { PlatformCaseStudy } from "@/data/case-studies/types";

/** Per-platform accent classes for the UI case studies (blue for iOS, purple for Android). */
export const PLATFORM_THEME = {
  ios: {
    solidPanel: "bg-buddy",
    softPanel: "bg-buddy-wash",
    planGradient: "bg-[linear-gradient(156.8deg,var(--color-buddy-light)_0%,var(--color-buddy-deep)_71.4%)]",
    planText: "text-buddy-wash",
    badge: "bg-buddy",
    badgeOnPanel: "text-buddy",
    /** Step labels on light sections (the iOS study has no steps yet). */
    stepText: "text-ink-soft",
  },
  android: {
    solidPanel: "bg-droid",
    softPanel: "bg-droid-soft",
    planGradient: "bg-[linear-gradient(156.8deg,var(--color-droid-light)_0%,var(--color-droid-deep)_71.4%)]",
    planText: "text-droid-soft",
    badge: "bg-droid",
    badgeOnPanel: "text-droid",
    /** Step labels on light sections. */
    stepText: "text-droid-ink",
  },
} as const satisfies Record<PlatformCaseStudy["platform"], Record<string, string>>;

export type PlatformTheme = (typeof PLATFORM_THEME)[keyof typeof PLATFORM_THEME];
