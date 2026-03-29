import { images } from '@/constants';
import Image from 'next/image';

const sectors = [
  {
    id: 1,
    title: 'Individual Development',
    description:
      'Empowering young people to become purpose-driven leaders through mentorship, training, and real-world experience.',
    icon: images.sectorsSectionUserIcon,
    decorativeIcon: images.sectorsSectionDecorativeGroup1,
    bgColor: 'bg-[#fcf9ec]',
    iconBgColor: 'bg-[#f7ebc3]',
    iconBorderColor: 'border-[#f7ebc3]',
  },
  {
    id: 2,
    title: 'Business & Entrepreneurship',
    description:
      'Equipping young professionals with skills, networks, and opportunities to build and grow impactful ventures.',
    icon: images.sectorsSectionBriefcaseIcon,
    decorativeIcon: images.sectorsSectionDecorativeGroup2,
    bgColor: 'bg-[#e6f5fa]',
    iconBgColor: 'bg-[#feffff]',
    iconBorderColor: 'border-[#b1dfee]',
  },
  {
    id: 3,
    title: 'International Cooperation',
    description:
      'Promoting global citizenship through cultural exchange, collaboration, and partnerships for shared progress.',
    icon: images.sectorsSectionConnectionIcon,
    decorativeIcon: images.sectorsSectionDecorativeGroup3,
    bgColor: 'bg-[#e7e1eb]',
    iconBgColor: 'bg-[#feffff]',
    iconBorderColor: 'border-[#a591d0]',
  },
  {
    id: 4,
    title: 'Community Impact',
    description:
      'Driving sustainable change by empowering youth to take action and solve community challenges.',
    icon: images.sectorsSectionUsersIcon,
    decorativeIcon: images.sectorsSectionDecorativeGroup4,
    bgColor: 'bg-[#f8e7d5]',
    iconBgColor: 'bg-[#feffff]',
    iconBorderColor: 'border-[#e4a785]',
  },
];

export function SectorsSection() {
  return (
    <section className="bg-[#feffff] py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          {sectors.map(sector => (
            <div
              key={sector.id}
              className={`flex-1 ${sector.bgColor} rounded-2xl px-4 py-6 lg:p-10 flex items-center justify-between relative overflow-hidden`}
            >
              <div className="flex flex-col gap-6">
                <div
                  className={`${sector.iconBgColor} rounded-full w-15 h-15 flex items-center justify-center p-[18px] border-[0.6px] ${sector.iconBorderColor}`}
                >
                  <div className="w-6 h-6 relative">
                    <Image
                      src={sector.icon}
                      alt={sector.title}
                      width={24}
                      height={24}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:gap-4">
                  <h3 className="font-['Space_Grotesk'] font-bold text-[#001319] text-xl lg:text-2xl leading-6 lg:leading-7">
                    {sector.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[#546165] text-base lg:text-lg leading-6 lg:leading-[26px] max-w-[438px]">
                    {sector.description}
                  </p>
                </div>
              </div>
              <div className="absolute h-[138px] w-[152px] -top-11 lg:-top-11 -right-0 lg:-right-0">
                <Image
                  src={sector.decorativeIcon}
                  alt=""
                  width={152}
                  height={138}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
