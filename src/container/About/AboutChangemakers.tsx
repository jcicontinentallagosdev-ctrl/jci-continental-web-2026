import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

const AboutChangemakers = () => {
  return (
    <div className="bg-[#f3fcff] relative w-full py-[60px] lg:py-[100px]">
      <div className="content-stretch container mx-auto flex flex-col gap-[60px] items-center justify-start px-4 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-full lg:w-auto">
          <div className="absolute h-3 left-1/2 -translate-x-1/2 lg:left-[356px] lg:translate-x-0 top-[50px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
            <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
              <ObserverImage
                src={images.heroTextDecorator}
                alt="text-decorator"
                className="block max-w-none size-full"
              />
            </div>
          </div>
          <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[24px] lg:text-[36px] text-center w-full lg:w-[846px]">
            <p className="leading-[28px] lg:leading-[40px]">
              Changemakers at the Intersection of Innovation and Global Impact
            </p>
          </div>
          <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px] text-center">
            <p className="leading-[24px] lg:leading-[26px] max-w-[846px]">
              We are an exclusive global network of enterprising young
              professionals, aged 18 to 40, dedicated to leading and executing
              the JCI RISE initiative across its three fundamental pillars:
            </p>
          </div>
        </div>

        {/* Three Pillars Section */}
        <div className="content-stretch flex flex-col gap-20 lg:gap-[100px] items-start justify-start relative shrink-0 w-full">
          {/* Pillar 1: Sustaining and Rebuilding Economies */}
          <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[163px] lg:left-1/2 lg:-translate-x-1/2 top-[23px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
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
                    Sustaining and Rebuilding Economies
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    By supporting small, local businesses, we fuel economic
                    growth.
                  </p>
                </div>
              </div>
            </div>
            <ObserverImage
              src={images.aboutChangemakersEconomiesImage}
              alt="text-decorator"
              imageClassName="object-cover rounded-2xl h-full w-full"
              className="h-[328px] w-full lg:w-[589px]"
            />
          </div>

          {/* Pillar 2: Motivating the Workforce */}
          <div className="content-stretch flex flex-col-reverse lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <ObserverImage
              src={images.aboutChangemakersWorkforceImage}
              alt="text-decorator"
              imageClassName="object-cover rounded-2xl h-full w-full"
              className="h-[328px] w-full lg:w-[589px] lg:order-1"
            />
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto lg:order-2">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[163px] lg:left-1/2 lg:-translate-x-1/2 top-[21.5px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
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
                    Motivating the Workforce
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[18px] lg:text-[18px]">
                  <p className="leading-[26px] lg:leading-[26px]">
                    We empower youth entrepreneurship, fostering innovation and
                    productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Preserving Mental Health and Well-being */}
          <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-start relative shrink-0 w-full">
            <div className="lg:basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[132px] lg:left-1/2 lg:-translate-x-1/2 top-[22.5px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
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
                    Preserving Mental Health and Well-being
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px]">
                  <p className="leading-[24px] lg:leading-[26px]">
                    We advocate for and support initiatives that prioritize
                    mental health and wellness.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-auto">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full lg:w-auto">
                <ObserverImage
                  src={images.aboutChangemakersMentalHealthImage}
                  alt="text-decorator"
                  imageClassName="object-cover rounded-2xl h-full w-full"
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

export default AboutChangemakers;
