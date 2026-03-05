import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';

const WhatWeDoPrograms = () => {
  return (
    <div className="bg-[#f3fcff] relative w-full py-[60px] lg:py-[100px]">
      <div className="content-stretch container mx-auto flex flex-col gap-[60px] items-center justify-start px-4 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-full lg:w-auto">
          <div className="absolute h-3 left-[74px] lg:left-[300px] top-[27px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
            <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
              <ObserverImage
                src={images.heroTextDecorator}
                alt="text-decorator"
                className="block max-w-none size-full"
              />
            </div>
          </div>
          <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[24px] lg:text-[36px] text-center w-full lg:w-[846px]">
            <p className="leading-[28px] lg:leading-[40px]">Programs</p>
          </div>
          <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px] text-center">
            <p className="leading-[24px] lg:leading-[26px] max-w-[846px]">
              We are a vibrant global community of ambitious young leaders, aged
              18 to 40, committed to driving the JCI RISE initiative through our
              core values of innovation, collaboration, and impact.
            </p>
          </div>
        </div>

        {/* Programs Grid Section */}
        <div className="content-stretch flex flex-col gap-4 lg:gap-6 items-start justify-start relative shrink-0 w-full">
          {/* Mobile: Stacked vertically, Desktop: Row 1 */}
          <div className="content-stretch flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-start relative shrink-0 w-full">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:basis-0 lg:grow lg:min-h-px lg:min-w-px">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                <ObserverImage
                  src={images.whatWeDoProgramImage1}
                  alt="Program Image 1"
                  imageClassName="object-cover rounded-[16px] h-full w-full"
                  className="h-[328px] w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center relative shrink-0 w-full lg:basis-0 lg:grow lg:min-h-px lg:min-w-px">
              <ObserverImage
                src={images.whatWeDoProgramImage2}
                alt="Program Image 2"
                imageClassName="object-cover rounded-[16px] h-full w-full"
                className="h-[328px] w-full"
              />
            </div>
          </div>

          {/* Mobile: Side by side, Desktop: Row 2 */}
          <div className="content-stretch flex flex-row lg:flex-row gap-4 lg:gap-6 items-center justify-start relative shrink-0 w-full">
            <div className="lg:min-w-[428px] min-w-full flex items-center justify-center min-h-px relative">
              <ObserverImage
                src={images.whatWeDoProgramImage3}
                alt="Program Image 3"
                imageClassName="object-cover rounded-[16px] h-full w-full"
                className="h-[328px] lg:w-[428px] w-full"
              />
            </div>
            <div className="flex flex-1 items-center justify-center relative">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                <ObserverImage
                  src={images.whatWeDoProgramImage4}
                  alt="Program Image 4"
                  imageClassName="object-cover rounded-[16px] h-full w-full"
                  className="h-[328px]"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Stacked vertically, Desktop: Row 3 */}
          <div className="content-stretch flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-start relative shrink-0 w-full">
            <div className="flex items-center justify-center relative w-full lg:min-h-px lg:min-w-px">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                <ObserverImage
                  src={images.whatWeDoProgramImage5}
                  alt="Program Image 5"
                  imageClassName="object-cover rounded-[16px] h-full w-full"
                  className="h-[328px] w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center relative lg:min-h-px lg:min-w-[428px] min-w-full">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                <ObserverImage
                  src={images.whatWeDoProgramImage6}
                  alt="Program Image 6"
                  imageClassName="object-cover rounded-[16px] h-full w-full"
                  className="h-[328px] lg:w-[428px] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <Button
          variant="outline"
          className="border-[#0398c8] text-[#0398c8] hover:bg-[#0398c8] hover:text-white"
        >
          <p className="leading-[24px] whitespace-pre">View All</p>
        </Button>
      </div>
    </div>
  );
};

export default WhatWeDoPrograms;
