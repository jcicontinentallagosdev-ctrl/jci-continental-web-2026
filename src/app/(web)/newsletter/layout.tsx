import React from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-newsletter-serif',
  display: 'swap',
});

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={playfair.variable}>{children}</div>;
}
