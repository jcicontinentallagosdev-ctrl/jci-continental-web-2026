'use client';

import React from 'react';
import Image from 'next/image';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';
import { CalendarTick, Location } from 'iconsax-react';

const WhatWeDoHero = () => {
  return (
    <div className="bg-[#03212a] relative w-full lg:h-[924px] h-[489px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute lg:block hidden bg-center bg-cover bg-no-repeat h-[924px] left-0 top-[100px] w-full"
        style={{
          backgroundImage: `url(${images.whatWeDoHeroFeatureImage.src})`,
          width: '100%',
          height: '924px',
          transform: 'translateY(-102.89px)',
        }}
      />
      <div
        className="absolute lg:hidden block bg-center bg-cover bg-no-repeat h-[924px] left-0 top-[100px] w-full"
        style={{
          backgroundImage: `url(${images.whatWeDoHeroFeatureImage.src})`,
          width: '100%',
          height: '441px',
          transform: 'translateY(-102.89px)',
        }}
      />

      {/* Overlay Content */}
      <div className="absolute bg-gradient-to-b bottom-0 box-border content-stretch from-[#A9C3CB00] lg:from-[#A9C3CB00] left-0 py-6 lg:py-[60px] to-[#03212a] to-[90.356%] w-full">
        <div className="container px-4 lg:px-8 mx-auto flex flex-col gap-8 items-center lg:items-start justify-center">
          <div className="content-stretch flex flex-col gap-8 items-center lg:items-start justify-start relative shrink-0 w-full">
            {/* What We Do Badge */}
            <div className="bg-[rgba(254,255,255,0.2)] lg:backdrop-blur-[0px] backdrop-blur-[20px] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[20px] shrink-0">
              <div className="flex flex-col font-inter font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f3fcff] text-sm lg:text-[18px] text-nowrap">
                <p className="leading-[26px] whitespace-pre">Upcoming Event</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="content-stretch flex flex-col gap-3 lg:text-left text-center items-center lg:items-start justify-start leading-[0] relative shrink-0 w-full">
              {/* Main Heading */}
              <div className="flex flex-col font-sans font-bold justify-center min-w-full relative shrink-0 text-[#feffff] text-xl lg:text-[72px]">
                <p className="lg:leading-[76px] leading-6">
                  JCI Africa and Middle East Conference
                </p>
              </div>

              {/* Event Details */}
              <div className="content-stretch flex gap-4 items-center justify-center lg:justify-start relative shrink-0">
                {/* Date */}
                <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0">
                  <CalendarTick size="18" color="#0398C8" variant="Bold" />

                  <div className="flex flex-col font-inter font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#feffff] text-sm lg:text-[16px] text-nowrap">
                    <p className="leading-[24px] whitespace-pre">
                      22nd-25th of may, 2026
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0">
                  <Location size="18" color="#0398C8" variant="Bold" />
                  <div className="flex flex-col font-inter font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#feffff] text-sm lg:text-[16px] text-nowrap">
                    <p className="leading-[24px] whitespace-pre">
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className="min-w-[211px]"
            onClick={() =>
              window.open('https://forms.gle/stSuRhn9sGTUm15G8', '_blank')
            }
          >
            <p className="leading-[24px] whitespace-pre">Get Involved</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoHero;
