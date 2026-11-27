/**
 * Copy for the Buddy Up iOS UI case study (/case-studies/buddy-up-ios).
 * Source: Figma "Buddy Up Case Studies", frame "iOS Case Study Design" (219:2).
 * Screens and component cards are cropped from 2x exports of each section's content frame.
 */

import type { CaseImage, PlatformCaseStudy, Screen } from "./types";

const DIR = "/images/case-studies/buddy-up-ios";
const img = (path: string, width: number, height: number, alt: string): CaseImage => ({
  src: `${DIR}/${path}`,
  alt,
  width,
  height,
});

/** Phone screens: 211 × 447 at 1x (states 253 × 536, main row 287 × 608). */
const phone = (name: string, alt: string): Screen => img(`screens/${name}.png`, 422, 894, `iOS screen: ${alt}`);
const statePhone = (name: string, alt: string): Screen => img(`screens/${name}.png`, 506, 1073, `iOS screen: ${alt}`);
const card = (name: string, w: number, h: number, alt: string) => img(`components/${name}.png`, w, h, alt);

export const ios: PlatformCaseStudy = {
  platform: "ios",
  meta: {
    title: "Buddy Up — iOS UI case study",
    description:
      "The Buddy Up iOS app: one brand blue, Work Sans, a small component kit and every screen from onboarding to error states.",
  },
  banner: {
    image: img(
      "banner.png",
      2560,
      1640,
      "Buddy Up wordmark between two tilted iPhones showing the walkthrough and a chat with Bud",
    ),
    title: "Buddy Up",
    eyebrow: "iOS UI case study",
    tags: "UI Design · iOS App · Design System",
    tagline: "Never learn alone.",
  },
  sections: [
    {
      label: "01 | Colour & typography",
      title: "One blue, one typeface",
      intro:
        "The UI kit stays small on purpose: a single brand blue with a full tint scale, quiet neutrals, three feedback colours, and Work Sans in three weights. Fewer choices kept every screen consistent and quick to build.",
      tone: "white",
      titleFont: "sans",
      blocks: [
        {
          kind: "split",
          title: "/ Colour",
          body: "Built around one confident blue. It reads as calm and trustworthy when the app asks teens to commit to a plan, and it is bright enough to feel playful next to Bud. Neutrals keep the screens quiet so progress stands out, and the three syntax colours are used only for feedback.",
          image: img(
            "colour.png",
            1544,
            1520,
            "Colour palette: Primary 500 brand blue #2E81F6, Primary 700 #0E52B2, Primary 1000 #00204C, Primary 100 and 300, neutrals, and syntax colours for error #D90E0E, warning #D9A60E and success #0FA824, with full primary and neutral tint scales",
          ),
        },
        {
          kind: "split",
          title: "/ Typography",
          body: "Work Sans for everything. Its wide, open letterforms feel friendly without looking childish, and it stays readable at the small sizes a phone needs. One family in three weights keeps the hierarchy simple, with sizes in three steps (L, M, S) for larger and smaller iPhones.",
          image: img(
            "typography.png",
            1544,
            1210,
            "Work Sans in Regular, SemiBold and Bold, with a type scale: Heading H1 24/22/20 Bold, Sub heading H2 20/18/16 SemiBold, Content 16/14/12 Regular, CTA 16/14/12 SemiBold, Label 14/12/10 Regular",
          ),
        },
      ],
    },
    {
      label: "02 | Components",
      title: "Built once, used everywhere",
      intro:
        "Each component has a clear anatomy, so every screen is put together from the same parts. Here are the pieces that carry the most weight in Buddy Up.",
      tone: "ios-wash",
      titleFont: "sans",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          cards: [
            card(
              "button",
              1104,
              1090,
              "Button anatomy: 370 × 48 container, radius 10, Primary/500 fill, Neutral/100 label",
            ),
            card("task-card", 1104, 1090, "Task card anatomy: card, goal icon, goal type and goal title"),
            card("tab-bar", 1104, 2100, "Tab bar anatomy: bar, selected tab pill, active label and tab icons"),
            card(
              "track-card",
              1104,
              2100,
              "Track card anatomy, open and closed: header, chevron, week list, topic icon and duration pill",
            ),
            card(
              "chat-bubbles",
              1104,
              1248,
              "Chat bubbles: Bud's grey incoming message and the user's blue outgoing message",
            ),
            card(
              "alert",
              1104,
              1248,
              "Alert anatomy: sign-out dialog with a red destructive action and a blue safe action",
            ),
          ],
        },
        {
          kind: "cards",
          title: "More components",
          columns: 3,
          cards: [
            card(
              "secondary-button",
              720,
              626,
              "Secondary button: outlined, for lighter actions like Bud's suggested prompts",
            ),
            card("add-button", 720, 626, "Add button: starts a new post from Community"),
            card("search-bar", 720, 626, "Search bar: lives inside Community only"),
            card("segmented-control", 720, 780, "Segmented control: switch between tracks on Home"),
            card("toolbar", 720, 780, "Toolbar: back, title and actions at the top of inner screens"),
            card("toasts", 720, 780, "Toasts: short success, error and warning feedback"),
          ],
        },
      ],
    },
    {
      label: "03 | Initial screens",
      title: "From hello to a plan in a few taps",
      intro:
        "A short walkthrough, sign up, and a three-step setup where the AI builds a learning plan. Every step can be skipped or changed later, so nobody gets stuck before they start.",
      tone: "light",
      titleFont: "sans",
      blocks: [
        {
          kind: "screens",
          rows: [
            {
              columns: 4,
              groups: [
                {
                  title: "Walkthrough",
                  body: "Two screens explain the idea: a topic broken into small daily goals, and people learning the same thing. Skip is always there.",
                  span: 2,
                  screens: [
                    phone("walkthrough-1", "walkthrough, learn anything in 15 minutes a day"),
                    phone("walkthrough-2", "walkthrough, you're not the only one on week 1"),
                  ],
                },
                {
                  title: "Sign up & verify",
                  body: "Email sign-up with Apple and Google as one-tap options, then a 4-digit code. Familiar iOS patterns, nothing new to learn.",
                  span: 2,
                  screens: [phone("sign-up", "sign up form"), phone("verify", "verify account with a 4-digit code")],
                },
              ],
            },
            {
              columns: 4,
              groups: [
                {
                  title: "Pick topics",
                  body: "Up to three. Search helps when a topic isn’t in the grid.",
                  screens: [phone("setup-topics", "pick up to three topics")],
                },
                {
                  title: "Meet your buddy",
                  body: "Name, colour and how they talk: Chill, Hype or Strict. Bud is the default.",
                  screens: [phone("setup-buddy", "customise your buddy")],
                },
                {
                  title: "Set the pace",
                  body: "Minutes a day and which days, so the plan stays realistic.",
                  screens: [phone("setup-pace", "minutes per day and study days")],
                },
                {
                  title: "Building your plan",
                  body: "A live checklist shows what the AI is doing, so the 20-second wait feels like progress, not a blank loader.",
                  screens: [phone("building-plan", "building your plan with a live checklist")],
                },
              ],
            },
          ],
        },
        {
          kind: "plan",
          title: "Here’s your plan",
          body: "The AI turns the answers into weekly tracks with daily goals. Anything can be changed later from Profile.",
          phone: img(
            "screens/generated-plan.png",
            464,
            983,
            "iOS screen: the generated plan with UI/UX Design and Guitar tracks",
          ),
        },
      ],
    },
    {
      label: "04 | Main screens",
      title: "Learn, chat, belong",
      intro:
        "Home turns progress into points and streaks, the plan breaks learning into daily goals, Bud is one tap away, and communities are organised by topic.",
      tone: "dark",
      titleFont: "display",
      blocks: [
        {
          kind: "screens",
          rows: [
            {
              columns: 4,
              groups: [
                {
                  title: "Home",
                  body: "Today’s goals, with points and a streak up top. A dashboard felt like homework; this feels like a game. Right: the full scroll, down to This Week.",
                  span: 2,
                  screens: [img("screens/home.png", 1016, 1216, "iOS Home screen next to its full scroll")],
                },
                {
                  title: "Community",
                  body: "Groups are set by topic, so there are no off-topic spaces. Search lives here and nowhere else.",
                  screens: [img("screens/community.png", 574, 1216, "iOS screen: Community feed")],
                },
                {
                  title: "Chat with Bud",
                  body: "Questions about the plan go to Bud, which replaced the help centre and voice assistant.",
                  screens: [img("screens/chat.png", 574, 1216, "iOS screen: chat with Bud")],
                },
              ],
            },
            {
              columns: 5,
              groups: [
                {
                  title: "Full plan",
                  body: "Each track is split into weeks and daily goals: a video, a blog or a quiz, each worth points.",
                  screens: [phone("full-plan", "full plan for a track")],
                },
                {
                  title: "Posts & comments",
                  body: "Share work, ask questions and reply to people learning the same thing.",
                  screens: [phone("post-comments", "a post with comments")],
                },
                {
                  title: "Blog",
                  body: "Short reads that fit in the day’s plan, marked done like any other goal.",
                  screens: [phone("blog", "blog goal")],
                },
                {
                  title: "Quiz",
                  body: "Instant feedback on every answer, so it sticks.",
                  screens: [phone("quiz", "quiz with a wrong answer explained")],
                },
                {
                  title: "Video goal",
                  body: "Watch it, mark it done, and it counts towards today.",
                  screens: [phone("video", "video goal")],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "05 | Additional screens",
      title: "Everything else, in one place",
      intro:
        "Profile & Settings holds every edit (buddy, plan, posts and comments), so the main flows stay clean. Community gets its own search and posting flow, and every state, from loading to error to success, is designed rather than left blank.",
      tone: "white",
      titleFont: "sans",
      blocks: [
        {
          kind: "screens",
          rows: [
            {
              columns: 2,
              groups: [
                {
                  title: "Profile & Settings",
                  body: "Editing the buddy, the plan, posts and comments all happens here, so the main flows stay clean.",
                  screens: [
                    phone("profile-settings", "Profile and Settings"),
                    phone("edit-plan", "edit plan, step 1"),
                    phone("edit-buddy", "edit buddy"),
                    phone("post-actions", "actions on your posts and comments"),
                  ],
                },
                {
                  title: "Community",
                  body: "Search lives inside Community only. Every community is one topic, and every post belongs to one.",
                  screens: [
                    phone("search-communities", "search communities"),
                    phone("create-post", "create a post"),
                    phone("view-community", "a community page"),
                    phone("notifications", "notifications"),
                  ],
                },
              ],
            },
          ],
        },
        { kind: "divider" },
        {
          kind: "screens",
          rows: [
            {
              columns: 3,
              heading: {
                title: "States",
                body: "No screen is left blank. Loading, empty, error and success each get a designed answer, and Bud shows up where a friendly face helps.",
              },
              label: "Loading & empty",
              groups: [
                {
                  title: "Skeleton loading",
                  body: "Grey blocks in the shape of the feed, so the layout doesn’t jump when posts arrive.",
                  screens: [statePhone("state-skeleton", "skeleton loading state")],
                },
                {
                  title: "First chat with Bud",
                  body: "Bud introduces itself and offers three prompts, so nobody stares at an empty chat.",
                  screens: [statePhone("state-first-chat", "first chat with Bud")],
                },
                {
                  title: "No results",
                  body: "A spelling suggestion instead of a dead end.",
                  screens: [statePhone("state-no-results", "no search results with a spelling suggestion")],
                },
              ],
            },
            {
              columns: 3,
              label: "Feedback",
              groups: [
                {
                  title: "Input error",
                  body: "The field turns red with a plain fix: what a valid email looks like.",
                  screens: [statePhone("state-input-error", "sign-in with an invalid email error")],
                },
                {
                  title: "Server error",
                  body: "Owns the problem, says progress is safe, and gives two ways out.",
                  screens: [statePhone("state-server-error", "server error with retry")],
                },
                {
                  title: "Goal complete",
                  body: "Points land straight away, feeding the streak on Home.",
                  screens: [statePhone("state-goal-complete", "goal complete, +30 points")],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
