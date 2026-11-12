import Image from "next/image";
import { BloomArt } from "../_components/bloom-art";
import { ArrowRightIcon } from "../_components/icons";
import { buttonClasses, nudge, Pill, stagger } from "../_components/ui";
import { convention } from "../_lib/config";
import { eventTimeRange, formatDate } from "../_lib/format";

export function Hero({ open, guestPrice }: { open: boolean; guestPrice: string }) {
  const facts = [
    { label: "Date", value: formatDate(convention.startsAt) },
    { label: "Time", value: eventTimeRange() },
    { label: "Venue", value: convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "Lagos · venue TBA" },
  ];

  const [line1, line2] = convention.headline;
  const [lead, ...words] = line2.split(" ");
  const rest = words.join(" ");

  return (
    <section aria-labelledby="cv-title" className="relative overflow-hidden bg-(--cv-ink) text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pt-10 md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 lg:pt-14">
        <div className="relative z-10 space-y-6 lg:self-center lg:pb-14">
          <Pill className="cv-enter">{convention.theme}</Pill>

          {/* Echoes the event flyer: "Beacon" in blue, an italic "in", "Bloom" in green. */}
          <h1 id="cv-title" className="cv-display text-[clamp(3.5rem,13vw,7.25rem)]">
            <span className="cv-enter block text-(--cv-brand)" style={stagger(1)}>
              {line1}
            </span>{" "}
            {/* "in Bloom" opens like a flower. */}
            <span className="cv-enter-bloom block text-(--cv-mint)" style={stagger(2)}>
              <em className="font-serif font-normal text-white normal-case">{lead}</em> {rest}
            </span>
          </h1>

          <p className="cv-enter max-w-xl text-lg leading-8 text-(--cv-on-ink-muted) lg:text-xl" style={stagger(4)}>
            <strong className="text-white">{new Date(convention.startsAt).getFullYear()} Annual Convention, Awards &amp; Presidential Investiture.</strong>{" "}
            {convention.tagline}
          </p>

          <div className="cv-enter flex flex-wrap items-center gap-x-6 gap-y-4" style={stagger(5)}>
            {open && (
              <a href="#register" className={buttonClasses("accentOnInk", "lg", "pr-3")}>
                Register now
                <span className="flex size-8 items-center justify-center border-2 border-(--cv-ink) bg-white">
                  <ArrowRightIcon width={18} height={18} className={nudge.forward} />
                </span>
              </a>
            )}
            <p className="font-sans font-bold">
              Members free <span aria-hidden="true" className="text-(--cv-sun)">✦</span> Guests {guestPrice}
            </p>
          </div>

          <dl style={stagger(6)} className="cv-enter relative grid max-w-2xl border-2 border-white bg-(--cv-ink) sm:grid-cols-3">
            {facts.map((fact, i) => (
              <div key={fact.label} className={i > 0 ? "border-t-2 border-white p-4 sm:border-t-0 sm:border-l-2" : "p-4"}>
                <dt className="font-sans text-xs font-bold tracking-[0.12em] text-(--cv-sun) uppercase">{fact.label}</dt>
                <dd className="mt-1 font-sans font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A generation in motion: three young leaders stride forward off the hero's bottom edge, the flower opening behind them. */}
        <div className="relative -mx-4 h-[400px] overflow-hidden sm:h-[460px] lg:mx-0 lg:h-[600px] lg:self-end lg:overflow-visible">
          <BloomArt className="absolute top-[24%] left-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2" />
          <Image
            src="/convention/art/hero-generation.webp"
            alt=""
            width={791}
            height={1100}
            priority
            sizes="(min-width: 1024px) 430px, 70vw"
            style={stagger(3)}
            className="cv-enter-lift absolute bottom-0 left-1/2 h-[90%] w-auto max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
