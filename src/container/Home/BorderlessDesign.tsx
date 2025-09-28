'use client';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import Image from 'next/image';

export function BorderlessDesign() {
  return (
    <section className="bg-[#feffff] relative py-12 lg:py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
          width: '1525.41px',
          height: '952.773px',
          transform: 'translate(-68.41px, -73.89px)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
          {/* Left side - Image */}
          <div className="flex items-center justify-center w-full lg:w-auto order-2 lg:order-1">
            <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full lg:w-auto">
              <div className="aspect-[589/528] lg:h-[528px] rounded-2xl w-full lg:w-[589px] overflow-hidden">
                <ObserverImage
                  src={images.borderlessDesignImage}
                  alt="borderless design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start justify-start w-full lg:w-[511px] order-1 lg:order-2">
            <div className="flex flex-col gap-4 items-center lg:items-start justify-start w-full relative">
              {/* Desktop decorative vector */}
              <div className="absolute h-3 left-[107px] top-[30.5px] w-[248px] lg:block hidden">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="decorative-vector"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>

              {/* Mobile decorative vector */}
              <div className="absolute h-[7.887px] left-1/2 -translate-x-1/2 top-[22px] w-[163px] lg:hidden block">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="decorative-vector"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>

              <h2 className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] text-center lg:text-left w-[209px] lg:w-auto">
                We are borderless by design
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-base lg:text-lg leading-6 lg:leading-[26px] w-full lg:w-[480px] text-center lg:text-left">
                Our ethos transcends boundaries, challenging norms with a
                relentless pursuit of innovation. Embracing the ever-evolving
                landscape of technology, we carve a path that leads to new
                horizons. In a world where limitations are redefined daily, we
                stand at the forefront, breaking barriers, and shaping the
                future with unwavering determination.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              className="w-fit"
              onClick={() =>
                window.open('https://forms.gle/stSuRhn9sGTUm15G8', '_blank')
              }
            >
              Become A Member
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
