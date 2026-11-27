/**
 * Copy for the Buddy Up UX case study (/case-studies/buddy-up).
 * Source: Figma "Buddy Up Case Studies", frame "UX Case Study Design" (95:1796).
 * Diagrams are exported from Figma as images; width/height are the files' pixel sizes (2x).
 */

import type { CaseBanner, CaseImage } from "./types";

const img = (name: string, width: number, height: number, alt: string): CaseImage => ({
  src: `/images/case-studies/buddy-up-ux/${name}`,
  alt,
  width,
  height,
});

export const meta = {
  title: "Buddy Up — UX case study",
  description:
    "Researching why teens drop learning goals, then designing and testing a buddy-led learning app for iOS and Android.",
};

export const hero: CaseBanner = {
  title: "Buddy Up",
  eyebrow: "UX case study",
  tags: "UX Research · Information Architecture · Usability Testing",
  tagline: "Never learn alone.",
  image: img(
    "banner.jpg",
    2560,
    1682,
    "Buddy Up wordmark beside an illustration of Bud, the blue mascot, sitting on a desk with books, a notebook and a mug at sunset",
  ),
};

export const problem = {
  label: "01 | Problem statement",
  title: ["They want to learn.", "They just don’t stick with it."],
  image: img("problem.jpg", 2000, 1333, "A teenage boy looking frustrated while studying on a sofa"),
  overlay: {
    title: "Motivated",
    accent: "≠ consistent.",
    body: "Teens start excited — then get distracted, fizzle out, and lose the thread.",
  },
  questions: [
    { kicker: "Decide it", title: "What should I even learn?", body: "Goals are unclear — academics or hobbies?" },
    {
      kicker: "Find it",
      title: "Where’s the right material?",
      body: "Self-learning resources are scattered and hard to find.",
    },
    {
      kicker: "Stick to it",
      title: "Will I keep going?",
      body: "Social media pulls focus and motivation fades with no one checking in.",
    },
  ],
  hmw: "…help teens and young adults aged 13–20 build a consistent learning habit — guided by a plan that fits them, a buddy they care about, and a community that feels safe?",
};

export const role = {
  label: "02 | My role",
  lead: "I took Buddy Up from research to a clickable iOS & Android prototype — owning the UX end to end.",
  rows: [
    { term: "Role", value: "UX research · Information architecture · Interaction & visual design · Prototyping" },
    { term: "Team", value: "Group research with Rahul Bharadwaj B R, Subhajit & Nizam" },
    { term: "Platform", value: "iOS & Android" },
    { term: "Audience", value: "Teenagers and young adults, 13–20" },
    { term: "Tools", value: "Figma · FigJam" },
    { term: "Year", value: "2026" },
  ],
};

export const process = {
  label: "03 | Design process",
  title: "Design Process",
  intro: "Six phases, one loop — every phase fed the next, from what teens told us to the screens they tapped through.",
  image: img(
    "process.png",
    2176,
    2300,
    "Design process in six phases orbiting Bud: 01 Research & Discover, 02 Define, 03 Information Architecture, 04 Wireframing, 05 Visual Design & Prototype, 06 Usability Testing",
  ),
};

export const strategy = {
  label: "04 | Design strategy",
  kicker: "Buddy Up’s",
  title: "5 step product strategy",
  image: img(
    "strategy.png",
    2176,
    1960,
    "Five-step product strategy: why Buddy Up exists, who it's for (13–20 year-olds), where it lives (iOS and Android), what users do, and what success looks like",
  ),
};

export const competitive = {
  label: "05 | Competitive analysis",
  title: "Competitive Analysis",
  intro:
    "We reviewed 15 learning, habit and community apps. Each nails one piece — a path, a pet, a feed — but none combines a personal plan, a companion and a community for teens.",
  image: img(
    "competitive.png",
    2176,
    1318,
    "Feature comparison of Finch, Duolingo, Khan Academy, Coursera, Udemy, Reddit and Buddy Up. Only Buddy Up has all seven: AI tutor, personalised path, daily goals, gamified rewards, companion, community and progress dashboard",
  ),
  note: "Based on the features we noted for each app during research. Also reviewed: Headway, Yousician, AI chatbots, Minecraft Education, LinkedIn Learning, imath AI tutor, Mind Spark, YouTube, Lumosity.",
};

export type Ring = { value: number; label: string; color: "buddy" | "lavender" | "active" | "accent-alt" };
export type Bar = { label: string; count: number };
export type BarChart = { title: string; color: "accent-alt" | "buddy" | "lavender"; rows: Bar[] };

export const quantitative = {
  label: "06 | Quantitative & qualitative research",
  title: "Quantitative Research",
  intro:
    "An online survey of 14 students — mostly 18–20 at university, plus a handful of 13–17 year-olds at school — on how they learn and what stops them.",
  total: 14,
  rings: [
    { value: 79, label: "Would or might stay on track if someone followed their progress", color: "buddy" },
    { value: 71, label: "Already use AI tools to learn on their own", color: "lavender" },
    { value: 71, label: "Are comfortable learning in a community or group", color: "active" },
    { value: 57, label: "Say their phone is what breaks their consistency", color: "accent-alt" },
  ] satisfies Ring[],
  charts: [
    {
      title: "What makes it hard to stay consistent?",
      color: "accent-alt",
      rows: [
        { label: "Distractions / phone", count: 8 },
        { label: "Don’t know where to start", count: 2 },
        { label: "Too much syllabus", count: 2 },
        { label: "Lose motivation", count: 2 },
      ],
    },
    {
      title: "How do you prefer to learn?",
      color: "buddy",
      rows: [
        { label: "Video", count: 5 },
        { label: "Practice questions", count: 5 },
        { label: "Someone explaining live", count: 2 },
        { label: "Reading", count: 1 },
        { label: "Group study", count: 1 },
      ],
    },
    {
      title: "Who should track your progress?",
      color: "lavender",
      rows: [
        { label: "A friend", count: 5 },
        { label: "A mentor / senior", count: 4 },
        { label: "A stranger with similar goals", count: 3 },
        { label: "An AI agent", count: 1 },
      ],
    },
  ] satisfies BarChart[],
  findings: [
    { value: "3.4 / 5", label: "average rating for how useful school or college is for their actual goals" },
    { value: "YouTube", label: "the #1 place learning actually happens (5 of 14)" },
    { value: "1–2 hrs", label: "the most common daily study time on a device (8 of 14)" },
  ],
  wishTitle: "“If an app could fix ONE thing about how you learn…”",
  wishes: [
    "“Give me a clear path towards my goals”",
    "“Tell me what I’m doing wrong and help me improve”",
    "“Access my assignments and remind me about them”",
    "“Give me nice quizzes”",
    "“An all-in-one app for my complete learning journey”",
    "“Explain things in an easier, simpler way”",
  ],
  note: "Survey: 15 responses collected Jul–Aug 2026; one duplicate removed (n = 14). Answers lightly edited for spelling.",
};

export const qualitative = {
  title: "Qualitative Research",
  intro:
    "Then we sat down one-on-one with school students (CBSE) and college students in computer science or finance, and affinity-mapped what they told us.",
  image: img(
    "interviews.png",
    2176,
    1520,
    "Interview questions and answers around Bud: most lean on AI agents instead of learning platforms; younger students are happy with teachers while college students self-learn; under-14s mostly play games while 17+ use Instagram and YouTube; nobody keeps a timetable",
  ),
  insights: [
    {
      kicker: "Insight 01",
      title: "AI is already the tutor",
      body: "Teens skip learning platforms and go straight to AI agents. A chat-first buddy meets them where they are.",
    },
    {
      kicker: "Insight 02",
      title: "No routine, no plan",
      body: "Nobody we spoke to keeps a timetable. Structure has to be generated for them, not asked of them.",
    },
    {
      kicker: "Insight 03",
      title: "The phone pulls both ways",
      body: "Instagram and YouTube win the attention battle — the same device has to make learning feel as rewarding.",
    },
  ],
};

export const persona = {
  label: "07 | Persona & empathy map",
  title: "User Persona",
  intro:
    "Built from our interviews and affinity map — a real-feeling teen we could design for, keep in the room, and check every decision against.",
  name: "Abhinav Sharma",
  image: img("persona.png", 738, 771, "Abhinav, a smiling teenager in glasses and a yellow shirt, arms crossed"),
  quote:
    "“I’m in 10th grade. I’m not sure exactly what I want to be, but I know it’ll be something in tech. In my free time I play cricket, go to cafés with friends, or watch videos and reels.”",
  tags: ["Student", "15", "Male", "Bengaluru", "10th grade"],
  goals: [
    "Make my parents proud",
    "Build a successful career and reach my goal",
    "Stay passionate and enjoy learning",
    "Learn a new instrument",
    "Be better informed — books, newspapers",
  ],
  painPoints: [
    "Social media apps are distracting",
    "Not enough guidance or clarity from teachers",
    "Hard to find relevant material for self-learning",
    "No time for extracurriculars",
    "Parents restrict phone use and going out",
  ],
  cards: [
    {
      kicker: "Motivations",
      body: "A better future for myself and my family. Be an all-rounder — great at academics and beyond.",
    },
    { kicker: "Brands & apps", body: "Instagram · YouTube · AI agents like Claude, ChatGPT and Gemini" },
  ],
};

export const empathy = {
  title: "Empathy Mapping",
  intro: "What Abhinav says, thinks, does and feels while using a buddy-led learning app.",
  quadrants: [
    {
      title: "Says",
      items: [
        "“I find studying boring — maybe this app can motivate me.”",
        "“The reminders actually help me a lot!”",
        "“This is pretty fun, so much better than doom scrolling.”",
        "“I feel very productive after using this app.”",
      ],
    },
    {
      title: "Thinks",
      items: [
        "What goals should I set — academics or my hobbies?",
        "Will this actually help, or will I end up deleting it?",
        "Videos plus discussing with my buddy and others would help me.",
        "I like that I can customise my buddy.",
      ],
    },
    {
      title: "Does",
      items: [
        "Completes tasks and marks them done to earn achievements",
        "Reviews performance and works on weak areas",
        "Plays around with how to configure the buddy",
        "Starts with videos and quizzes — his preferred formats",
      ],
    },
    {
      title: "Feels",
      items: [
        "Excited — this could finally give some clarity",
        "Restless — he’s fizzled out of apps like this before",
        "Motivated — it might help him stick to his goals",
        "Relaxed — he knows what to do next",
      ],
    },
  ],
};

export const journey = {
  label: "08 | Journey map",
  title: "From exam stress to sharing the plan",
  intro: "Abhinav’s journey — before he finds Buddy Up, and the moments where the app can change how it feels.",
  image: img(
    "journey-map.png",
    2176,
    1274,
    "Journey map across five stages — Struggle, Search, Start, Learn, Reflect — with actions, an emotion curve rising from negative to positive, and opportunities for the app at each stage",
  ),
};

export const cardSort = {
  label: "09 | Card sorting",
  title: "Card Sorting",
  intro:
    "53 feature cards from our research, sorted into 9 groups. This was our first map of everything Buddy Up could hold.",
  image: img(
    "card-sort.png",
    2176,
    3052,
    "Card sort of 53 features into nine groups: Onboarding & Account, Profile & Buddy, Learning & Content, Goals Focus & Tracking, Quizzes & Achievements, Community & Social, Help & Assistance, Notifications, App Settings & Legal",
  ),
};

export const ia = {
  label: "10 | Information architecture",
  chip: "Information architecture",
  lead: "The card sort, turned into a structure: every feature we had in mind, with a clear place in the app.",
  image: img(
    "ia.png",
    2176,
    1792,
    "Information architecture tree with Buddy Up at the root and nine branches, from Onboarding & Account to App Settings & Legal",
  ),
};

export const flows = {
  label: "11 | Task flow & user flow",
  title: "Task Flow & User Flow",
  intro:
    "First each task on its own, step by step. Then the whole app as one map, with every decision a teen makes along the way.",
  taskFlow: {
    chip: "Task flow",
    lead: "12 tasks as we first mapped them, before the UI phase: each one a straight line from first tap to finish, with no branching.",
    image: img(
      "task-flows.png",
      2176,
      3092,
      "Twelve linear task flows: login, sign up, buddy, personalised plan, daily goals, dashboard, community, create community, create post, edit post, chat with buddy and search",
    ),
  },
  userFlow: {
    chip: "User flow",
    lead: "The whole app as one map: every decision from opening Buddy Up to leaving it, and where each path leads.",
    legend: img(
      "user-flow-legend.png",
      410,
      408,
      "Legend: green pill for start and end, blue box for screen or action, slanted box for input, yellow diamond for decision, green and red dots for yes and no",
    ),
    image: img(
      "user-flow.png",
      2176,
      3412,
      "User flow from start through registration or login to the home screen, branching into buddy, personalised plan, search, daily goals, community, posts and chat, then to the end",
    ),
  },
};

const wf = (name: string, caption: string) => ({
  caption,
  image: img(`wireframes/${name}.png`, 644, 1399, `Wireframe of the ${caption.toLowerCase()} screen`),
});

export const wireframes = {
  label: "12 | Wireframes",
  title: "Wireframes",
  intro:
    "46 screens sketched on paper, then rebuilt digitally — structure first, so testing focused on flow, not colour.",
  screens: [
    wf("walkthrough", "Walkthrough"),
    wf("sign-in", "Sign In"),
    wf("sign-up", "Sign up"),
    wf("personalised-plan", "Personalised Plan"),
    wf("buddy-setup", "Buddy setup"),
    wf("home", "Home Screen"),
    wf("settings", "Settings"),
    wf("chat", "Chat"),
    wf("community", "Community"),
  ],
};

export const uiChanges = {
  label: "13 | What changed in the UI phase",
  title: "Start simple, add as needed",
  intro:
    "Moving into UI, the goal was to keep Buddy Up straightforward and simple, so teens keep coming back instead of feeling overwhelmed. It made more sense to start small and add features gradually as they’re needed than to ship everything at once.",
  columns: ["In the flows", "In the UI", "Why"],
  rows: [
    {
      before: "Dashboard, levels, badges, certificates",
      after: "Points & streaks on the home screen",
      why: "The home screen needed to feel fun. A dashboard isn’t something a teenager wants to look at, so for a first version, streaks and points made more sense.",
    },
    {
      before: "Search across the app",
      after: "Search inside Community",
      why: "Search was only really needed in Community, so that’s where it lives.",
    },
    {
      before: "Create community",
      after: "Cut, for now",
      why: "Communities are built around specific topics. Letting anyone create one could fill the app with irrelevant groups.",
    },
    {
      before: "Edit buddy, plan and posts inside their own flows",
      after: "Profile & Settings",
      why: "Easier to manage in one place, and the main flows stay clean instead of carrying edit options everywhere.",
    },
    {
      before: "Help centre, support, AI voice assistant, extra settings",
      after: "Chat with Bud",
      why: "Help and support make sense for a live app later. For a first version, starting with the chat buddy was enough.",
    },
  ],
  /** Rendered as: before + iOS link + " and " + Android link + after */
  note: {
    before: "The full UI story, with the final screens, is in the Buddy Up ",
    ios: { label: "iOS", href: "/case-studies/buddy-up-ios" },
    android: { label: "Android", href: "/case-studies/buddy-up-android" },
    after: " case studies.",
  },
};

export const usability = {
  label: "14 | Usability testing",
  title: "Usability Testing",
  intro:
    "Moderated sessions with three participants on the coded iOS prototype, following the template: participant info, task list, feedback & suggestions, and conclusion.",
  prototype: { label: "Try the prototype", href: "/prototypes/buddy-up-ios/index.html" },
  stats: [
    { label: "Participants", value: "3" },
    { label: "Tasks", value: "5" },
    { label: "Task completion", value: "100%", highlight: true },
  ],
  tasksLabel: "Tasks · same for all participants",
  tasks: ["Sign up", "Home screen", "Chat with Bud", "Community", "Settings"],
  participantsLabel: "Participants · feedback & suggestions",
  participants: [
    {
      name: "Participant A",
      initial: "A",
      role: "College student",
      completed: "5/5 tasks completed",
      well: ["Easy to follow and navigate.", "Felt anyone could jump in without running into issues."],
      suggestions: [
        "Show how many weeks a plan will take when it’s created. Right now every plan defaults to 8 weeks.",
        "Make the daily progress card universal: one count of today’s tasks across all topics, instead of one per topic tab.",
        "Keep Bud present throughout the app, not just as a small chat icon.",
      ],
    },
    {
      name: "Participant B",
      initial: "B",
      role: "College student",
      completed: "5/5 tasks completed",
      well: [
        "Easy to understand.",
        "The plan felt well broken down: a few tasks a day, with progress and rewards for finishing them.",
      ],
      suggestions: ["Add a “remind me” notification that nudges them back to the day’s tasks."],
    },
    {
      name: "Participant C",
      initial: "C",
      role: "School student",
      completed: "5/5 tasks completed",
      well: [
        "Easy to use; the whole flow felt clear.",
        "Especially enjoyed personalising their buddy: the name, talking style and look.",
      ],
      suggestions: [],
      noSuggestions: "None. No issues raised.",
    },
  ],
  conclusion: {
    label: "Conclusion",
    title: "What we learned",
    patterns: [
      {
        title: "Simple works",
        body: "All three found it easy to use and completed every task, which backs the decision to start simple.",
      },
      {
        title: "Bud is the hook",
        body: "Participant C loved personalising Bud; Participant A wanted Bud with them everywhere. Users care about the buddy, so it deserves more room.",
      },
      {
        title: "The plan lands, but needs clarity",
        body: "Participant B liked the daily breakdown and rewards; Participant A wanted to see plan length up front and one combined progress count.",
      },
      {
        title: "Reminders earned their way back",
        body: "Cut in the UI phase to keep things simple, then asked for in testing. A clear next addition.",
      },
    ],
    nextTitle: "What we’d do next",
    next: [
      "Show the plan length during setup",
      "Combine daily progress across all topics",
      "Keep Bud present across the app",
      "Add reminders",
    ],
  },
};
