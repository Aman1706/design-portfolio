/** Bulleted list for dark sections: a coloured "•" and soft cream text. */
export default function BulletList({
  items,
  dot = "text-ink-soft-alt",
  className = "gap-3.5 text-[16px]",
  textClassName = "leading-[1.4]",
}: {
  items: string[];
  /** Colour class for the bullet. */
  dot?: string;
  /** Gap and text size for the list. */
  className?: string;
  /** Line height for each item's text. */
  textClassName?: string;
}) {
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className={dot} aria-hidden="true">
            •
          </span>
          <span className={`text-on-dark-soft ${textClassName}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
