import Image from "next/image";
import { Band, cx, stagger } from "../_components/ui";
import { convention } from "../_lib/config";

const ROLES = ["Main", "Accent", "Neutral"] as const;

/** What to wear: the palette and its rule, ready-made looks, and the finishing touches. */
export function DressCode() {
  const { summary, rule, palette, looks, extras, tip } = convention.dressCode;

  return (
    <Band id="dress-code" aria-labelledby="cv-dress-title" className="py-16 lg:py-24">
      <h2 id="cv-dress-title" data-reveal className="cv-display text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
        Dress code
      </h2>
      <p data-reveal style={stagger(1)} className="mt-4 max-w-2xl text-lg leading-8 text-(--cv-muted)">
        {summary}
      </p>

      {/* The palette, with the rule beside it on wide screens. */}
      <div data-reveal className="mt-10 grid border-2 border-(--cv-ink) bg-white shadow-(--cv-shadow-lg) lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="p-6 sm:p-8">
          <h3 className="font-sans text-lg font-bold text-(--cv-ink)">The colours</h3>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-6">
            {ROLES.map((role) => (
              <div key={role}>
                <p className="font-sans text-xs font-bold tracking-[0.12em] text-(--cv-muted) uppercase">{role}</p>
                <ul className="mt-3 flex gap-2 sm:gap-3">
                  {palette
                    .filter((colour) => colour.role === role)
                    .map((colour) => (
                      // Paint chips pop in one after another, in palette order.
                      <li key={colour.name} data-reveal="pop" style={stagger(palette.indexOf(colour))} className="w-16 sm:w-[4.5rem]">
                        <span
                          aria-hidden="true"
                          className="block aspect-square w-full border-2 border-(--cv-ink)"
                          style={{ backgroundColor: colour.hex }}
                        />
                        <span className="mt-2 block font-sans text-sm leading-tight font-bold text-(--cv-ink)">{colour.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 border-t-2 border-(--cv-ink) bg-(--cv-sun) p-6 text-(--cv-ink) sm:p-8 lg:border-t-0 lg:border-l-2">
          <p className="font-sans text-xs font-bold tracking-[0.12em] uppercase">The rule</p>
          <p className="cv-display text-[clamp(1.75rem,3vw,2.25rem)]">
            {/* One sentence per line: "One main colour." / "One accent." / "One neutral." */}
            {rule.split(/(?<=\.)\s+/).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </p>
          <p className="font-sans font-bold">Mix them, don&apos;t match them.</p>
        </div>
      </div>

      <h3 data-reveal className="cv-display mt-16 text-[clamp(1.75rem,4vw,3rem)] text-(--cv-ink)">Pick a look. Wear it your way.</h3>
      {/* Swipe through on phones and tablets; all side by side on desktop, however many looks there are. */}
      <ul
        aria-label="Looks that fit the dress code"
        className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-5 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {looks.map((look, i) => (
          <li
            key={look.name}
            data-reveal
            style={stagger(i)}
            className={cx(
              "group/look flex w-[78%] max-w-[18rem] shrink-0 snap-start flex-col border-2 border-(--cv-ink) bg-white shadow-(--cv-shadow) sm:w-[42%] lg:w-auto lg:max-w-none",
              "transition-[translate,box-shadow] duration-200 ease-(--cv-ease-out) hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--cv-ink)] motion-reduce:translate-none",
            )}
          >
            <div className="overflow-hidden border-b-2 border-(--cv-ink)">
              <Image
                src={look.photo}
                alt={look.alt}
                width={528}
                height={808}
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 42vw, 78vw"
                className="aspect-[2/3] w-full object-cover transition-[scale] duration-700 ease-(--cv-ease-out) group-hover/look:scale-[1.04] motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div>
                <p className="font-sans text-xs font-bold tracking-[0.12em] text-(--cv-brand-strong) uppercase">Look {i + 1}</p>
                <h4 className="cv-display mt-1 text-2xl text-(--cv-ink)">{look.name}</h4>
              </div>
              <ul aria-label="Colours" className="flex flex-wrap gap-x-3 gap-y-1.5">
                {look.colours.map((colour) => (
                  <li key={colour.name} className="flex items-center gap-1.5 font-sans text-sm font-bold text-(--cv-ink)">
                    <span aria-hidden="true" className="size-4 shrink-0 border-2 border-(--cv-ink)" style={{ backgroundColor: colour.hex }} />
                    {colour.name}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] leading-6 text-(--cv-muted)">{look.why}</p>
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-12 grid gap-6 border-t-2 border-(--cv-ink) pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h3 className="font-sans text-lg font-bold text-(--cv-ink)">Finish it off</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[17px] font-bold text-(--cv-ink)">
            {extras.map((extra) => (
              <li key={extra} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-(--cv-brand)">
                  ✦
                </span>
                {extra}
              </li>
            ))}
          </ul>
        </div>
        <p className="border-2 border-(--cv-ink) bg-(--cv-mint) px-5 py-4 font-sans font-bold text-(--cv-ink)">
          <span className="mr-2 tracking-[0.12em] uppercase">Tip</span>
          {tip}
        </p>
      </div>
    </Band>
  );
}
