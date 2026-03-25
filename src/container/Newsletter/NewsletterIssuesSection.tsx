'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import {
  ArrowRight2,
  CloseSquare,
  DocumentDownload,
  SearchNormal1,
} from 'iconsax-react';
import {
  NEWSLETTER_ISSUES,
  NEWSLETTER_OPEN_ISSUE_EVENT,
  type NewsletterIssue,
} from '@/data/newsletterIssues';

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
      <path
        d="M24 35h20M24 43h20M24 51h14"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
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

function FeaturedLatestVisual({
  label,
  coverImage,
  alt,
}: {
  label: string;
  coverImage?: string;
  alt: string;
}) {
  return (
    <div
      className="relative flex h-full min-h-[240px] w-full flex-col overflow-hidden bg-[#051C33] rounded-t-[18px] lg:rounded-l-[18px] lg:rounded-t-none"
      style={coverImage ? undefined : thumbGridStyle}
    >
      {!coverImage && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_68%_10%,rgba(38,198,218,0.28)_0%,transparent_64%)]" />
          <div className="absolute left-4 top-4 z-[1] inline-flex rounded-lg border border-primary/40 bg-[#06314A]/90 px-3 py-1.5">
            <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
              {label}
            </span>
          </div>
          <div className="relative z-[1] flex flex-1 items-center justify-center py-14 lg:py-10">
            <PdfThumbnailIcon />
          </div>
        </>
      )}
      {coverImage && (
        <>
          <div className="absolute left-4 top-4 z-[1] inline-flex rounded-lg border border-white/25 bg-black/50 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
              {label}
            </span>
          </div>
          <div className="relative h-full min-h-[240px] w-full flex-1">
            <Image
              src={coverImage}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 37vw, 100vw"
              priority
            />
          </div>
        </>
      )}
    </div>
  );
}

function IssueThumb({
  label,
  coverImage,
  alt,
}: {
  label: string;
  coverImage?: string;
  alt: string;
}) {
  return (
    <div
      className="relative h-[180px] w-full overflow-hidden rounded-t-[14px] bg-[#051b32]"
      style={coverImage ? undefined : thumbGridStyle}
    >
      {!coverImage && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_68%_10%,rgba(38,198,218,0.28)_0%,transparent_64%)]" />
          <div className="absolute left-4 top-4 inline-flex rounded-md border border-primary/30 bg-[#06314A]/85 px-3 py-0.5">
            <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
              {label}
            </span>
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <PdfThumbnailIcon />
          </div>
        </>
      )}
      {coverImage && (
        <>
          <div className="absolute left-4 top-4 z-[1] inline-flex rounded-md border border-white/25 bg-black/45 px-3 py-0.5 backdrop-blur-sm">
            <span className="font-inter text-xs font-semibold tracking-[0.04em] text-primary">
              {label}
            </span>
          </div>
          <Image
            src={coverImage}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </>
      )}
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

function IssueModal({
  issue,
  onClose,
}: {
  issue: NewsletterIssue;
  onClose: () => void;
}) {
  const link =
    issue.isAvailable && issue.externalLink
      ? issue.externalLink
      : issue.href;
  const canOpenLink =
    issue.isAvailable && link && link !== '#' && link.length > 1;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-start justify-center bg-[#0a1f35]/60 px-2 pb-4 pt-24 backdrop-blur-[2px] sm:px-4 sm:pb-6 sm:pt-28 lg:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
    >
      <button
        type="button"
        className="fixed inset-0 z-0 cursor-pointer"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 mx-auto flex h-[min(calc(100dvh-8.5rem),760px)] w-full max-w-[1060px] flex-col overflow-hidden rounded-[20px] border border-[#E5EDF4] bg-white shadow-[0_24px_64px_rgba(16,43,67,0.22)] sm:h-[min(calc(100dvh-10.5rem),660px)]">
        <div className="relative z-20 flex items-start justify-between gap-3 border-b border-[#E8EEF4] bg-white px-4 py-4 sm:gap-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <h2
              id="newsletter-modal-title"
              className="font-[family-name:var(--font-newsletter-serif)] text-lg font-bold leading-snug text-[#001A44] sm:text-xl"
            >
              {issue.title}
            </h2>
            <p className="mt-1 font-inter text-sm text-[#9DB2C6]">
              {issue.dateLabel}
              <span className="px-2">·</span>
              {issue.volumeIssueLabel}
              <span className="px-2">·</span>
              {issue.pages} pages
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-md transition-colors hover:border-[#9FBAD0] hover:bg-[#F4F7FA]"
            aria-label="Close"
          >
            <CloseSquare size={24}  color="#13304B" />
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-[#F2F4F7] p-0">
          <div className="h-full overflow-hidden border-y border-[#E8EEF4] bg-[#EFF1F4]">
            {issue.coverImage && issue.isAvailable ? (
              <div className="relative h-full min-h-[260px] w-full">
                <Image
                  src={issue.coverImage}
                  alt={`${issue.title} cover`}
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1280px) 1000px, 100vw"
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 py-12">
                <PdfThumbnailIcon />
                <p className="font-inter text-sm font-medium text-[#6B7F92]">
                  PDF coming soon
                </p>
              </div>
            )}
          </div>

          {issue.isAvailable && (
            <div className="border-t border-[#E8EEF4] bg-white px-4 py-3 text-center sm:px-6">
              {canOpenLink ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-[#00b1c2]"
                >
                  Open newsletter (Google Doc)
                </a>
              ) : (
                <p className="font-inter text-sm text-[#6B7F92]">
                  Add your Google Doc link in{' '}
                  <code className="rounded bg-[#F4F7FA] px-1 text-xs">
                    src/data/newsletterIssues.ts
                  </code>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-[#E8EEF4] bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-inter text-sm text-[#9DB2C6]">
              {issue.isAvailable && canOpenLink
                ? 'Read the full issue online.'
                : 'PDF coming soon'}
            </p>
            {issue.isAvailable && canOpenLink ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-inter text-sm font-bold text-white transition-colors hover:bg-[#00b1c2]"
              >
                <DocumentDownload size={18} variant="Bold" color="#FFFFFF" />
                Open newsletter
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary/35 px-4 py-2.5 font-inter text-sm font-bold text-white opacity-80"
              >
                <DocumentDownload size={18} variant="Bold" color="#FFFFFF" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const NewsletterIssuesSection = () => {
  const [activeYear, setActiveYear] = useState<'all' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);

  const openIssue = useCallback((issue: NewsletterIssue) => {
    setSelectedIssue(issue);
  }, []);

  const closeModal = useCallback(() => setSelectedIssue(null), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onOpenIssue = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (!detail?.id) return;
      const issue = NEWSLETTER_ISSUES.find(i => i.id === detail.id);
      if (issue) setSelectedIssue(issue);
    };
    window.addEventListener(NEWSLETTER_OPEN_ISSUE_EVENT, onOpenIssue);
    return () =>
      window.removeEventListener(NEWSLETTER_OPEN_ISSUE_EVENT, onOpenIssue);
  }, []);

  const filterYears = useMemo(
    () =>
      [...new Set(NEWSLETTER_ISSUES.map(issue => issue.year))].sort(
        (a, b) => b - a
      ),
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
      {isMounted &&
        selectedIssue &&
        createPortal(
          <IssueModal issue={selectedIssue} onClose={closeModal} />,
          document.body
        )}

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
                <FeaturedLatestVisual
                  label={latestIssue.volumeIssueLabel}
                  coverImage={latestIssue.coverImage}
                  alt={`${latestIssue.title} cover`}
                />
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
                    {/* {latestIssue.pages} pages */}
                  </p>
                  <p className="mt-4 max-w-[54ch] font-inter text-sm leading-relaxed text-[#5B7086]">
                    {latestIssue.excerpt}
                  </p>
                  <button
                    type="button"
                    onClick={() => openIssue(latestIssue)}
                    className="mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2 font-inter text-sm font-bold text-white transition-colors hover:bg-[#00b1c2]"
                  >
                    Read Issue
                    <ArrowRight2 size={18} variant="Bold" color="#FFFFFF" />
                  </button>
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
              className="overflow-hidden rounded-[16px] border border-[#DBEBF3] bg-white shadow-[0_5px_16px_rgba(18,58,93,0.06)] transition-all duration-300 hover:translate-y-[-10px]"
            >
              <button
                type="button"
                onClick={() => openIssue(issue)}
                className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <IssueThumb
                  label={issue.volumeIssueLabel}
                  coverImage={issue.coverImage}
                  alt={`${issue.title} cover`}
                />
                <div className="px-5 py-4">
                  <h4 className="font-inter text-[1rem] font-semibold leading-[1.18] text-[#001A44]">
                    {issue.title}
                  </h4>
                  <p className="mt-1 font-inter text-xs text-[#9DB2C6]">
                    {issue.dateLabel}
                    <span className="px-2">·</span>
                    {/* {issue.pages} pages */}
                  </p>
                  <p className="mt-3 line-clamp-2 font-inter text-[14px] leading-[1.45] text-[#5B7086]">
                    {issue.excerpt}
                  </p>
                </div>
              </button>
              <div className="border-t border-[#EDF2F7] px-5 py-2">
                <button
                  type="button"
                  onClick={() => openIssue(issue)}
                  className="inline-flex items-center gap-2 font-inter text-[14px] font-semibold uppercase tracking-[0.03em] text-primary"
                >
                  Read
                  <ArrowRight2 size={18} variant="Bold" color="#00C7DA" />
                </button>
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
