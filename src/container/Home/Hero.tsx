'use client';

import React from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { NextMeetingCard } from './NextMeetingCard';
import { StatsCard } from './StatsCard';
import { UpcomingEventCard } from './UpcomingEventCard';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={`container px-4 pt-[50px] pb-[60px] mx-auto ${className || ''}`}
    >
      <div className="content-stretch flex flex-col gap-8 items-center justify-start relative size-full">
        {/* Decorative element */}
        <div className="absolute h-[23px] left-8 top-[135px] w-[248px] lg:block hidden">
          <div className="absolute inset-[-8.7%_-0.08%_-8.66%_-0.04%]">
            <ObserverImage
              src={images.heroTextDecorator}
              alt="hero-text-decorator"
              className="block max-w-none size-full"
            />
          </div>
        </div>

        {/* Mobile decorative element */}
        <div className="absolute h-[11.177px] left-1/2 -translate-x-1/2 top-[97.36px] w-[231px] lg:hidden block">
          <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
            <ObserverImage
              src={images.heroTextDecorator}
              alt="hero-text-decorator"
              className="block max-w-none size-full"
            />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="content-stretch flex flex-col gap-10 items-center lg:items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-start relative shrink-0 w-full">
            {/* Left Column - Hero Text and CTA */}
            <div className="content-stretch flex flex-col gap-8 items-center lg:items-start justify-start relative shrink-0 w-full lg:w-auto">
              <div className="content-stretch flex flex-col gap-4 items-center lg:items-start justify-start leading-[0] relative shrink-0 w-full lg:w-[499px]">
                <div className="flex flex-col font-bold justify-center relative shrink-0 text-[#001319] text-[48px] lg:text-[72px] text-center lg:text-left">
                  <p className="leading-[52px] lg:leading-[76px] whitespace-pre">
                    Inspired By
                    <br aria-hidden="true" />
                    Humanity
                  </p>
                </div>
                <div className="flex flex-col font-normal justify-center not-italic relative shrink-0 text-[16px] lg:text-[18px] text-center lg:text-left w-full lg:w-auto">
                  <p className="leading-[24px] lg:leading-[26px] font-inter text-[#546165]">
                    We strive to create positive change by empowering young
                    people to take action and lead with integrity, innovation,
                    and a commitment to service
                  </p>
                </div>
              </div>
              <Button
                onClick={() =>
                  window.open('https://forms.gle/stSuRhn9sGTUm15G8', '_blank')
                }
              >
                <p className="leading-[24px] whitespace-pre">Become A Member</p>
              </Button>
            </div>

            {/* Right Column - Event Cards */}
            <div className="lg:grid hidden grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-auto">
              <UpcomingEventCard />
              <NextMeetingCard />
            </div>
          </div>

          {/* Featured Project Card */}
          <FeaturedProjectCard />
        </div>

        <div className="grid lg:hidden grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-auto">
          <UpcomingEventCard />
          <NextMeetingCard />
        </div>

        {/* Stats Section */}
        <div className="content-stretch flex flex-col lg:flex-row gap-4 items-center justify-start relative shrink-0 w-full">
          {/* <StatsCard icon={img3} number="70+" text="Active Members" /> */}
          <StatsCard
            icon={images.heroActiveMembersImage}
            number="70+"
            text="Active Members"
          />
          <StatsCard
            icon={images.sectorsAndIndustriesIcon}
            number="10+"
            text="Sectors and industries to which our members belong"
          />
        </div>
      </div>
    </section>
  );
}
