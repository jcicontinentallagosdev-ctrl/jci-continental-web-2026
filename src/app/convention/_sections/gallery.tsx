import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "../_components/icons";
import { Band, cx, nudge, stagger } from "../_components/ui";
import { convention } from "../_lib/config";

const tag = "border-2 border-(--cv-ink) px-2.5 py-0.5 font-sans text-sm font-bold text-(--cv-ink)";

/**
 * Photo mosaic of past conventions, each tagged with its year: the first is large, three sit beside it,
 * and the fifth tile is this year's, whose photo hasn't been taken yet.
 */
export function Gallery({ open }: { open: boolean }) {
  const photos = convention.gallery.slice(0, 4);
  if (photos.length === 0) return null;
  const start = new Date(convention.startsAt);
  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Lagos" }).format(start);

  return (
    <Band id="cv-gallery" aria-labelledby="cv-gallery-title" className="bg-(--cv-ink) py-16 lg:py-24">
      {/* No visible heading: the year tags say what these are. Screen readers still get one to jump to. */}
      <h2 id="cv-gallery-title" className="sr-only">
        Moments from past conventions
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            data-reveal
            style={stagger(i)}
            className={cx(
              "group/photo relative overflow-hidden border-2 border-white bg-(--cv-text)",
              i === 0 ? "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto" : "aspect-square sm:aspect-[4/3]",
            )}
          >
            <figure className="h-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
                style={{ objectPosition: photo.focus }}
                className="object-cover transition-[scale] duration-700 ease-(--cv-ease-out) group-hover/photo:scale-[1.04] motion-reduce:transition-none"
              />
              <figcaption className={cx("absolute top-3 left-3 bg-(--cv-sun)", tag)}>{photo.year}</figcaption>
            </figure>
          </li>
        ))}

        <li data-reveal style={stagger(4)} className="aspect-square border-2 border-white sm:aspect-[4/3]">
          <ThisYear href={open ? "#register" : undefined} label={`${start.getFullYear()}: still in bud. Blooms ${day}. Register now`}>
            <span className={cx("self-start bg-white", tag)}>{start.getFullYear()}</span>
            {/* Beside the year on phones, where the tile is small; bottom right from sm. */}
            <Bud className="absolute top-3 right-3 h-[34%] w-auto origin-bottom transition-[rotate] duration-300 ease-(--cv-ease-spring) group-hover/btn:rotate-[8deg] motion-reduce:transition-none sm:top-auto sm:right-4 sm:bottom-4 sm:h-[42%]" />
            <span className="relative block sm:pr-[22%]">
              <span className="cv-display block text-xl sm:text-[clamp(1.4rem,2.6vw,2.1rem)]">Still in bud.</span>
              <span className="mt-1 block text-[13px] leading-snug font-medium sm:mt-1.5 sm:text-[15px]">
                Blooms {day}.{" "}
                {open ? (
                  <span className="inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4">
                    Register Now
                    <ArrowRightIcon width={16} height={16} className={nudge.forward} />
                  </span>
                ) : null}
              </span>
            </span>
          </ThisYear>
        </li>
      </ul>
    </Band>
  );
}

/** This year's tile: a link to registration while it's open. */
function ThisYear({ href, label, children }: { href?: string; label: string; children: ReactNode }) {
  const className =
    "group/btn relative flex h-full flex-col justify-between overflow-hidden bg-(--cv-sun) p-3 text-(--cv-ink) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand) focus-visible:ring-inset sm:p-5";
  return href ? (
    <a href={href} aria-label={label} className={className}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

/** A closed bud on its stem, drawn in the page's flat, ink-outlined style. */
function Bud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true" focusable="false">
      <g stroke="var(--cv-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 116 V58" fill="none" />
        <path d="M30 92 C 14 90 6 78 8 66 C 20 68 29 78 30 92 Z" fill="var(--cv-mint)" />
        <path d="M30 60 C 12 52 12 22 30 6 C 48 22 48 52 30 60 Z" fill="var(--cv-coral)" />
        <path d="M30 60 C 22 50 22 30 30 18" fill="none" />
      </g>
    </svg>
  );
}
