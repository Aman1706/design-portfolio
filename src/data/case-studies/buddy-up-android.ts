/**
 * Copy for the Buddy Up Android UI case study (/case-studies/buddy-up-android).
 * Source: Figma "Buddy Up Case Studies", frame "Android Case Study Design" (264:3530).
 * Screens and component cards are cropped from 2x exports of each section's content frame.
 */

import type { CaseImage, PlatformCaseStudy, Screen } from "./types";

const DIR = "/images/case-studies/buddy-up-android";
const img = (path: string, width: number, height: number, alt: string): CaseImage => ({
  src: `${DIR}/${path}`,
  alt,
  width,
  height,
});

/** Phone screens: 211 × 458 at 1x (states 253 × 549, main rows 251 × 543 and 203 × 440). */
const phone = (name: string, alt: string, step?: Screen["step"]): Screen => ({
  ...img(`screens/${name}.png`, 422, 916, `Android screen: ${alt}`),
  step,
});
const statePhone = (name: string, alt: string): Screen =>
  img(`screens/${name}.png`, 506, 1098, `Android screen: ${alt}`);
const smallPhone = (name: string, alt: string): Screen =>
  img(`screens/${name}.png`, 406, 880, `Android screen: ${alt}`);
/** Component cards are 360px wide (720 at 2x); heights differ per row. */
const cards = (rows: [height: number, items: [name: string, alt: string][]][]) =>
  rows.flatMap(([height, items]) => items.map(([name, alt]) => img(`components/${name}.png`, 720, height, alt)));

export const android: PlatformCaseStudy = {
  platform: "android",
  meta: {
    title: "Buddy Up — Android UI case study",
    description:
      "The Buddy Up Android app: a two-colour purple palette, Noto Sans, Material components like the FAB and snackbars, and every screen from onboarding to error states.",
  },
  banner: {
    image: img(
      "banner.png",
      2560,
      1640,
      "Android phone showing the Buddy Up Home screen, with Bud beside it and a large faded Buddy Up wordmark behind",
    ),
    title: "Buddy Up",
    eyebrow: "Android UI case study",
    tags: "UI Design · Android App · Design System",
    tagline: "Never learn alone.",
  },
  sections: [
    {
      label: "01 | Colour & typography",
      title: "Two colours, one typeface",
      intro:
        "The Android kit adds a second colour. A purple primary carries actions and progress, a soft lavender secondary handles supporting surfaces, and the neutrals and three feedback colours stay the same as iOS. Noto Sans runs through everything in three weights.",
      tone: "white",
      titleFont: "sans",
      blocks: [
        {
          kind: "images",
          images: [
            img(
              "palette.png",
              2240,
              1132,
              "Colour palette: Primary #6C4CF5 for actions, progress and selected states; Secondary #AAA0CC for secondary buttons and soft surfaces; Neutral #000000 to #FFFFFF for text, borders and backgrounds; Syntax #0FA824, #D9A60E and #D90E0E for success, warning and error",
            ),
            img("scales.png", 2240, 738, "Tint scales from 100 to 1000 for primary, secondary and neutral"),
            img(
              "typography.png",
              2240,
              920,
              "Noto Sans in Regular, SemiBold and Bold: Google's own type family, so it sits naturally next to Android's system UI, with sizes in three steps (L, M, S)",
            ),
            img(
              "type-scale.png",
              2240,
              692,
              "Type scale: Heading H1 24/22/20 Bold, Sub heading H2 20/18/16 SemiBold, Content 16/14/12 Regular, CTA 16/14/12 SemiBold, Label 14/12/10 Regular",
            ),
          ],
        },
      ],
    },
    {
      label: "02 | Components",
      title: "Built once, used everywhere",
      intro:
        "Each component has a clear anatomy, so every screen is put together from the same parts. On Android a few are platform-specific: the floating action button, the navigation bar, the top app bar, dialogs and snackbars.",
      tone: "dark",
      titleFont: "display",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          cards: cards([
            [
              612,
              [
                ["primary-button", "Primary button: the main action on every screen, 380 × 48, radius 28"],
                ["secondary-button", "Secondary button: lighter actions like Bud's suggested prompts"],
                ["fab", "Floating action button: starts a new post from anywhere in Community"],
              ],
            ],
            [
              1032,
              [
                ["track-card", "Track card, open and closed: opens to show the week's days, closes to save space"],
                ["chat-bubbles", "Chat bubbles: Bud on the left, you on the right"],
                ["task-card", "Task card: one daily goal, with its type, time and points"],
              ],
            ],
            [
              652,
              [
                ["navigation-bar", "Navigation bar: Home, Buddy, Community and Profile"],
                ["tabs", "Tabs: switch between tracks on Home"],
                ["search-bar", "Search bar: lives inside Community only"],
              ],
            ],
            [
              1018,
              [
                ["dialog", "Dialog: asks before anything disruptive, like signing out"],
                ["top-app-bar", "Top app bar: back, title and actions on every inner screen"],
                ["snackbars", "Snackbars: short warning, error and success feedback at the bottom"],
              ],
            ],
          ]),
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
                    phone("walkthrough-1", "walkthrough, learn anything in 15 minutes a day", {
                      n: "01",
                      label: "Welcome",
                    }),
                    phone("walkthrough-2", "walkthrough, you're not the only one on week 1", {
                      n: "02",
                      label: "Community",
                    }),
                  ],
                },
                {
                  title: "Sign up & verify",
                  body: "Email sign-up with Apple and Google as one-tap options, then a 4-digit code. Familiar Android patterns, nothing new to learn.",
                  span: 2,
                  screens: [
                    phone("sign-up", "sign up form", { n: "03", label: "Sign up" }),
                    phone("verify", "verify account with a 4-digit code", { n: "04", label: "Verify" }),
                  ],
                },
              ],
            },
            {
              columns: 4,
              groups: [
                {
                  title: "Pick topics",
                  body: "Up to three. Search helps when a topic isn’t in the grid.",
                  screens: [phone("setup-topics", "pick up to three topics", { n: "05", label: "Topics" })],
                },
                {
                  title: "Meet your buddy",
                  body: "Name, colour and how they talk: Chill, Hype or Strict. Bud is the default.",
                  screens: [phone("setup-buddy", "customise your buddy", { n: "06", label: "Buddy" })],
                },
                {
                  title: "Set the pace",
                  body: "Minutes a day and which days, so the plan stays realistic.",
                  screens: [phone("setup-pace", "minutes per day and study days", { n: "07", label: "Pace" })],
                },
                {
                  title: "Building your plan",
                  body: "A live checklist shows what the AI is doing, so the 20-second wait feels like progress, not a blank loader.",
                  screens: [
                    phone("building-plan", "building your plan with a live checklist", { n: "08", label: "Building" }),
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "plan",
          step: { n: "09", label: "Plan" },
          title: "Here’s your plan",
          body: "The AI turns the answers into weekly tracks with daily goals. Anything can be changed later from Profile.",
          phone: img(
            "screens/generated-plan.png",
            476,
            1030,
            "Android screen: the generated plan with UI/UX Design and Guitar tracks",
          ),
        },
      ],
    },
    {
      label: "04 | Main screens",
      title: "Learn, chat, belong",
      intro:
        "Home turns progress into points and streaks, the plan breaks learning into daily goals, Bud is one tap away, and communities are organised by topic.",
      tone: "white",
      titleFont: "sans",
      blocks: [
        {
          kind: "screens",
          rows: [
            {
              columns: 4,
              panel: "soft",
              groups: [
                {
                  title: "Community",
                  body: "Groups are set by topic, so there are no off-topic spaces. Search lives here and nowhere else.",
                  screens: [img("screens/community.png", 501, 1087, "Android screen: Community feed")],
                },
                {
                  title: "Home",
                  body: "Today’s goals, with points and a streak up top. A dashboard felt like homework; this feels like a game. Right: the full scroll, down to This Week.",
                  span: 2,
                  screens: [img("screens/home.png", 964, 1164, "Android Home screen next to its full scroll")],
                },
                {
                  title: "Chat with Bud",
                  body: "Questions about the plan go to Bud, which replaced the help centre and voice assistant.",
                  screens: [img("screens/chat.png", 501, 1087, "Android screen: chat with Bud")],
                },
              ],
            },
            {
              columns: 5,
              groups: [
                {
                  title: "Full plan",
                  body: "Each track is split into weeks and daily goals: a video, a blog or a quiz, each worth points.",
                  screens: [smallPhone("full-plan", "full plan for a track")],
                },
                {
                  title: "Posts & comments",
                  body: "Share work, ask questions and reply to people learning the same thing.",
                  screens: [smallPhone("post-comments", "a post with comments")],
                },
                {
                  title: "Blog",
                  body: "A short read with points, finished with one tap on “Finish reading”.",
                  screens: [smallPhone("blog", "blog goal")],
                },
                {
                  title: "Quiz",
                  body: "A wrong answer gets a short “Not quite” explanation, so mistakes still teach something.",
                  screens: [smallPhone("quiz", "quiz with a wrong answer explained")],
                },
                {
                  title: "Video goal",
                  body: "Watch it, mark it done, and it counts towards today.",
                  screens: [smallPhone("video", "video goal")],
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
      tone: "android-wash",
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
                    phone("post-actions", "your activity: posts and comments"),
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
            {
              columns: 3,
              panel: "solid",
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
              panel: "soft",
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
