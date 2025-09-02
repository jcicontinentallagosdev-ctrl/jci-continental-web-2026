import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import Image from 'next/image';

export function PresidentialTheme() {
  return (
    <section className="bg-[#f3fcff] relative py-24 overflow-hidden">
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

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex items-center justify-between">
          {/* Left side - Content */}
          <div className="flex flex-col gap-10 items-start justify-start w-[511px]">
            <div className="flex flex-col gap-4 items-start justify-start w-full relative">
              {/* Decorative vector */}
              <div className="absolute h-3 left-[107px] top-[30.5px] w-[248px]">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="decorative-vector"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>

              <h2 className="font-bold relative z-20 text-[#001319] text-[36px] leading-[40px] min-w-full">
                2025, Presidential Theme
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-lg leading-[26px] min-w-full">
                With a focus on innovation and technology, we aim to disrupt
                traditional models. Our borderless approach allows us to connect
                with like-minded individuals from around the world,
              </p>
            </div>

            {/* CTA Button */}
            <Button className="w-fit">Become A Member</Button>
          </div>

          {/* Right side - Image and Text */}
          <div className="flex gap-10 items-center justify-start">
            <div
              className="bg-center bg-cover bg-no-repeat h-[327px] shrink-0 w-[286.803px]"
              style={{
                backgroundImage: `url(${images.presidentialThemeImage.src})`,
              }}
            />
            <div className="flex flex-col font-['Space_Grotesk'] font-bold justify-center leading-[72px] text-[#001319] text-[64px] text-nowrap uppercase">
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
