import React from 'react';
import Image from 'next/image';
import { images } from '@/constants';
import ObserverImage from '@/components/shared/obs-image';

// Board member data
const boardMembers = [
  {
    id: 1,
    name: 'Feyikemi Akinyode',
    position: 'President',
    image: images.ourPeopleBoardPresidentImage,
    isPresident: true,
  },
  {
    id: 2,
    name: 'Juliet Banto',
    position: 'Vice President individual and community',
    image: images.ourPeopleBoardVPICImage,
  },
  {
    id: 3,
    name: 'Olumide Adepoju',
    position: 'Vice President Business and International',
    image: images.ourPeopleBoardVPBIImage,
  },
  {
    id: 4,
    name: 'Caleb Adekunle',
    position: 'General Secretary',
    image: images.ourPeopleBoardGeneralSecretaryImage,
  },
  {
    id: 5,
    name: 'Oluwatosin Lemo',
    position: 'General Legal Counsel',
    image: images.ourPeopleBoardGeneralLegalCounselImage,
  },
  {
    id: 6,
    name: 'Oluwatobi Emmanuel',
    position: 'Chief Financial Officer',
    image: images.ourPeopleBoardCFOImage,
  },
  {
    id: 7,
    name: 'Oluwadamilola Adegun',
    position: 'Director Skills Development',
    image: images.ourPeopleBoardDirectorSkillsDevelopmentImage,
  },
  {
    id: 8,
    name: 'Tobiloba Oyewole',
    position: "Director Int'l Opportunities & Socials",
    image: images.ourPeopleBoardDirectorIntlOpportunitiesImage,
  },
  {
    id: 9,
    name: 'Muraina Kehinde',
    position: 'Director Strategy and Continuation',
    image: images.ourPeopleBoardDirectorStrategyImage,
  },
  {
    id: 10,
    name: 'Hanson Olakunle',
    position: 'Director Projects and Community',
    image: images.ourPeopleBoardDirectorProjectsImage,
  },
  {
    id: 11,
    name: 'Otito-Jesu Ayeni',
    position: 'Director Awards & Documentation',
    image: images.ourPeopleBoardDirectorAwardsImage,
  },
  {
    id: 12,
    name: 'Oluwadolapo Oyeleke',
    position: 'Director Business & Partnership',
    image: images.ourPeopleBoardDirectorBusinessPartnershipImage,
  },
  {
    id: 13,
    name: 'Kehinde Olajide',
    position: 'Director Membership Growth & Retention',
    image: images.ourPeopleBoardDirectorMembershipImage,
  },
  {
    id: 14,
    name: 'Adeniran Oluwaseun',
    position: 'Director Brand Media & Communication',
    image: images.ourPeopleBoardDirectorBrandMediaImage,
  },
  {
    id: 15,
    name: 'Esther Abiade',
    position: 'Director Convention',
    image: images.ourPeopleBoardDirectorConventionImage,
  },
  {
    id: 16,
    name: 'Shola Adekunle',
    position: 'Chief Technology Officer',
    image: images.ourPeopleBoardCTOImage,
  },
  {
    id: 17,
    name: 'Debo Abayomi',
    position: 'Director Welfare and Membership Services',
    image: images.ourPeopleBoardDirectorWelfareImage,
  },
  {
    id: 18,
    name: 'Adebowale Damilola',
    position: 'Executive Assistant to the President',
    image: images.ourPeopleBoardExecutiveAssistantImage,
  },
];

const OurBoardMembers = () => {
  const president = boardMembers.find(member => member.isPresident);
  const otherMembers = boardMembers.filter(member => !member.isPresident);

  return (
    <div className="bg-[#f3fcff] relative w-full lg:py-[100px] py-[60px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-full left-0 opacity-30 top-0 w-full"
        style={{
          backgroundImage: `url('http://localhost:3845/assets/61779a38d4e794211b93e4a6a0860db723f0d23d.png')`,
        }}
      />

      <div className="container px-4 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col gap-[60px] items-center justify-start max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col gap-4 items-center justify-center relative">
            <div className="absolute h-3 left-1/2 -translate-x-1/2 top-[22px] lg:top-[30.5px] w-[163px] lg:w-[248px]">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[163px] lg:w-[248px] h-[7.887px] lg:h-[12px]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="text-decorator"
                  className="block max-w-none size-full"
                />
              </div>
            </div>
            <div className="flex relative z-20 flex-col font-sans font-bold justify-center text-[#001319] text-[24px] lg:text-[36px] text-center max-w-[846px]">
              <p className="leading-[28px] lg:leading-[40px]">
                Our Board Members
              </p>
            </div>
            <div className="flex flex-col font-inter font-normal justify-center text-[#546165] text-[16px] lg:text-[18px] text-center max-w-[568px]">
              <p className="leading-[24px] lg:leading-[26px]">
                Meet the dedicated individuals who form the backbone of JCI,
                guiding our mission and inspiring change within our communities.
              </p>
            </div>
          </div>

          {/* Board Members Content */}
          <div className="flex flex-col gap-10 items-center justify-center w-full">
            {/* Featured President */}
            {president && (
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-start w-full">
                <div className="h-[370px] lg:h-[632px] bg-[#CDEAF4] overflow-hidden rounded-[16px] w-full lg:w-[589px] border border-[#b1dfee] relative">
                  <ObserverImage
                    src={president.image}
                    alt="president"
                    className="w-full h-full object-cover object-top"
                    imageClassName="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-10 items-center lg:items-start justify-start flex-1">
                  <div className="flex flex-col gap-3 lg:gap-4 items-center lg:items-start justify-start w-full">
                    <div className="flex flex-col font-sans font-bold justify-center text-[#001319] text-[24px] lg:text-[36px] w-full text-center lg:text-left">
                      <p className="leading-[28px] lg:leading-[40px]">
                        {president.name}
                      </p>
                    </div>
                    <div className="flex flex-col font-inter font-normal justify-center text-[#546165] text-[18px] w-full text-center lg:text-left">
                      <p className="leading-[26px]">{president.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Board Members Grid */}
            <div className="flex flex-col gap-10 items-start justify-start w-full">
              {/* Mobile: Single column, Desktop: Grid of 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start justify-start w-full">
                {otherMembers.map(member => (
                  <div
                    key={member.id}
                    className="bg-[#feffff] border border-[#b1dfee] rounded-[12px] flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-0 w-full"
                  >
                    <div className="h-[274px] bg-[#CDEAF4] overflow-hidden rounded-tl-[12px] rounded-tr-[12px] w-full">
                      <ObserverImage
                        src={member.image}
                        alt="member"
                        className="w-full h-full object-cover object-top"
                        imageClassName="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-center lg:items-start justify-start px-6 py-0 w-full text-center lg:text-left">
                      <div className="font-inter font-semibold text-[#001319] text-[18px] w-full">
                        <p className="leading-[30px]">{member.name}</p>
                      </div>
                      <div className="font-inter font-normal text-[#546165] text-[16px] w-full">
                        <p className="leading-[26px]">{member.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBoardMembers;
