'use client';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import { useMembershipModal } from '@/context/membership-modal-context';

export function JoinJCI() {
  const { setOpen: openMembershipModal } = useMembershipModal();

  return (
    <section className="bg-[#0398c8] relative py-12 lg:py-24 overflow-hidden min-h-[266px] lg:min-h-[552px] flex items-center justify-center">
      {/* Background image with opacity */}
      <div
        className="absolute lg:block hidden inset-0 bg-center bg-cover bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url(${images.heroFeatureImage.src})`,
          width: '100%',
          height: '899.425px',
          transform: 'translateY(-93.89px)',
        }}
      />
      <div
        className="absolute lg:hidden block inset-0 bg-center bg-cover bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url(${images.heroFeatureImage.src})`,
          width: '100%',
          height: '266px',
          transform: 'translateY(0px)',
        }}
      />

      {/* Additional overlay */}
      <div className="absolute inset-0 bg-[#7D6A2266]" />

      <div className="container my-auto mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center">
          <div className="flex flex-col gap-3 items-center justify-center relative">
            {/* Desktop decorative vector */}
            <div className="absolute h-3 left-[252px] top-[68px] w-[248px] lg:block hidden">
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

            <h2 className="font-bold relative z-20 text-[#feffff] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] w-full lg:w-[581px]">
              Join JCI Continental today and reach your full potential.
            </h2>
          </div>

          {/* CTA Button */}
          <Button
            className="bg-[#e4c03d] hover:bg-[#e4c03d]/90 text-[#60511a] shadow-[0px_2px_8px_0px_rgba(223,161,62,0.25)]"
            size="lg"
            onClick={() => openMembershipModal(true)}
          >
            Join the movement
          </Button>
        </div>
      </div>
    </section>
  );
}
