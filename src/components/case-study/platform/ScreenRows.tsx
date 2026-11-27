import type { ScreenGroup, ScreenRow } from "@/data/case-studies/types";
import ZoomableImage from "../ZoomableImage";
import type { PlatformTheme } from "./theme";

/* Static class maps so Tailwind can see every class. */
const MD_COLS = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-4" } as const;
const LG_COLS = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" } as const;

function Group({ group, inverted, theme }: { group: ScreenGroup; inverted: boolean; theme: PlatformTheme }) {
  const multi = group.screens.length > 1;
  const span = group.span ?? 1;

  return (
    <li
      // Phones: groups of several screens take the full width on phones; desktop span comes from the data
      className={`${multi || span === 2 ? "col-span-2" : "col-span-1"} ${span === 2 ? "md:col-span-2" : "md:col-span-1"}`}
      data-animate="reveal"
    >
      <figure className="flex flex-col gap-5 lg:gap-7">
        <div className={`grid items-start gap-3 sm:gap-4 lg:gap-5 ${multi ? "grid-cols-2" : "grid-cols-1"}`}>
          {group.screens.map((screen) => (
            <div key={screen.src} className="flex flex-col gap-3 lg:gap-4" style={{ maxWidth: screen.width / 2 }}>
              {screen.step && (
                <p className="flex items-center gap-2 text-[13px] leading-[1.5] font-semibold">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${theme.badge}`}
                  >
                    {screen.step.n}
                  </span>
                  <span className={inverted ? "text-surface/80" : "text-droid-ink"}>{screen.step.label}</span>
                </p>
              )}
              <ZoomableImage
                image={screen}
                fit
                sizes={
                  screen.width > 700
                    ? "(min-width: 1024px) 508px, 100vw"
                    : "(min-width: 1024px) 290px, (min-width: 768px) 25vw, 50vw"
                }
              />
            </div>
          ))}
        </div>
        <figcaption className="flex max-w-[442px] flex-col gap-1.5 leading-[1.5]">
          <span className="text-[16px] font-semibold lg:text-[18px]">{group.title}</span>
          <span className={`text-[14px] lg:text-[15px] ${inverted ? "text-surface/75" : "text-ink-soft"}`}>
            {group.body}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Rows of phone screens with captions, optionally on a coloured band. */
export default function ScreenRows({
  rows,
  dark,
  theme,
}: {
  rows: ScreenRow[];
  /** The section background is dark. */
  dark: boolean;
  theme: PlatformTheme;
}) {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {rows.map((row, i) => {
        const inverted = dark || row.panel === "solid";
        const panel =
          row.panel === "solid"
            ? `${theme.solidPanel} text-white`
            : row.panel === "soft"
              ? `${theme.softPanel} text-ink`
              : "";

        return (
          <div
            key={i}
            className={`flex flex-col gap-6 lg:gap-8 ${row.panel ? `rounded-[24px] p-5 md:p-8 lg:rounded-[32px] lg:p-10 ${panel}` : ""}`}
            // The cursor's "View" label is cream, so use the bright red rather than cream on the solid band
            data-cursor-tone={row.panel === "solid" ? "light" : undefined}
          >
            {row.heading && (
              <div className="flex max-w-[720px] flex-col gap-3" data-animate="reveal">
                <h3 className="text-[32px] leading-[normal] font-semibold lg:text-[40px]">{row.heading.title}</h3>
                <p
                  className={`text-[16px] leading-[1.5] lg:text-[17px] ${inverted ? "text-surface/80" : "text-ink-soft"}`}
                >
                  {row.heading.body}
                </p>
              </div>
            )}
            {row.label && (
              <p
                className={`text-[12px] leading-[normal] font-medium tracking-[0.08em] uppercase lg:text-[13px] ${
                  inverted ? "text-surface/75" : "text-ink-soft"
                }`}
                data-animate="reveal"
              >
                {row.label}
              </p>
            )}
            <ul
              className={`grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:gap-x-5 lg:gap-y-14 ${MD_COLS[row.columns]} ${LG_COLS[row.columns]}`}
            >
              {row.groups.map((group) => (
                <Group key={group.title} group={group} inverted={inverted} theme={theme} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
