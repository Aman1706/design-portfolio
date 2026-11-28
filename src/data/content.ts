/**
 * All site copy and links live here. Replace the "#" placeholders with real URLs.
 * Section links are written as "/#id" so they also work from the case-study pages.
 */

export const site = {
  name: "Aman Nayak",
  role: "Product Designer",
  location: "Bangalore, IN",
  email: "aman.nayak@icloud.com",
  status: "Open to product design roles",
  footerBio: "Product designer in Bangalore. Six years of frontend, now designing what I used to build.",
  copyright: "© 2026 Aman Nayak. Designed in Figma, built in Next.js.",
};

export const hero = {
  /**
   * Rendered as: before + <accent>highlight</accent> + after. On load, `replaces` shows first, gets
   * struck through and swaps to `highlight` (engineer → designer); without motion only `highlight` shows.
   */
  tagline: {
    before: "Six years as a frontend engineer taught me what survives real code. Now I ",
    replaces: "build",
    highlight: "design",
    after: " for it.",
  },
};

export const navLinks = [
  { label: "Skills", href: "/#skills" },
  { label: "Tools", href: "/#tools" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Contact", href: "/#contact" },
];

export const footerPages = [
  { label: "Skills", href: "/#skills" },
  { label: "Tools", href: "/#tools" },
  { label: "Case studies", href: "/#case-studies" },
  { label: "Certificates", href: "/#certificates" },
];

export const externalLinks = [
  { label: "Resume", href: "/Aman-Nayak-Resume.pdf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aman-n1/" },
  { label: "GitHub", href: "https://github.com/Aman1706" },
];

export type Skill = { title: string; tags: string; description: string };

export const skills: Skill[] = [
  {
    title: "User research",
    tags: "Interviews · Surveys · Competitor analysis",
    description: "Finding the real problem before drawing a single screen.",
  },
  {
    title: "IA & flows",
    tags: "Card sorting · User flows · Task flows",
    description: "Structures that keep products simple to navigate.",
  },
  {
    title: "Design systems",
    tags: "Components · Tokens · Type scales",
    description: "Systems that hold across iOS, Android and web.",
  },
  {
    title: "Usability & accessibility",
    tags: "Usability testing · Contrast · Touch targets",
    description: "Testing with real users, and designing so everyone can use what ships.",
  },
  {
    title: "Design to code",
    tags: "Figma · Framer · React",
    description: "Prototypes with real states and motion, and handoffs with no guesswork.",
  },
];

export type Tool = { name: string; icon: string; width: number; height: number };

/** width/height are the SVGs' intrinsic sizes from Figma. */
export const tools: Tool[] = [
  { name: "Figma", icon: "/icons/figma.svg", width: 104, height: 104 },
  { name: "Framer", icon: "/icons/framer.svg", width: 104, height: 104 },
  { name: "Claude", icon: "/icons/claude.svg", width: 104, height: 104 },
  { name: "React", icon: "/icons/react.svg", width: 104, height: 92.493 },
  { name: "Next.js", icon: "/icons/nextjs.svg", width: 105, height: 104 },
  { name: "Claude Code", icon: "/icons/claude-code.svg", width: 104, height: 104 },
];

export type CaseStudy = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const caseStudies: { featured: CaseStudy; platforms: CaseStudy[] } = {
  featured: {
    eyebrow: "UX case study",
    title: "Buddy Up",
    description:
      "Researched why teens and young adults drop learning goals, cut the app to three features, then tested it with real users.",
    image: "/images/case-ux.webp",
    imageAlt: "Bud, the Buddy Up mascot, on a desk with books, a wireframe sketch and a sunset window",
    href: "/case-studies/buddy-up",
  },
  platforms: [
    {
      eyebrow: "UI case study · iOS",
      title: "Buddy Up for iOS",
      description:
        "Built to Apple's HIG: dashboards became points and streaks, and extra features were cut so the app stays light.",
      image: "/images/case-ios.webp",
      imageAlt: "Buddy Up iOS app screens",
      href: "/case-studies/buddy-up-ios",
    },
    {
      eyebrow: "UI case study · Android",
      title: "Buddy Up for Android",
      description:
        "The same app on Android: a two-colour purple palette, Noto Sans, and native parts like the FAB and snackbars.",
      image: "/images/case-android.webp",
      imageAlt: "Buddy Up Android app screens with the AI buddy mascot",
      href: "/case-studies/buddy-up-android",
    },
  ],
};

export type Certificate = { title: string; issuer: string; date: string };

export const certificates: Certificate[] = [
  { title: "AI Powered UI/UX Design Course", issuer: "DesignBoat", date: "Nov 2026" },
  {
    title: "Claude Certified Architect, Foundations",
    issuer: "Anthropic",
    date: "Aug 2026 · valid to Aug 2027",
  },
];
