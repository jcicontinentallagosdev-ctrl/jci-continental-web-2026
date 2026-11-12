import Image from "next/image";
import { ArrowRightIcon } from "../_components/icons";
import { CountUp } from "../_components/motion";
import { Band, cx, stagger } from "../_components/ui";
import { convention } from "../_lib/config";

const STAT_COLOURS = ["bg-(--cv-brand)", "bg-(--cv-sun)", "bg-(--cv-coral)", "bg-(--cv-sky)"];
const HIGHLIGHT_COLOURS = ["bg-(--cv-mint)", "bg-(--cv-sky)", "bg-(--cv-sun)", "bg-(--cv-coral)", "bg-(--cv-brand)"];

export function About() {
  return (
    <Band aria-labelledby="cv-about" className="py-16 lg:py-24">
      <h2 id="cv-about" data-reveal className="cv-display max-w-5xl text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
        More than a convention.{" "}
        <span className="bg-(--cv-sun) px-2 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">A celebration of impact.</span>
      </h2>
      <p data-reveal style={stagger(1)} className="mt-6 max-w-2xl text-lg leading-8 text-(--cv-muted)">
        {convention.about}
      </p>

      {/* 2px ink lines between cells come from the gap showing the ink background. Two across on phones
          (an odd last stat takes the full row, so no empty ink cell shows), then one equal row on desktop. */}
      <dl data-reveal className="mt-12 grid grid-cols-2 gap-0.5 border-2 border-(--cv-ink) bg-(--cv-ink) lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {convention.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cx(
              "flex flex-col-reverse justify-end gap-2 p-5 text-(--cv-ink) lg:p-8",
              STAT_COLOURS[i % STAT_COLOURS.length],
              i === convention.stats.length - 1 && i % 2 === 0 && "col-span-2 lg:col-span-1",
            )}
          >
            <dt className="font-sans text-sm font-bold tracking-[0.08em] uppercase lg:text-base">{stat.label}</dt>
            <dd className="cv-display text-[clamp(3rem,9vw,5.75rem)]">
              <CountUp value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

export function Highlights() {
  if (convention.highlights.length === 0) return null;
  return (
    <Band aria-labelledby="cv-expect" className="pb-16 lg:pb-24">
      <h2 id="cv-expect" data-reveal className="cv-display text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
        Experience the evening
      </h2>
      {/* Five moments: three across, then the investiture and dinner wider beneath them. */}
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {convention.highlights.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={stagger(i)}
            className={cx(
              "flex flex-col gap-4 border-2 border-(--cv-ink) p-6 text-(--cv-ink) shadow-(--cv-shadow-lg)",
              i < 3 ? "lg:col-span-2" : "lg:col-span-3 lg:flex-row lg:items-center lg:gap-6",
              i === convention.highlights.length - 1 && i % 2 === 0 && "sm:col-span-2 lg:col-span-3",
              "transition-[translate,box-shadow] duration-200 ease-(--cv-ease-out) hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--cv-ink)] motion-reduce:translate-none",
              HIGHLIGHT_COLOURS[i % HIGHLIGHT_COLOURS.length],
            )}
          >
            <Image
              data-reveal="bloom"
              style={stagger(i + 2)}
              src={item.art}
              alt=""
              width={512}
              height={512}
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 80vw"
              className={cx("mx-auto h-auto w-full max-w-[150px] sm:max-w-[200px]", i >= 3 && "lg:mx-0 lg:max-w-[180px] lg:shrink-0")}
            />
            <div className="space-y-3">
              <h3 className="cv-display flex items-baseline gap-3 text-2xl">
                <span className="text-base">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </h3>
              <p className="leading-7">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/** The handover at the heart of the evening: this year's president to next year's. */
export function Investiture() {
  const { outgoing, incoming } = convention.investiture;
  const people = [
    { ...outgoing, verb: "Celebrating", colour: "bg-(--cv-sky)" },
    { ...incoming, verb: "Investing our 6th President", colour: "bg-(--cv-mint)" },
  ];

  return (
    <Band aria-labelledby="cv-investiture" className="border-y-2 border-(--cv-ink) bg-(--cv-brand) py-16 lg:py-24" inner="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div className="text-(--cv-ink)">
        <h2 id="cv-investiture" data-reveal className="cv-display text-[clamp(2.25rem,6vw,4.5rem)]">
          A new chapter of leadership
        </h2>
        <p data-reveal style={stagger(1)} className="mt-6 max-w-xl text-lg leading-8">
          As the {outgoing.year} BEACON year comes to a close, we celebrate the leadership of <strong>{outgoing.name}</strong> and
          witness the investiture of <strong>{incoming.name}</strong> as the {incoming.role} of JCI Continental Lagos.
        </p>
        <p data-reveal style={stagger(2)} className="mt-6 max-w-xl font-sans text-xl font-bold">
          The legacy continues and a new generation takes the lead.
        </p>
      </div>

      <ol aria-label="The handover" className="grid gap-12 sm:grid-cols-2 sm:gap-14">
        {people.map((person, i) => (
          <li key={person.name} data-reveal style={stagger(i * 2)} className="relative">
            {i === 1 && (
              // "Passes to": points down on phones, across from sm.
              <ArrowRightIcon
                aria-hidden="true"
                width={32}
                height={32}
                strokeWidth={3}
                className="absolute -top-10 left-1/2 -translate-x-1/2 rotate-90 text-(--cv-ink) sm:top-1/2 sm:-left-11 sm:translate-x-0 sm:-translate-y-1/2 sm:rotate-0"
              />
            )}
            <div className="h-full border-2 border-(--cv-ink) bg-white text-(--cv-ink) shadow-(--cv-shadow-lg)">
              <p className={cx("cv-display border-b-2 border-(--cv-ink) px-5 py-4 text-6xl", person.colour)}>{person.year}</p>
              <div className="space-y-1 p-5">
                <p className="font-sans text-xs font-bold tracking-[0.12em] text-(--cv-muted) uppercase">{person.verb}</p>
                <p className="font-sans text-xl leading-snug font-bold">{person.name}</p>
                <p className="text-(--cv-muted)">{person.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

export function Programme() {
  if (convention.programme.length === 0) return null;
  return (
    <Band aria-labelledby="cv-programme" className="bg-(--cv-ink) py-16 text-white lg:py-24">
      <h2 id="cv-programme" className="cv-display text-[clamp(2.25rem,6vw,4.5rem)]">
        Programme
      </h2>
      <ol className="mt-10 border-2 border-white">
        {convention.programme.map((item, i) => (
          <li key={`${item.time}-${item.title}`} className="grid grid-cols-[96px_1fr] border-b-2 border-white last:border-b-0 sm:grid-cols-[160px_1fr]">
            <p className="border-r-2 border-white p-4 font-sans font-bold sm:p-6">{item.time}</p>
            <div className={cx("p-4 text-(--cv-ink) sm:p-6", STAT_COLOURS[i % 4])}>
              <p className="cv-display text-xl sm:text-2xl">{item.title}</p>
              {item.detail && <p className="mt-1">{item.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

export function Speakers() {
  if (convention.speakers.length === 0) return null;
  return (
    <Band aria-labelledby="cv-speakers" className="py-16 lg:py-24">
      <h2 id="cv-speakers" className="cv-display text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
        Speakers
      </h2>
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {convention.speakers.map((speaker, i) => (
          <li key={speaker.name} className="border-2 border-(--cv-ink) bg-white shadow-(--cv-shadow)">
            {speaker.photo ? (
              <Image
                src={speaker.photo}
                alt=""
                width={400}
                height={400}
                sizes="(min-width: 1024px) 300px, 50vw"
                className="aspect-square w-full border-b-2 border-(--cv-ink) object-cover"
              />
            ) : (
              <div className={cx("cv-display flex aspect-square items-center justify-center border-b-2 border-(--cv-ink) text-6xl text-(--cv-ink)", HIGHLIGHT_COLOURS[i % 4])}>
                {speaker.name
                  .split(/\s+/)
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <div className="space-y-1 p-4">
              <p className="font-sans text-lg leading-tight font-bold text-(--cv-ink)">{speaker.name}</p>
              <p className="text-sm text-(--cv-muted)">{speaker.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </Band>
  );
}
