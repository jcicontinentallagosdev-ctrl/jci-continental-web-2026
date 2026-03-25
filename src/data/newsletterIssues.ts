export type NewsletterIssue = {
  id: string;
  title: string;
  dateLabel: string;
  year: number;
  pages: number;
  /** Shown on cards and in modal header (e.g. Issue 001 — January 2026) */
  volumeIssueLabel: string;
  excerpt: string;
  /** Legacy; prefer externalLink for available issues */
  href: string;
  isAvailable: boolean;
  coverImage?: string;
  /** Google Doc or PDF URL when available */
  externalLink?: string;
};

/** Placeholder until real Google Doc links are provided */
export const NEWSLETTER_EXTERNAL_LINK_PLACEHOLDER = '#';

/** Dispatched with `detail: { id: string }` to open the issue modal from other components */
export const NEWSLETTER_OPEN_ISSUE_EVENT = 'newsletter:openIssue';

/**
 * Newest first. Timeline starts at 2025; 2025 entries are placeholders (PDF not available).
 */
export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  { 
    id: 'issue-002-2026-02',
    title: 'The Continental — February 2026',
    dateLabel: 'February 2026',
    year: 2026,
    pages: 8,
    volumeIssueLabel: 'Issue 002 — February 2026',
    excerpt:
      'JCI Continental Lagos’ monthly newsletter — stories, events, and updates from our chapter.',
    href: NEWSLETTER_EXTERNAL_LINK_PLACEHOLDER,
    isAvailable: true,
    coverImage: '/assets/newletter/febuary2026.png',
    externalLink: 'https://drive.google.com/file/d/1VfpFqDEXq_Qf6DDesxZdo8rKgziI5rhq/view?usp=sharing',
  },
  {
    id: 'issue-001-2026-01',
    title: 'The Continental — January 2026',
    dateLabel: 'January 2026',
    year: 2026,
    pages: 8,
    volumeIssueLabel: 'Issue 001 — January 2026',
    excerpt:
      'JCI Continental Lagos’ monthly newsletter — stories, events, and updates from our chapter.',
    href: NEWSLETTER_EXTERNAL_LINK_PLACEHOLDER,
    isAvailable: true,
    coverImage: '/assets/newletter/january2026.png',
    externalLink: 'https://drive.google.com/file/d/1dpvx5Sc7REz0-yCcVdvnyBaFQcSCyse2/view?usp=sharing',
  },
  // {
  //   id: 'q4-2025',
  //   title: 'The CL Dispatch — Q4 2025',
  //   dateLabel: 'December 2025',
  //   year: 2025,
  //   pages: 8,
  //   volumeIssueLabel: 'Vol. 1 · Issue 4',
  //   excerpt:
  //     'Year-end highlights and community impact — PDF coming soon.',
  //   href: '#',
  //   isAvailable: false,
  // },
  // {
  //   id: 'q3-2025',
  //   title: 'The CL Dispatch — Q3 2025',
  //   dateLabel: 'September 2025',
  //   year: 2025,
  //   pages: 8,
  //   volumeIssueLabel: 'Vol. 1 · Issue 3',
  //   excerpt:
  //     'Quarterly stories and chapter updates — PDF coming soon.',
  //   href: '#',
  //   isAvailable: false,
  // },
  // {
  //   id: 'q2-2025',
  //   title: 'The CL Dispatch — Q2 2025',
  //   dateLabel: 'June 2025',
  //   year: 2025,
  //   pages: 8,
  //   volumeIssueLabel: 'Vol. 1 · Issue 2',
  //   excerpt:
  //     'Youth leadership, membership spotlight, and upcoming events — PDF coming soon.',
  //   href: '#',
  //   isAvailable: false,
  // },
  // {
  //   id: 'q1-2025',
  //   title: 'The CL Dispatch — Q1 2025',
  //   dateLabel: 'March 2025',
  //   year: 2025,
  //   pages: 6,
  //   volumeIssueLabel: 'Vol. 1 · Issue 1',
  //   excerpt:
  //     'New year kickoff and chapter priorities — PDF coming soon.',
  //   href: '#',
  //   isAvailable: false,
  // },
];

export const LATEST_NEWSLETTER_ISSUE = NEWSLETTER_ISSUES[0];
