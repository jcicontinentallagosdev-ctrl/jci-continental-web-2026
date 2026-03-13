'use client';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import { useMembershipModal } from '@/context/membership-modal-context';

export function PresidentialTheme() {
  const { setOpen: openMembershipModal } = useMembershipModal();

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
        <div className="flex flex-col lg:flex-row gap-10  items-center lg:justify-between">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start justify-start w-full lg:w-[50vw]">
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
                2026 Presidential Theme
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-base lg:text-lg leading-6 lg:leading-[26px] min-w-full text-center lg:text-left">
              A beacon provides direction. It signals presence. It stands firm and visible. This year, we are
positioning our organization and our members to do exactly that. To lead with clarity. To serve
with intention. To operate at a higher standard.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              className="w-fit"
              onClick={() => openMembershipModal(true)}
            >
              Become A Member
            </Button>
          </div>

          {/* Right side - Image and Text */}
          <div className="flex items-center w-full lg:w-[50vw]">
            <div className="h-[227px] lg:h-[327px] shrink-0 w-full overflow-hidden">
              <ObserverImage
                src={images.presidentialThemeImage}
                alt="presidential theme"
                className="w-full h-full"
                imageClassName="object-contain"
              />
            </div>
 
          </div>
        </div>
      </div>
    </section>
  );
}
