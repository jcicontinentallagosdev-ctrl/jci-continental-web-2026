import Image from "next/image";
import { ArrowRightIcon } from "../_components/icons";
import { Band, buttonClasses, nudge, stagger } from "../_components/ui";
import { convention } from "../_lib/config";
import { faqs } from "../_lib/content";
import { formatDate } from "../_lib/format";

export function Faq({ guestPrice }: { guestPrice: string }) {
  return (
    <Band aria-labelledby="cv-faq" className="py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div data-reveal className="space-y-4">
          <h2 id="cv-faq" className="cv-display text-[clamp(2.25rem,6vw,4.5rem)] text-(--cv-ink)">
            Questions?
          </h2>
          <p className="text-lg leading-8 text-(--cv-muted)">
            Can&apos;t find your answer? Write to{" "}
            <a className="font-bold text-(--cv-brand-strong) underline underline-offset-2" href={`mailto:${convention.contact.email}`}>
              {convention.contact.email}
            </a>
            {convention.contact.phone ? ` or call ${convention.contact.phone}` : ""}.
          </p>
        </div>
        <div data-reveal style={stagger(1)} className="border-2 border-(--cv-ink) bg-white">
          {faqs(guestPrice).map((item) => (
            <details key={item.q} className="cv-faq group border-b-2 border-(--cv-ink) last:border-b-0">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-sans text-lg font-bold text-(--cv-ink) outline-none transition-colors duration-150 hover:bg-(--cv-surface) focus-visible:bg-(--cv-surface) [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center border-2 border-(--cv-ink) text-xl leading-none transition-[rotate,background-color] duration-200 ease-(--cv-ease-out) group-open:rotate-45 group-open:bg-(--cv-sun) motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="cv-faq-answer px-5 pb-5 leading-7 text-(--cv-text)">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}

export function Closing({ open }: { open: boolean }) {
  const days = Math.ceil((Date.parse(convention.startsAt) - Date.now()) / 86_400_000);
  return (
    <Band aria-labelledby="cv-closing" className="overflow-hidden border-t-2 border-(--cv-ink) bg-(--cv-sun) pt-16 lg:pt-20" inner="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div data-reveal className="pb-4 lg:pb-20">
        {days > 0 && (
          <p className="font-sans text-sm font-bold tracking-[0.12em] text-(--cv-ink) uppercase">
            {days === 1 ? "Tomorrow" : `${days} days to go`}
          </p>
        )}
        <h2 id="cv-closing" className="cv-display mt-3 max-w-5xl text-[clamp(2.5rem,6.5vw,5rem)] text-balance text-(--cv-ink)">
          See you on {formatDate(convention.startsAt).replace(/ \d{4}$/, "")}.
        </h2>
        {open && (
          <a href="#register" className={buttonClasses("primary", "lg", "mt-8 pr-3")}>
            Secure your ticket
            <span className="flex size-8 items-center justify-center border-2 border-white bg-(--cv-brand) text-(--cv-ink)">
              <ArrowRightIcon width={18} height={18} className={nudge.forward} />
            </span>
          </a>
        )}
      </div>
      <Image
        src="/convention/art/closing-celebration.webp"
        alt=""
        width={1200}
        height={800}
        sizes="(min-width: 1024px) 560px, 100vw"
        data-reveal="bloom"
        style={stagger(1)}
        className="mx-auto h-auto w-full max-w-[560px]"
      />
    </Band>
  );
}
