import { images } from '@/constants';
import Image from 'next/image';

const sectors = [
  {
    id: 1,
    title: 'Individual Development',
    description:
      'We strive to create positive change by empowering young people to take action and lead with integrity, innovation, and a commitment to service',
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
      'Cultivating innovation and economic growth through professional networking.',
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
      'Fostering cross-cultural collaboration to create a more peaceful and inclusive world.',
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
      'Building better communities through active citizenship and sustainable development.',
    icon: images.sectorsSectionUsersIcon,
    decorativeIcon: images.sectorsSectionDecorativeGroup4,
    bgColor: 'bg-[#f8e7d5]',
    iconBgColor: 'bg-[#feffff]',
    iconBorderColor: 'border-[#e4a785]',
  },
];

export function SectorsSection() {
  return (
    <section className="bg-[#feffff] py-24">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex-col gap-6 grid grid-cols-2">
          {sectors.map(sector => (
            <div
              key={sector.id}
              className={`flex-1 ${sector.bgColor} rounded-2xl p-10 flex items-center justify-between relative overflow-hidden`}
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
                <div className="flex flex-col gap-4">
                  <h3 className="font-['Space_Grotesk'] font-bold text-[#001319] text-2xl leading-7">
                    {sector.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[#546165] text-lg leading-[26px] max-w-[438px]">
                    {sector.description}
                  </p>
                </div>
              </div>
              <div className="absolute h-[138px] w-[152px] -top-11 -right-0">
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
