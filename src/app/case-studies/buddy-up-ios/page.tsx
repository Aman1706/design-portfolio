import type { Metadata } from "next";
import CaseStudyShell from "@/components/case-study/CaseStudyShell";
import PlatformCaseStudy from "@/components/case-study/platform/PlatformCaseStudy";
import { ios } from "@/data/case-studies/buddy-up-ios";

export const metadata: Metadata = {
  title: `${ios.meta.title} · Aman Nayak`,
  description: ios.meta.description,
};

export default function BuddyUpIosCaseStudy() {
  return (
    <CaseStudyShell>
      <PlatformCaseStudy study={ios} />
    </CaseStudyShell>
  );
}
