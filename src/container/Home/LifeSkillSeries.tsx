'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import { useMembershipModal } from '@/context/membership-modal-context';

const lifeSkillItems = [
  {
    id: 1,
    title: 'Professional Development Workshops',
    description:
      'Empowering young professionals with the skills they need to succeed in the job market.',
    image: images.lifeSkillSeriesImage1,
  },
  {
    id: 2,
    title: 'Leadership Training',
    description:
      'Building strong leaders who can inspire and guide teams to achieve their goals.',
    image: images.lifeSkillSeriesImage2,
  },
  {
    id: 3,
    title: 'Networking Events',
    description:
      'Creating opportunities for meaningful connections and professional relationships.',
    image: images.lifeSkillSeriesImage3,
  },
];

export function LifeSkillSeries() {
  const [hoveredId, setHoveredId] = useState<number | null>(2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setOpen: openMembershipModal } = useMembershipModal();

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % lifeSkillItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      prev => (prev - 1 + lifeSkillItems.length) % lifeSkillItems.length
    );
  };

  return (
    <section className="bg-[#f3fcff] relative py-12 lg:py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${images.areasOfOpportunitiesDecorative.src})`,
          width: '1525.41px',
          height: '952.773px',
          transform: 'translate(-68.41px, -73.89px)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start justify-start w-full lg:w-[511px]">
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
              <div className="absolute h-[7.887px] left-[130px] top-[22px] w-[163px] lg:hidden block">
                <div className="absolute inset-[-8.33%_-0.02%_-8.32%_-0.01%]">
                  <ObserverImage
                    src={images.heroTextDecorator}
                    alt="decorative-vector"
                    className="block max-w-none size-full"
                  />
                </div>
              </div>

              <h2 className="font-bold relative z-20 text-[#001319] text-[24px] lg:text-[36px] leading-[28px] lg:leading-[40px] text-center lg:text-left">
                The Life Skill Series
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-base lg:text-lg leading-6 lg:leading-[26px] w-full lg:w-[480px] text-center lg:text-left">
                Connect. Learn. Grow: Life Skill Series is an initiative of JCI
                Continental Lagos that connects you with the resources and tools you
                need to enhance your skills, aid your personal development, and
                propel your career forward.
              </p>
            </div>

            {/* CTA Button */}
            {/* <Button
              className="w-fit"
              onClick={() => openMembershipModal(true)}
            >
              Become A Member
            </Button> */}
          </div>

          {/* Desktop Interactive Images - Hidden on mobile */}
          <div className="hidden lg:flex gap-3 h-[352px] items-center justify-start w-[589px]">
            {lifeSkillItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex-1 h-full relative"
                onHoverStart={() => setHoveredId(item.id)}
                layout
              >
                <motion.div
                  className="h-full w-full relative overflow-hidden rounded-2xl"
                  animate={{
                    width: hoveredId === item.id ? '339px' : '100%',
                    zIndex: hoveredId === item.id ? 10 : 1,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Background Image */}
                  <div className="h-full w-full relative">
                    <ObserverImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {hoveredId !== item.id && (
                      <div className="absolute animate-in-fade inset-0 bg-[#00131943]" />
                    )}
                  </div>

                  {/* Overlay Content */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <motion.div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Text Overlay */}
                        <motion.div
                          className="absolute bottom-0 left-0 text-white right-0 bg-[linear-gradient(179.68deg,rgba(0,97,127,0)_0.28%,#001319_79.85%)] p-4 rounded-xl"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          <h3 className="font-bold text-xl leading-6 mb-2">
                            {item.title}
                          </h3>
                          <p className="font-inter font-normal text-sm leading-[22px] opacity-80">
                            {item.description}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel - Hidden on desktop */}
          <div className="lg:hidden flex flex-col gap-8 items-center w-full">
            {/* Carousel Container */}
            <div className="relative w-full h-[369px] overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-x-3"
                style={{ transform: `translateX(-${currentSlide * 103}%)` }}
              >
                {lifeSkillItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="bg-white h-[369px] overflow-hidden relative rounded-[12px] mx-auto w-full">
                      {/* Background Image */}
                      <div className="absolute bg-center bg-cover bg-no-repeat h-[440px] left-0 top-[-30px] w-full">
                        <ObserverImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Overlay - Always visible on mobile */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute bottom-0 left-0 text-white right-0 bg-[linear-gradient(179.68deg,rgba(0,97,127,0)_0.28%,#001319_79.85%)] p-4 rounded-xl">
                          <h3 className="font-bold text-[#feffff] text-[20px] w-[295px] leading-[24px]">
                            {item.title}
                          </h3>
                          <p className="font-inter font-normal text-[#fbfeff] text-[14px] opacity-80 leading-[22px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-8 items-center justify-center">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full w-[65px] h-[65px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#0398c8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="bg-white rounded-full w-[65px] h-[65px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow rotate-180"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#0398c8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
