import React from 'react';
import Image from 'next/image';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';

const AboutHero = () => {
  return (
    <div className="bg-[#fbfeff] relative w-full h-[924px]">
      {/* Background Image */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[924px] left-0 top-[100px] w-full"
        style={{
          backgroundImage: `url(${images.heroFeatureImage.src})`,
          width: '100%',
          height: '924px',
          transform: 'translateY(-102.89px)',
        }}
      />

      {/* Overlay Content */}
      <div className="absolute bg-gradient-to-b bottom-0 box-border content-stretch flex flex-col from-[#A9C3CB00] gap-8 items-start justify-center left-0 px-[120px] py-[60px] to-[#03212a] to-[90.356%] w-full">
        <div className="content-stretch flex flex-col gap-8 items-start justify-start relative shrink-0 w-full">
          {/* About Us Badge */}
          <div className="bg-[rgba(254,255,255,0.2)] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[20px] shrink-0">
            <div className="flex flex-col font-inter font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f3fcff] text-[18px] text-nowrap">
              <p className="leading-[26px] whitespace-pre">ABOUT US</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 w-full">
            {/* Main Heading */}
            <div className="flex flex-col font-sans font-bold justify-center min-w-full relative shrink-0 text-[#feffff] text-[72px]">
              <p className="leading-[76px]">
                Innovative, Technology-driven, Disruptive and Borderless
              </p>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col font-inter font-light justify-center not-italic relative shrink-0 text-[#f3fcff] text-[18px] w-[565px]">
              <p className="leading-[26px]">
                Empowering Young Leaders for Positive Change
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="min-w-[211px]">
          <p className="leading-[24px] whitespace-pre">Get Involved</p>
        </Button>
      </div>
    </div>
  );
};

export default AboutHero;
