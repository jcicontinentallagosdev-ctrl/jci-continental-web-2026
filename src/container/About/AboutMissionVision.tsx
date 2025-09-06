import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

const AboutMissionVision = () => {
  return (
    <div className="bg-[#feffff] relative w-full py-[100px]">
      <div className="content-stretch flex flex-col gap-[60px] items-center justify-start mx-auto px-[120px] max-w-[1440px]">
        {/* Header Section */}
        <div className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0">
          <div className="absolute h-3 left-1/2 -translate-x-1/2 top-[30.5px] w-[248px]">
            <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[248px] h-[12px]">
              <ObserverImage
                src={images.heroTextDecorator}
                alt="text-decorator"
                className="block max-w-none size-full"
              />
            </div>
          </div>
          <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[36px] text-center w-[846px]">
            <p className="leading-[40px]">Mission and Vision Statement</p>
          </div>
          <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[18px] text-center">
            <p className="leading-[26px]">
              We unite dynamic young leaders from around the world, aged 18 to
              40, committed to driving the JCI RISE initiative through our core
              values of empowerment, innovation, and sustainability.
            </p>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="content-stretch flex flex-col gap-[100px] items-start justify-start relative shrink-0 w-full">
          {/* Our Vision */}
          <div className="content-stretch flex gap-[100px] items-center justify-start relative shrink-0 w-full">
            <div className="basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[3px] top-[30.5px] w-[248px]">
                  <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[248px] h-[12px]">
                    <ObserverImage
                      src={images.heroTextDecorator}
                      alt="text-decorator"
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[36px] text-nowrap">
                  <p className="leading-[40px] whitespace-pre">Our Vision</p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[18px]">
                  <p className="leading-[26px]">
                    To become the leading global network of proactive young
                    citizens.
                  </p>
                </div>
              </div>
            </div>
            <ObserverImage
              src={images.aboutMissionVisionVisionImage}
              alt="Our Vision"
              imageClassName="object-cover rounded-2xl h-full w-full"
              className="h-[328px] w-[589px]"
            />
          </div>

          {/* Our Mission */}
          <div className="content-stretch flex gap-[100px] items-center justify-start relative shrink-0 w-full">
            <ObserverImage
              src={images.aboutMissionVisionMissionImage}
              alt="Our Mission"
              imageClassName="object-cover rounded-2xl h-full w-full"
              className="h-[328px] w-[589px]"
            />
            <div className="basis-0 content-stretch flex flex-col gap-10 grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                <div className="absolute h-3 left-[3px] top-[30.5px] w-[248px]">
                  <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[248px] h-[12px]">
                    <ObserverImage
                      src={images.heroTextDecorator}
                      alt="text-decorator"
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[36px] text-nowrap">
                  <p className="leading-[40px] whitespace-pre">Our Mission</p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[18px]">
                  <p className="leading-[26px]">
                    To empower young people with development opportunities that
                    inspire and catalyze positive change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMissionVision;
