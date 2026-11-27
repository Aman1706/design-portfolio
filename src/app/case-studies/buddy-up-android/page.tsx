import type { Metadata } from "next";
import CaseStudyShell from "@/components/case-study/CaseStudyShell";
import PlatformCaseStudy from "@/components/case-study/platform/PlatformCaseStudy";
import { android } from "@/data/case-studies/buddy-up-android";

export const metadata: Metadata = {
  title: `${android.meta.title} · Aman Nayak`,
  description: android.meta.description,
};

export default function BuddyUpAndroidCaseStudy() {
  return (
    <CaseStudyShell>
      <PlatformCaseStudy study={android} />
    </CaseStudyShell>
  );
}
