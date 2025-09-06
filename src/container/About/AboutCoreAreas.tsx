import React from 'react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';

const AboutCoreAreas = () => {
  const focusAreas = [
    {
      title: 'Youth Entrepreneurship',
      description:
        'Explore ways to support youth in building their email lists and connecting with new clients.',
      icon: images.aboutCoreAreasIcon,
    },
    {
      title: 'Corporate Governance',
      description:
        'Find out how to easily grow your email list and get new clients. Learn how to write engaging welcome...',
      icon: images.aboutCoreAreasIcon,
    },
    {
      title: 'Personal Leadership',
      description:
        'Find out how to easily grow your email list and get new clients. Learn how to write engaging welcome...',
      icon: images.aboutCoreAreasIcon,
    },
    {
      title: 'Digital Economy',
      description:
        'Explore ways to support youth in building their email lists and connecting with new clients.',
      icon: images.aboutCoreAreasIcon,
    },
    {
      title: 'Social Justice',
      description:
        'Find out how to easily grow your email list and get new clients. Learn how to write engaging welcome...',
      icon: images.aboutCoreAreasIcon,
    },
    {
      title: 'Sustainable Development',
      description:
        'Find out how to easily grow your email list and get new clients. Learn how to write engaging welcome...',
      icon: images.aboutCoreAreasIcon,
    },
  ];

  return (
    <div className="bg-[#feffff] relative w-full overflow-hidden rounded-bl-[100px]">
      {/* Background Image */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-full left-0 opacity-30 lg:opacity-40 top-0 w-full"
        style={{
          backgroundImage: `url(${images.aboutCoreAreasBackgroundImage.src})`,
        }}
      />

      {/* Main Content */}
      <div className="box-border container mx-auto content-stretch flex gap-2 items-center justify-start py-[60px] lg:py-[100px] w-full px-6 lg:px-0">
        <div className="basis-0 content-stretch flex flex-col gap-10 grow items-center lg:items-start justify-start min-h-px min-w-px relative shrink-0 w-full lg:w-auto">
          {/* Header Section */}
          <div className="content-stretch flex flex-col gap-10 items-center lg:items-start justify-center lg:justify-start relative shrink-0 w-full lg:w-[511px] lg:h-[104px]">
            <div className="content-stretch flex flex-col gap-4 items-center lg:items-start justify-center lg:justify-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-10 items-center lg:items-start justify-center lg:justify-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-3 items-center lg:items-start justify-center lg:justify-start relative shrink-0 w-full">
                  <div className="absolute h-3 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-10 top-[21.5px] lg:top-[30.5px] w-[135px] lg:w-[248px]">
                    <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%] w-[135px] lg:w-[248px] h-[6.532px] lg:h-[12px]">
                      <ObserverImage
                        src={images.heroTextDecorator}
                        alt="text-decorator"
                        className="block max-w-none size-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col font-sans font-bold justify-center leading-[0] relative shrink-0 text-[#001319] text-[24px] lg:text-[36px] text-center lg:text-left w-full lg:w-[622px]">
                    <p className="leading-[28px] lg:leading-[40px]">
                      Our Core Areas of Focus encompass
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-inter font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#546165] text-[16px] lg:text-[18px] text-center lg:text-left">
                <p className="leading-[24px] lg:leading-[26px]">
                  We empower youth entrepreneurship, fostering innovation and
                  productivity.
                </p>
              </div>
            </div>
          </div>

          {/* Focus Areas Grid */}
          <div className="content-stretch flex flex-col gap-[13px] items-start justify-start relative shrink-0 w-full">
            {/* Mobile: Single Column Layout */}
            <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full lg:hidden">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="border border-[#e6f5fa] bg-[#feffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative rounded-[16px] shrink-0 w-full"
                >
                  <div
                    aria-hidden="true"
                    className="absolute border border-[#e6f5fa] border-solid inset-0 pointer-events-none rounded-[16px]"
                  />
                  <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                    {/* Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] bg-[#f3fcff] box-border content-stretch flex gap-2 items-center justify-center ml-0 mt-0 p-[18px] relative rounded-[30px] size-[60px]">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#b1dfee] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[30px]"
                        />
                        <div className="overflow-clip relative shrink-0 size-6">
                          <div className="absolute inset-[5.21%_5.21%_8.33%_8.33%]">
                            <ObserverImage
                              src={area.icon}
                              alt="target"
                              className="block max-w-none size-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[#546165] w-full">
                      <div className="font-sans font-bold relative shrink-0 text-[20px] w-full">
                        <p className="leading-[24px]">{area.title}</p>
                      </div>
                      <div className="font-inter not-italic relative shrink-0 text-[16px] w-full">
                        <p className="leading-[1.588]">{area.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Two Row Layout */}
            <div className="hidden lg:flex content-stretch flex-col gap-[13px] items-start justify-start relative shrink-0 w-full">
              {/* First Row */}
              <div className="content-stretch flex gap-6 items-start justify-start relative shrink-0 w-full">
                {focusAreas.slice(0, 3).map((area, index) => (
                  <div
                    key={index}
                    className="basis-0 border border-[#e6f5fa] bg-[#feffff] box-border content-stretch flex flex-col gap-2.5 grow items-center justify-center min-h-px min-w-px p-[24px] relative rounded-[16px] shrink-0"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#e6f5fa] border-solid inset-0 pointer-events-none rounded-[16px]"
                    />
                    <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full">
                      {/* Icon */}
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="[grid-area:1_/_1] bg-[#f3fcff] box-border content-stretch flex gap-2 items-center justify-center ml-0 mt-0 p-[18px] relative rounded-[30px] size-[60px]">
                          <div
                            aria-hidden="true"
                            className="absolute border-[#b1dfee] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[30px]"
                          />
                          <div className="overflow-clip relative shrink-0 size-6">
                            <div className="absolute inset-[5.21%_5.21%_8.33%_8.33%]">
                              <ObserverImage
                                src={area.icon}
                                alt="target"
                                className="block max-w-none size-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="content-stretch flex flex-col gap-4 items-start justify-start leading-[0] relative shrink-0 text-[#546165] w-full">
                        <div className="font-sans font-bold relative shrink-0 text-[24px] w-full">
                          <p className="leading-[28px]">{area.title}</p>
                        </div>
                        <div className="font-inter not-italic relative shrink-0 text-[20px] w-full">
                          <p className="leading-[1.588]">{area.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row */}
              <div className="content-stretch flex gap-6 items-start justify-start relative shrink-0 w-full">
                {focusAreas.slice(3, 6).map((area, index) => (
                  <div
                    key={index + 3}
                    className="basis-0 border border-[#e6f5fa] bg-[#feffff] box-border content-stretch flex flex-col gap-2.5 grow items-center justify-center min-h-px min-w-px p-[24px] relative rounded-[16px] shrink-0"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#e6f5fa] border-solid inset-0 pointer-events-none rounded-[16px]"
                    />
                    <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full">
                      {/* Icon */}
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="[grid-area:1_/_1] bg-[#f3fcff] box-border content-stretch flex gap-2 items-center justify-center ml-0 mt-0 p-[18px] relative rounded-[30px] size-[60px]">
                          <div
                            aria-hidden="true"
                            className="absolute border-[#b1dfee] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[30px]"
                          />
                          <div className="overflow-clip relative shrink-0 size-6">
                            <div className="absolute inset-[5.21%_5.21%_8.33%_8.33%]">
                              <ObserverImage
                                src={area.icon}
                                alt="target"
                                className="block max-w-none size-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="content-stretch flex flex-col gap-4 items-start justify-start leading-[0] relative shrink-0 text-[#546165] w-full">
                        <div className="font-sans font-bold relative shrink-0 text-[24px] w-full">
                          <p className="leading-[28px]">{area.title}</p>
                        </div>
                        <div className="font-inter not-italic relative shrink-0 text-[20px] w-full">
                          <p className="leading-[1.588]">{area.description}</p>
                        </div>
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

export default AboutCoreAreas;
