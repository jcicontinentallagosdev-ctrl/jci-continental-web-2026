import React from 'react';
import Link from 'next/link';
import { ArrowRight2 } from 'iconsax-react';

const LATEST_ISSUE_HREF = '#';

const gridStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(38, 198, 218, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38, 198, 218, 0.07) 1px, transparent 1px)
  `,
  backgroundSize: '48px 48px',
};

function PdfThumbnailIcon() {
  return (
    <svg
      width="72"
      height="88"
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#26C6DA]"
      aria-hidden
    >
      <path
        d="M12 4h32l16 16v60a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M44 4v12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="36"
        y="58"
        textAnchor="middle"
        fill="#26C6DA"
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        PDF
      </text>
    </svg>
  );
}

const NewsletterHero = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#051020] text-white"
      aria-labelledby="newsletter-hero-heading"
    >
      {/* Radial glow + grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_100%_-5%,rgba(38,198,218,0.28)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0" style={gridStyle} />

      <div className="relative z-[1] container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-[4.5rem]">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Left column */}
          <div className="flex max-w-xl flex-col gap-8 lg:max-w-none lg:flex-1">
            <div className="inline-flex w-fit items-center rounded-full border border-[#26C6DA]/45 bg-[#26C6DA]/10 px-4 py-1">
              <span className="font-inter text-xs font-semibold tracking-[0.12em] text-[#26C6DA]">
                • STAY INFORMED
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h1
                id="newsletter-hero-heading"
                className="font-[family-name:var(--font-newsletter-serif)] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] xl:text-[4rem]"
              >
                <span className="block">Our Chapter</span>
                <span className="block font-bold italic text-[#26C6DA]">
                  Newsletters
                </span>
              </h1>
              <p className="max-w-[34rem] font-inter text-base leading-relaxed text-[#94A3B8]">
                News, stories, and updates from JCI Continental Lagos — direct
                from our community to yours. Stay connected with the people and
                initiatives driving change.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-[family-name:var(--font-newsletter-serif)] text-4xl font-bold text-white sm:text-4xl">
                6+
              </p>
              <p className="font-inter text-xs text-[#94A3B8]">
                Issues Published
              </p>
            </div>
          </div>

          {/* Right column — latest issue card */}
          <div className="mx-auto w-full max-w-[340px] shrink-0 lg:mx-0 lg:max-w-[360px]">
            <div
              className="rounded-2xl border border-[#26C6DA]/20 bg-[rgba(10,28,48,0.55)] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:scale-102 transition-all duration-300"
              style={{
                boxShadow:
                  '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="mb-5 inline-flex items-center rounded-full bg-[#FFD54F] px-3 py-1">
                <span className="font-inter text-[10px] font-bold tracking-wide text-black">
                  ✦ LATEST ISSUE
                </span>
              </div>

              <div className="mb-5 flex min-h-[140px] items-center justify-center rounded-xl bg-[#0a1f35] py-8">
                <PdfThumbnailIcon />
              </div>

              <h2 className="font-inter text-sm font-bold leading-snug text-white">
                The CL Dispatch — Q2 2025
              </h2>
              <p className="mt-1 font-inter text-xs text-[#94A3B8] font-extralight">
                June 2025 · Vol. 3 · Issue 2
              </p>

              <Link
                href={LATEST_ISSUE_HREF}
                className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 transition-opacity hover:opacity-90"
              >
                <span className="font-inter text-xs font-semibold uppercase tracking-wider text-[#26C6DA]">
                  Read now
                </span>
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-[#7ea8ad18] text-white shadow-md"
                  aria-hidden
                >
                  <ArrowRight2 size={20} variant="Bold" color="#FFFFFF" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterHero;
