import React from 'react';
import { ArrowRight2 } from 'iconsax-react';
import { Button } from '@/components/ui/button';

const sectionGridStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(38, 198, 218, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38, 198, 218, 0.08) 1px, transparent 1px)
  `,
  backgroundSize: '56px 56px',
};

const NewsletterSubscribeSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#051b32] py-16 text-white sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        // style={sectionGridStyle}
        aria-hidden
      />
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
            published.
          </p>

          <form className="mt-7 w-full rounded-2xl border border-white/10 bg-[#123253]/70 p-2 shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="h-[52px] flex-1 rounded-xl border border-white/10 bg-[#1B3B5A] px-4 font-inter text-base text-white outline-none placeholder:text-[#718BA3] focus:border-[#00C7DA]"
              />
              <Button
                type="submit"
                className="h-[52px] rounded-xl bg-primary px-6 text-base font-semibold text-white hover:bg-[#00b8cb]"
              >
                Subscribe Free
                <ArrowRight2 size={18} variant="Bold" color="#FFFFFF" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribeSection;
