'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import {
  ArrowLeft2,
  ArrowRight2,
  CalendarTick,
  LocationTick,
} from 'iconsax-react';

/** Last calendar Sunday of the given month (local time). */
function getLastSundayOfMonth(year: number, monthIndex: number): Date {
  const lastDay = new Date(year, monthIndex + 1, 0);
  const dow = lastDay.getDay();
  lastDay.setDate(lastDay.getDate() - dow);
  lastDay.setHours(0, 0, 0, 0);
  return lastDay;
}

/** Next occurrence: last Sunday of this month if still upcoming, else last Sunday of next month. */
function getNextLastSundayOfMonth(from = new Date()): Date {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);

  let y = today.getFullYear();
  let m = today.getMonth();
  let lastSun = getLastSundayOfMonth(y, m);

  if (today > lastSun) {
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    lastSun = getLastSundayOfMonth(y, m);
  }

  return lastSun;
}

function formatLastSundayBoardMeetingDate(): string {
  return getNextLastSundayOfMonth().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const staticEventLocalData = [
  {
    id: 1,
    title: 'JCI Continental Lagos Annual Convention',
    date: 'November 2026',
    location: 'Lagos, Nigeria',
    description:
      'End the local organization year with an empowering event to culminate all our activities',
    image: images.jciAnnualConventionImage,
  },
  {
    id: 2,
    title: 'Annual General Meeting',
    date: 'September 28, 2026',
    location: 'Water Cress Hotel & Events, Ikeja',
    description:
      'Reports, Election and Induction. Join us for our Annual General Meeting to review the year and elect new leaders.',
    image: images.annualGeneralMeetingImage,
  },
] as const;

const monthlyBoardMeetingBase = {
  id: 3,
  title: 'Monthly Board Meeting',
  location: 'Lagos, Nigeria',
  description:
    'Monthly leadership development and networking session for members to connect and grow together.',
  image: images.leadershipCircleImage,
};

const WhatWeDoEventLocal = () => {
  const eventLocalData = [
    ...staticEventLocalData,
    {
      ...monthlyBoardMeetingBase,
      date: formatLastSundayBoardMeetingDate(),
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-[#f3fcff] relative py-12 lg:py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
          width: '100%',
          height: '952.773px',
        }}
      />

      {/* Desktop Navigation arrows - Hidden on mobile */}
      <div className="absolute left-[43.5px] top-[367px] w-[65.5px] h-[65.5px] z-20 lg:block hidden">
        <button
          onClick={scrollPrev}
          className="w-full cursor-pointer rounded-full h-full flex bg-white items-center justify-center hover:opacity-80 transition-opacity"
        >
          <ArrowLeft2 className="size-10" color="#0398c8" />
        </button>
      </div>

      <div className="absolute right-[43.5px] top-[367px] w-[65.5px] h-[65.5px] z-20 lg:block hidden">
        <button
          onClick={scrollNext}
          className="w-full cursor-pointer rounded-full h-full flex bg-white items-center justify-center hover:opacity-80 transition-opacity"
        >
          <ArrowRight2 className="size-10" color="#0398c8" />
        </button>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 lg:gap-[60px] items-center justify-start">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-[620px] relative">
            {/* Desktop decorative vector */}
            <div className="absolute h-3 left-[212px] top-[30.5px] w-[248px] lg:block hidden">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            {/* Mobile decorative vector */}
            <div className="absolute h-[7.887px] left-1/2 -translate-x-1/2 top-[23.5px] w-[163px] lg:hidden block">
              <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                <ObserverImage
                  src={images.heroTextDecorator}
                  alt="decorative-vector"
                  className="block max-w-none size-full"
                />
              </div>
            </div>

            <h2 className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] text-center">
              Local Events
            </h2>
          </div>

          {/* Unified Carousel */}
          <div className="w-full">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex gap-3 lg:gap-6">
                {eventLocalData.map(event => (
                  <div
                    key={event.id}
                    className="embla__slide flex-[0_0_100%] lg:flex-[0_0_384px]"
                  >
                    <div className="bg-white border border-[#e6f5fa] rounded-xl p-5 h-full">
                      <div className="flex flex-col gap-[22px] h-full">
                        {/* Image */}
                        <div className="h-[189px] rounded-xl overflow-hidden">
                          <ObserverImage
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-5 flex-1">
                          <div className="flex flex-col gap-3">
                            <h3 className="font-['Space_Grotesk'] font-bold text-[#2b2b3d] text-[20px] lg:text-xl leading-[24px] lg:leading-6">
                              {event.title}
                            </h3>

                            <div className="flex flex-col gap-4">
                              {/* Date */}
                              <div className="flex gap-3 items-center">
                                <div className="w-[18px] h-[18px] relative">
                                  <CalendarTick
                                    size="18"
                                    color="#0398c8"
                                    variant="Bold"
                                  />
                                </div>
                                <span className="font-['Inter'] font-normal text-[#546165] text-base leading-6">
                                  {event.date}
                                </span>
                              </div>

                              {/* Location */}
                              <div className="flex gap-3 items-center">
                                <div className="w-[18px] h-[18px] relative">
                                  <LocationTick
                                    size="18"
                                    color="#0398c8"
                                    variant="Bold"
                                  />
                                </div>
                                <span className="font-['Inter'] font-normal text-[#546165] text-base leading-6">
                                  {event.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="font-['Inter'] font-normal text-[#546165] text-[14px] lg:text-sm leading-[22px]">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Buttons - Hidden on desktop */}
          <div className="lg:hidden flex gap-8 items-center justify-center">
            <button
              onClick={scrollPrev}
              className="bg-white rounded-full w-[65px] h-[65px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowLeft2 className="size-10" color="#0398c8" />
            </button>

            <button
              onClick={scrollNext}
              className="bg-white rounded-full w-[65px] h-[65px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowRight2 className="size-10" color="#0398c8" />
            </button>
          </div>

          {/* View All Button */}
          <Button
            variant="outline"
            className="border-[#0398c8] text-[#0398c8] hover:bg-[#0398c8] hover:text-white"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoEventLocal;
