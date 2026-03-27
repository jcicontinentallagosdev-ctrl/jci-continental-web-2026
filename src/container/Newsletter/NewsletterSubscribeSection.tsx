import React from 'react';
import { ArrowRight2 } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { SUBSTACK_SUBSCRIBE_URL } from '@/data/newsletterIssues';

const NewsletterSubscribeSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#051b32] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_50%,rgba(38,198,218,0.22)_0%,transparent_62%)]"
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[740px] flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-newsletter-serif)] text-4xl font-bold leading-tight text-white ">
            Never Miss an Issue
          </h2>
          <p className="mt-2 font-inter text-[17px] text-[#8FA7BC]">
            Get each new newsletter delivered to your inbox the moment it&apos;s
            published. You&apos;ll finish subscribing on Substack.
          </p>

          <div className="mt-7 w-full rounded-2xl border border-white/10 bg-[#123253]/70 p-2 shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <Button
              asChild
              className="h-[52px] w-full rounded-xl bg-primary px-6 text-base font-semibold text-white hover:bg-[#00b8cb]"
            >
              <a
                href={SUBSTACK_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe free on Substack, opens in new tab"
              >
                Subscribe Free
                <ArrowRight2 size={18} variant="Bold" color="#FFFFFF" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribeSection;
