import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import Image from 'next/image';

export function AreasOfOpportunities() {
  return (
    <section className="bg-[#fcf9ec] relative py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
          // transform: 'translate(-68.41px, -73.89px)',
          width: '1525.41px',
          height: '952.773px',
        }}
      />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex gap-[100px] items-center">
          {/* Left side - Image */}
          <div className="flex items-center justify-center">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div
                className="h-[528px] rounded-2xl w-[589px] bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${images.areasOfOpportunitiesImage.src})`,
                  backgroundSize: '101.19% 112.88%',
                  backgroundPosition: '50% 45.59%',
                }}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-10 h-[300px] items-start justify-start w-[511px]">
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

              <h2 className="font-bold relative z-20 text-[#001319] text-[36px] leading-[40px]">
                Areas of Opportunities
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-lg leading-[26px] min-w-full">
                JCI empowers Young Leaders to Create Positive Change. Explore
                Our Four Areas of Opportunity and Unlock Your Potential.
                Discover the Power of Community Engagement, Professional
                Networking, Individual Growth, and Global Cooperation. Join JCI
                to Develop Your Leadership Skills and Drive Positive Change.
              </p>
            </div>

            {/* CTA Button */}
            <Button className="w-fit">Become A Member</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
