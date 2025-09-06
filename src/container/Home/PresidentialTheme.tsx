import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import Image from 'next/image';

export function PresidentialTheme() {
  return (
    <section className="bg-[#f3fcff] relative py-12 lg:py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
          width: '1525.41px',
          height: '952.773px',
          transform: 'translate(-43px, -69px)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 items-center lg:justify-between">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start justify-start w-full lg:w-[511px]">
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

              <h2 className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] min-w-full text-center lg:text-left">
                2025, Presidential Theme
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-base lg:text-lg leading-6 lg:leading-[26px] min-w-full text-center lg:text-left">
                With a focus on innovation and technology, we aim to disrupt
                traditional models. Our borderless approach allows us to connect
                with like-minded individuals from around the world,
              </p>
            </div>

            {/* CTA Button */}
            <Button className="w-fit">Become A Member</Button>
          </div>

          {/* Right side - Image and Text */}
          <div className="flex gap-[21px] lg:gap-10 items-center justify-start">
            <div className="h-[172px] lg:h-[327px] shrink-0 w-[151px] lg:w-[286.803px] overflow-hidden">
              <ObserverImage
                src={images.presidentialThemeImage}
                alt="presidential theme"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col font-['Space_Grotesk'] font-bold justify-center leading-[38px] lg:leading-[72px] text-[#001319] text-[34px] lg:text-[64px] text-nowrap uppercase">
              <p className="mb-0">Equipped</p>
              <p className="mb-0">Fired</p>
              <p className="mb-0">Forged</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
