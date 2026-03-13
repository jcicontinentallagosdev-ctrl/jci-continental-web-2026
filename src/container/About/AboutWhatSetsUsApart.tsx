'use client';

import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';
import { useMembershipModal } from '@/context/membership-modal-context';

const AboutWhatSetsUsApart = () => {
  const { setOpen: openMembershipModal } = useMembershipModal();

  return (
    <div className="bg-[#fcf9ec] relative w-full py-[60px] lg:py-[100px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[759px] left-[-43px] opacity-30 top-[-50px] w-[1525px]"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
        }}
      />

      {/* Main Content */}
      <div className="content-stretch container mx-auto flex flex-col gap-14 lg:gap-[60px] items-center justify-start px-6 lg:px-8 max-w-[1440px] relative">
        <div className="content-stretch flex flex-col gap-8 lg:gap-[100px] items-center lg:items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-between relative shrink-0 w-full">
            {/* Text Content */}
            <div className="content-stretch flex flex-col gap-10 items-center lg:items-start justify-start relative shrink-0 w-full lg:w-[511px]">
              <div className="absolute h-3 left-[136px] lg:left-[3px] top-[23px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="text-decorator"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-4 items-center lg:items-start justify-start leading-[0] relative shrink-0 w-full text-center lg:text-left">
                <div className="flex flex-col font-sans font-bold justify-center relative shrink-0 text-[#001319] text-[24px] lg:text-[36px] text-nowrap">
                  <p className="leading-[28px] lg:leading-[40px] whitespace-pre">
                    What Sets Us Apart
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    JCI and JCI Continental Lagos members go beyond typical
                    nonprofit work. We take the initiative to address local
                    challenges with a global perspective. Our focus is on
                    sustainable, long-term impact, both locally and globally. We
                    believe that it takes just one enterprising individual to
                    change the world. Be that enterprising leader today.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="min-w-[211px]"
                onClick={() => openMembershipModal(true)}
              >
                <p className="leading-[24px] whitespace-pre font-semibold text-white">
                  Become A Member
                </p>
              </Button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-auto">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full lg:w-auto">
                <ObserverImage
                  src={images.aboutWhatSetsUsApartImage}
                  alt="What Sets Us Apart"
                  imageClassName="object-cover rounded-2xl h-full w-full"
                  className="h-[328px] lg:h-[458px] w-full lg:w-[589px] rounded-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWhatSetsUsApart;
