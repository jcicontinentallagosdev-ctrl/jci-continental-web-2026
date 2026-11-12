import Image from "next/image";
import { SponsorPanel } from "../_components/sponsor-panel";
import { Band, cx } from "../_components/ui";
import { convention } from "../_lib/config";

/** Sponsor logos when there are any, and always the invitation (with its enquiry form) to become one. */
export function Sponsors() {
  const headline = convention.sponsors.filter((s) => s.tier === "headline");
  const partners = convention.sponsors.filter((s) => s.tier === "partner");

  return (
    <Band aria-labelledby="cv-sponsors" className="py-16 lg:py-24">
      <h2 id="cv-sponsors" data-reveal className="cv-display text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
        Sponsors &amp; partners
      </h2>

      {convention.sponsors.length > 0 && (
        // The list draws the top and left edges, each tile its right and bottom, so lines never double up.
        <ul className="mt-10 grid grid-cols-2 border-t-2 border-l-2 border-(--cv-ink) sm:grid-cols-3 lg:grid-cols-5">
          {[...headline, ...partners].map((sponsor) => {
            const isHeadline = sponsor.tier === "headline";
            const logo = (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={isHeadline ? 320 : 200}
                height={isHeadline ? 120 : 80}
                unoptimized={sponsor.logo.endsWith(".svg")}
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            );
            return (
              <li
                key={sponsor.name}
                className={cx(
                  "flex flex-col items-center justify-center gap-3 border-r-2 border-b-2 border-(--cv-ink) bg-white p-6",
                  isHeadline ? "col-span-2 min-h-44 sm:col-span-3 lg:col-span-2 lg:row-span-2" : "min-h-32",
                )}
              >
                {isHeadline && (
                  <span className="bg-(--cv-sun) px-2 py-0.5 font-sans text-xs font-bold tracking-[0.08em] text-(--cv-ink) uppercase">
                    Headline sponsor
                  </span>
                )}
                <div className={cx("flex w-full items-center justify-center", isHeadline ? "h-24" : "h-16")}>
                  {sponsor.url ? (
                    <a href={sponsor.url} target="_blank" rel="noreferrer" className="flex h-full items-center justify-center">
                      {logo}
                    </a>
                  ) : (
                    logo
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div data-reveal>
        <SponsorPanel
          title={convention.sponsors.length > 0 ? "Join them" : "Become a sponsor"}
          pitch={convention.sponsorship.pitch}
          interests={convention.sponsorship.interests}
          budgets={convention.sponsorship.budgets}
          responseTime={convention.sponsorship.responseTime}
        />
      </div>
    </Band>
  );
}
