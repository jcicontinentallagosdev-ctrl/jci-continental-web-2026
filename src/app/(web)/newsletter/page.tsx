import type { Metadata } from 'next';
import NewsletterHero from '@/container/Newsletter/NewsletterHero';
import NewsletterIssuesSection from '@/container/Newsletter/NewsletterIssuesSection';
import NewsletterSubscribeSection from '@/container/Newsletter/NewsletterSubscribeSection';

export const metadata: Metadata = {
  title: 'Newsletters | JCI Continental Lagos',
  description:
    'News, stories, and updates from JCI Continental Lagos — stay connected with our chapter newsletters.',
};

export default function NewsletterPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <NewsletterHero />
      <NewsletterIssuesSection />
      <NewsletterSubscribeSection />
    </main>
  );
}
