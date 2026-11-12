import { cx } from "./ui";

/** Scrolling ticker band. Decorative: everything in it is also stated on the page. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const run = items.flatMap((item) => [item, "✦"]);
  return (
    <div aria-hidden="true" className={cx("overflow-hidden border-y-2 border-(--cv-ink) py-3", className)}>
      <div className="cv-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
            {Array.from({ length: 3 }, () => run)
              .flat()
              .map((text, i) => (
                <span key={i} className="cv-display text-2xl whitespace-nowrap lg:text-3xl">
                  {text}
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
