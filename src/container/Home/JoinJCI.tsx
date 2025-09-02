import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';

export function JoinJCI() {
  return (
    <section className="bg-[#0398c8] relative py-24 overflow-hidden min-h-[552px] flex items-center justify-center">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url(${images.heroFeatureImage.src})`,
          width: '100%',
          height: '899.425px',
          transform: 'translateY(-93.89px)',
        }}
      />

      {/* Additional overlay */}
      <div className="absolute inset-0 bg-[#7D6A2266]" />

      <div className="container my-auto mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 items-center justify-center text-center">
          <div className="flex flex-col gap-3 items-center justify-center relative">
            {/* Decorative vector */}
            <div className="absolute h-3 left-[252px] top-[68px] w-[248px]">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            <h2 className="font-bold relative z-20 text-[#feffff] text-[36px] leading-[40px] w-[581px]">
              Join JCI Continental today and reach your full potential.
            </h2>
          </div>

          {/* CTA Button */}
          <Button
            className="bg-[#e4c03d] hover:bg-[#e4c03d]/90 text-[#60511a] shadow-[0px_2px_8px_0px_rgba(223,161,62,0.25)]"
            size="lg"
          >
            Join the movement
          </Button>
        </div>
      </div>
    </section>
  );
}
