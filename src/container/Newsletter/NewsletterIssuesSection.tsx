'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight2, SearchNormal1 } from 'iconsax-react';

type NewsletterIssue = {
  id: string;
  title: string;
  dateLabel: string;
  year: number;
  pages: number;
  volumeIssueLabel: string;
  excerpt: string;
  href: string;
};

const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: 'q2-2025',
    title: 'The CL Dispatch — Q2 2025',
    dateLabel: 'June 2025',
    year: 2025,
    pages: 8,
    volumeIssueLabel: 'Vol. 3 · Issue 2',
    excerpt:
      'Youth leadership summit recap, membership spotlight, and all upcoming chapter events for the quarter ahead.',
    href: '#',
  },
  {
    id: 'q1-2025',
    title: 'The CL Dispatch — Q1 2025',
    dateLabel: 'March 2025',
    year: 2025,
    pages: 6,
    volumeIssueLabel: 'Vol. 3 · Issue 1',
    excerpt:
      'New year kickoff, JCI World Congress preview, and profiles of our newest active members.',
    href: '#',
  },
  {
    id: 'q4-2024',
    title: 'The CL Dispatch — Q4 2024',
    dateLabel: 'December 2024',
    year: 2024,
    pages: 12,
    volumeIssueLabel: 'Vol. 2 · Issue 4',
    excerpt:
      'Year in review: biggest milestones, community impact report, and a message from the chapter president.',
    href: '#',
  },
  {
    id: 'q3-2024',
    title: 'The CL Dispatch — Q3 2024',
    dateLabel: 'September 2024',
    year: 2024,
    pages: 8,
    volumeIssueLabel: 'Vol. 2 · Issue 3',
    excerpt:
      'SDG Action Week highlights, new project launches, and member achievements from across our chapters.',
    href: '#',
  },
  {
    id: 'q2-2024',
    title: 'The CL Dispatch — Q2 2024',
    dateLabel: 'June 2024',
    year: 2024,
    pages: 8,
    volumeIssueLabel: 'Vol. 2 · Issue 2',
    excerpt:
      'National conference coverage, training workshop roundup, and spotlights on chapter-led innovation.',
    href: '#',
  },
  {
    id: 'inaugural-2023',
    title: 'Inaugural Issue',
    dateLabel: 'January 2023',
    year: 2023,
    pages: 4,
    volumeIssueLabel: 'Vol. 1 · Issue 1',
    excerpt:
      "Welcome to JCI CL's very first newsletter — introducing our mission, leadership team, and priorities.",
    href: '#',
  },
];

const thumbGridStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(38, 198, 218, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38, 198, 218, 0.08) 1px, transparent 1px)
  `,
  backgroundSize: '58px 58px',
};

function PdfThumbnailIcon() {
  return (
    <svg
      width="64"
      height="78"
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-[#26C6DA]"
    >
      <path
        d="M12 4h32l16 16v60a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <path
        d="M44 4v12h12"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 35h20M24 43h20M24 51h14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      <text
        x="36"
        y="69"
        textAnchor="middle"
        fill="#00C7DA"
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

/** Layered PDF graphic — featured latest-issue card only */
function FeaturedDoublePdfIcon() {
  const teal = '#00C7DA';
  return (
    <svg
      width="220"
      height="150"
      viewBox="0 0 88 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-[#26C6DA]"
    >
      <g opacity="0.22" transform="translate(14, 6)">
        <path
          d="M10 6h28l14 14v54a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path
          d="M38 6v11h11"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          d="M8 4h32l16 16v60a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <path
          d="M40 4v12h12"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="16"
          y="14"
          width="12"
          height="14"
          rx="1.5"
          fill={teal}
          fillOpacity="0.2"
          stroke={teal}
          strokeWidth="1"
        />
        <path
          d="M22 18h4M22 21h4"
          stroke={teal}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M22 36h36M22 44h36M22 52h28"
          stroke="currentColor"
          strokeOpacity="0.38"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="40"
          y="78"
          textAnchor="middle"
          fill={teal}
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          PDF
        </text>
      </g>
    </svg>
  );
}

function FeaturedLatestVisual({ label }: { label: string }) {
  return (
    <div
      className="relative flex h-full min-h-[240px] w-full flex-col bg-[#051C33] rounded-t-[18px] lg:rounded-l-[18px] lg:rounded-t-none"
      style={thumbGridStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_68%_10%,rgba(38,198,218,0.28)_0%,transparent_64%)]" />
      <div className="absolute left-4 top-4 z-[1] inline-flex rounded-lg border border-primary/40 bg-[#06314A]/90 px-3 py-1.5">
        <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
          {label}
        </span>
      </div>
      <div className="relative z-[1] flex flex-1 items-center justify-center py-14 lg:py-10">
        <FeaturedDoublePdfIcon />
      </div>
    </div>
  );
}

function IssueThumb({ label }: { label: string }) {
  return (
    <div
      className="relative h-[180px] w-full overflow-hidden rounded-t-[14px] bg-[#051b32]"
      style={thumbGridStyle}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_68%_10%,rgba(38,198,218,0.28)_0%,transparent_64%)]" />
      <div className="absolute left-4 top-4 inline-flex rounded-md border border-primary/30 bg-[#06314A]/85 px-3 py-0.5">
        <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <PdfThumbnailIcon />
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-0.5 font-inter text-sm font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-[#DFE9F1] bg-white text-[#6B7F92] hover:border-[#9FBAD0] hover:text-[#13304B]'
      }`}
    >
      {label}
    </button>
  );
}

const NewsletterIssuesSection = () => {
  const [activeYear, setActiveYear] = useState<'all' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterYears = useMemo(
    () =>
      [...new Set(NEWSLETTER_ISSUES.map(issue => issue.year))].sort((a, b) => b - a),
    []
  );

  const filteredIssues = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return NEWSLETTER_ISSUES.filter(issue => {
      const matchesYear = activeYear === 'all' || issue.year === activeYear;
      if (!matchesYear) return false;

      if (!query) return true;

      const haystack =
        `${issue.title} ${issue.dateLabel} ${issue.volumeIssueLabel} ${issue.excerpt}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [activeYear, searchQuery]);

  const latestIssue = NEWSLETTER_ISSUES[0];
  const showFeaturedLatest =
    activeYear === 'all' && searchQuery.trim() === '';

  return (
    <section className="relative z-10 bg-white">
      <div className="sticky top-[77px] z-30 border-b border-[#EEF3F8] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:top-[100px] shadow-[0_8px_24px_rgba(16,43,67,0.05)]">
        <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 font-inter text-xs font-semibold uppercase tracking-[0.12em] text-[#9AAEC0]">
                Filter
              </span>
              <FilterChip
                label="All Issues"
                active={activeYear === 'all'}
                onClick={() => setActiveYear('all')}
              />
              {filterYears.map(year => (
                <FilterChip
                  key={year}
                  label={String(year)}
                  active={activeYear === year}
                  onClick={() => setActiveYear(year)}
                />
              ))}
            </div>

            <label className="relative block w-full lg:w-[280px]">
              <SearchNormal1
                size={16}
                color="#9AAEC0"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search issues..."
                className="h-11 w-full rounded-full border border-[#EEF3F8] bg-[#F9FBFE] pl-10 pr-4 font-inter text-sm text-[#13304B] outline-none transition-colors placeholder:text-[#A9B8C6] focus:border-primary"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        {showFeaturedLatest && (
          <>
            <div className="mb-5">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Latest Issue
              </p>
            </div>

            <article className="overflow-hidden rounded-[18px] border border-[#EDF2F7] bg-white shadow-[0_8px_24px_rgba(16,43,67,0.08)] transition-all duration-300 hover:translate-y-[-10px]">
              <div className="grid lg:grid-cols-[minmax(0,37%)_1fr] lg:items-stretch">
                <FeaturedLatestVisual label={latestIssue.volumeIssueLabel} />
                <div className="flex flex-col justify-center bg-white px-6 py-10 lg:rounded-r-[18px] lg:px-10">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#E4C502] bg-[#f7eecaa3] px-3 py-1">
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-[#E4C502]"
                      aria-hidden
                    />
                    <span className="font-inter text-xs font-bold uppercase tracking-[0.08em] text-[#807434]">
                      Latest Issue
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-newsletter-serif)] text-[2rem] font-bold leading-[1.15] text-[#001A44]">
                    {latestIssue.title}
                  </h2>
                  <p className="mt-2 font-inter text-sm text-[#9DB2C6]">
                    {latestIssue.dateLabel}
                    <span className="px-2">·</span>
                    {latestIssue.volumeIssueLabel}
                    <span className="px-2">·</span>
                    {latestIssue.pages} pages
                  </p>
                  <p className="mt-4 max-w-[54ch] font-inter text-sm leading-relaxed text-[#5B7086]">
                    {latestIssue.excerpt}
                  </p>
                  <Link
                    href={latestIssue.href}
                    className="mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2 font-inter text-sm font-bold text-white transition-colors hover:bg-[#00b1c2]"
                  >
                    Read Issue
                    <ArrowRight2 size={18} variant="Bold" color="#FFFFFF" />
                  </Link>
                </div>
              </div>
            </article>
          </>
        )}

        <div
          className={
            showFeaturedLatest
              ? 'mt-12 flex items-end justify-between gap-4'
              : 'mt-0 flex items-end justify-between gap-4'
          }
        >
          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Archive
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-newsletter-serif)] text-3xl font-bold leading-none text-[#001A44]">
              All Issues
            </h3>
          </div>
          <p className="font-inter text-lg text-[#9DB2C6]">
            {filteredIssues.length} issues
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredIssues.map(issue => (
            <article
              key={issue.id}
              className="overflow-hidden rounded-[16px] border border-[#DBEBF3] bg-white shadow-[0_5px_16px_rgba(18,58,93,0.06)] hover:translate-y-[-10px] transition-all duration-300"
            >
              <IssueThumb label={issue.volumeIssueLabel} />
              <div className="px-5 py-4">
                <h4 className="font-inter text-[1rem] font-semibold leading-[1.18] text-[#001A44]">
                  {issue.title}
                </h4>
                <p className="mt-1 font-inter text-xs text-[#9DB2C6]">
                  {issue.dateLabel}
                  <span className="px-2">·</span>
                  {issue.pages} pages
                </p>
                <p className="mt-3 line-clamp-2 font-inter text-[14px] leading-[1.45] text-[#5B7086]">
                  {issue.excerpt}
                </p>
              </div>
              <div className="border-t border-[#EDF2F7] px-5 py-2">
                <Link
                  href={issue.href}
                  className="inline-flex items-center gap-2 font-inter text-[14px] font-semibold uppercase tracking-[0.03em] text-primary"
                >
                  Read
                  <ArrowRight2 size={18} variant="Bold" color="#00C7DA" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-[#D3E4EF] bg-[#FAFDFF] p-10 text-center">
            <p className="font-inter text-lg text-[#6B7F92]">
              No issues found for this filter. Try another year or search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterIssuesSection;
