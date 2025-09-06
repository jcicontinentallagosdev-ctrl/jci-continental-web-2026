import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';

const AboutWhatSetsUsApart = () => {
  return (
    <div className="bg-[#fcf9ec] relative w-full py-[100px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[759px] left-[-43px] opacity-30 top-[-50px] w-[1525px]"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
        }}
      />

      {/* Main Content */}
      <div className="content-stretch flex flex-col gap-[60px] items-center justify-start mx-auto px-[120px] max-w-[1440px] relative">
        <div className="content-stretch flex flex-col gap-[100px] items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[100px] items-center justify-start relative shrink-0 w-full">
            {/* Text Content */}
            <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-[511px]">
              <div className="absolute h-3 left-[3px] top-[30.5px] w-[248px]">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[248px] h-[12px]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="text-decorator"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-4 items-start justify-start leading-[0] relative shrink-0 w-full">
                <div className="flex flex-col font-sans font-bold justify-center relative shrink-0 text-[#001319] text-[36px] text-nowrap">
                  <p className="leading-[40px] whitespace-pre">
                    What Sets Us Apart
                  </p>
                </div>
                <div className="flex flex-col font-inter font-normal justify-center min-w-full not-italic relative shrink-0 text-[#546165] text-[18px]">
                  <p className="leading-[26px]">
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
              <Button className="min-w-[211px]">
                <p className="leading-[24px] whitespace-pre">Become A Member</p>
              </Button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <ObserverImage
                  src={images.aboutWhatSetsUsApartImage}
                  alt="What Sets Us Apart"
                  imageClassName="object-cover rounded-2xl h-full w-full"
                  className="h-[458px] w-[589px]"
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
