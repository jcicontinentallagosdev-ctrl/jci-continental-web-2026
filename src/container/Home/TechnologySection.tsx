'use client';

import React from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

interface TechnologySectionProps {
  className?: string;
}

export function TechnologySection({ className }: TechnologySectionProps) {
  
  return (
    <section
      className={`bg-[#f3fcff] py-[60px] lg:py-[100px] ${className || ''}`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
          {/* Left Column - Content */}
          <div className="flex-1 flex flex-col gap-10 items-center lg:items-start">
            <div className="flex flex-col gap-4 relative items-center lg:items-start">
              {/* Desktop decorative element */}
              <div className="absolute h-3 left-[107px] top-[30.5px] w-[248px] lg:block hidden">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="text-decorator"
                  className="block max-w-none size-full"
                />
              </div>

              {/* Mobile decorative element */}
              <div className="absolute h-[7.887px] left-1/2 -translate-x-1/2 top-[22px] w-[163px] lg:hidden block">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="text-decorator"
                  className="block max-w-none size-full"
                />
              </div>

              {/* Heading */}
              <div className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] text-center lg:text-left">
                <p>
                  We Are Technology-Driven,
                  <br />
                  Disruptive, and Borderless
                </p>
              </div>

              {/* Description */}
              <div className="font-inter font-normal text-[#546165] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[26px] max-w-full text-center lg:text-left">
                <p>
                  We strive to create positive change by empowering young people
                  to take action and lead with integrity, innovation, and a
                  commitment to service
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {/* <Button
              className="w-fit"
              onClick={() => openMembershipModal(true)}
            >
              <p>Become A Member</p>
            </Button> */}
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center w-full lg:w-auto">
            <div className="rotate-[180deg] rounded-[16px] overflow-hidden scale-y-[-100%] w-full lg:w-auto">
              <ObserverImage
                src={images.technologySectionImage}
                alt="technology-section-image"
                className="h-[328px] lg:h-[458px] w-full lg:w-[589px] rounded-[16px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
