import React from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { NextMeetingCard } from './NextMeetingCard';
import { StatsCard } from './StatsCard';
import { UpcomingEventCard } from './UpcomingEventCard';

// Image assets from Figma
const imgVector5 =
  'http://localhost:3845/assets/d1004f619f2a7814fe1a38433ccacce5bfc31a28.svg';
const img3 =
  'http://localhost:3845/assets/c1eb7fc5c85fabe9b81e1ad9c91ceb856c69b0b2.svg';
const imgImage4Colorized =
  'http://localhost:3845/assets/f8f68b795f64b611216dbff467332b672aa30922.png';

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
        <div className="absolute h-[23px] left-8 top-[135px] w-[248px]">
          <div className="absolute inset-[-8.7%_-0.08%_-8.66%_-0.04%]">
            <ObserverImage
              src={images.heroTextDecorator}
              alt="hero-text-decorator"
              className="block max-w-none size-full"
            />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-10 items-start justify-start relative shrink-0 w-full">
            {/* Left Column - Hero Text and CTA */}
            <div className="content-stretch flex flex-col gap-8 items-start justify-start relative shrink-0">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start leading-[0] relative shrink-0 w-[499px]">
                <div className="flex flex-col font-bold justify-center relative shrink-0 text-[#001319] text-[72px] text-nowrap">
                  <p className="leading-[76px] whitespace-pre">
                    Inspired By
                    <br aria-hidden="true" />
                    Humanity
                  </p>
                </div>
                <div
                  className="flex flex-col font-normal justify-center min-w-full not-italic relative shrink-0 text-[18px]"
                  style={{ width: 'min-content' }}
                >
                  <p className="leading-[26px] font-inter text-[#546165]">
                    We strive to create positive change by empowering young
                    people to take action and lead with integrity, innovation,
                    and a commitment to service
                  </p>
                </div>
              </div>
              <Button>
                <p className="leading-[24px] whitespace-pre">Become A Member</p>
              </Button>
            </div>

            {/* Right Column - Event Cards */}
            <div className="grid grid-cols-2 gap-4">
              <UpcomingEventCard />
              <NextMeetingCard />
            </div>
          </div>

          {/* Featured Project Card */}
          <FeaturedProjectCard />
        </div>

        {/* Stats Section */}
        <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0 w-full">
          {/* <StatsCard icon={img3} number="70+" text="Active Members" /> */}
          <StatsCard
            icon={images.sectorsAndIndustriesIcon}
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
