import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

const WhatWeDoInitiatives = () => {
  return (
    <div className="bg-[#feffff] relative w-full py-[60px] lg:py-[100px]">
      <div className="content-stretch container mx-auto flex flex-col gap-[60px] items-center justify-start px-4 lg:px-8 max-w-[1440px]">
        {/* Three Initiatives Section */}
        <div className="content-stretch flex flex-col gap-20 lg:gap-[100px] items-start justify-start relative shrink-0 w-full">
          {/* Initiative 1: Theme of 2026 */}
          <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[3px] lg:left-[3px] top-[30.5px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
                  <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
                    <ObserverImage
                      src={images.heroTextDecorator}
                      alt="text-decorator"
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-sans font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[#001319] text-[24px] lg:text-[36px]">
                  <p className="leading-[28px] lg:leading-[40px]">
                    Theme of 2026
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    JCI Rise looks at encouraging young business leaders across
                    the globe to come together to rebuild economies and enable
                    workforces to be more resilient.
                  </p>
                </div>
              </div>
            </div>
            <ObserverImage
              src={images.whatWeDoInitiativeImage1}
              alt="Theme of 2026"
              imageClassName="object-cover rounded-[16px] h-full w-full"
              className="h-[328px] w-full lg:w-[589px]"
            />
          </div>

          {/* Initiative 2: Mental Health Campaign */}
          <div className="content-stretch flex flex-col-reverse lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <ObserverImage
              src={images.whatWeDoInitiativeImage2}
              alt="Mental Health Campaign"
              imageClassName="object-cover rounded-[16px] h-full w-full"
              className="h-[328px] w-full lg:w-[589px] lg:order-1"
            />
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto lg:order-2">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[3px] lg:left-[3px] top-[30.5px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
                  <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
                    <ObserverImage
                      src={images.heroTextDecorator}
                      alt="text-decorator"
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-sans font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[#001319] text-[24px] lg:text-[36px]">
                  <p className="leading-[28px] lg:leading-[40px]">
                    Mental health campaign
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    Mental health matters. JCI&apos;s continental campaign is raising
                    awareness of mental health issues and encouraging people to
                    seek help when they need it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Initiative 3: Digital Inclusion Project */}
          <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[3px] lg:left-[3px] top-[30.5px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
                  <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
                    <ObserverImage
                      src={images.heroTextDecorator}
                      alt="text-decorator"
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-sans font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[#001319] text-[24px] lg:text-[36px]">
                  <p className="leading-[28px] lg:leading-[40px]">
                    Digital Inclusion Project
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    JCI Makes sure everyone have the capability to use the
                    internet to do things that benefits them on a day to day
                    basis. Catering for their digital skills, accessibility and
                    connectivity
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-auto">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full lg:w-auto">
                <ObserverImage
                  src={images.whatWeDoInitiativeImage3}
                  alt="Digital Inclusion Project"
                  imageClassName="object-cover rounded-[16px] h-full w-full"
                  className="h-[328px] w-full lg:w-[589px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoInitiatives;
