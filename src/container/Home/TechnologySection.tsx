import React from 'react';

import { Button } from '@/components/ui/button';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

interface TechnologySectionProps {
  className?: string;
}

export function TechnologySection({ className }: TechnologySectionProps) {
  return (
    <section className={`bg-[#f3fcff] py-[100px] ${className || ''}`}>
      <div className="container px-4 mx-auto">
        <div className="flex gap-[100px] items-center">
          {/* Left Column - Content */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex flex-col gap-4 relative">
              {/* Decorative element */}
              <div className="absolute h-3 left-[107px] top-[30.5px] w-[248px]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="text-decorator"
                  className="block max-w-none size-full"
                />
              </div>

              {/* Heading */}
              <div className="font-bold relative z-20 text-[#001319] text-[36px] leading-[40px]">
                <p>
                  We Are Technology-Driven,
                  <br />
                  Disruptive, and Borderless
                </p>
              </div>

              {/* Description */}
              <div className="font-inter font-normal text-[#546165] text-[18px] leading-[26px] max-w-full">
                <p>
                  We strive to create positive change by empowering young people
                  to take action and lead with integrity, innovation, and a
                  commitment to service
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-fit">
              <p>Become A Member</p>
            </Button>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center">
            <div className="rotate-[180deg] rounded-[16px] overflow-hidden scale-y-[-100%]">
              <ObserverImage
                src={images.technologySectionImage}
                alt="technology-section-image"
                className="h-[458px] w-[589px] rounded-[16px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
