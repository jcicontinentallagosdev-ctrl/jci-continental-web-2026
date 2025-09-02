'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import ObserverImage from '@/components/shared/obs-image';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';

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
  const [hoveredId, setHoveredId] = useState<number | null>(2); // Start with middle item open

  return (
    <section className="bg-[#f3fcff] relative py-24 overflow-hidden">
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

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex gap-[100px] items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-10 items-start justify-start w-[511px]">
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
                The Life Skill Series
              </h2>

              <p className="font-['Inter'] font-normal text-[#546165] text-lg leading-[26px] w-[480px]">
                Connect. Learn. Grow: Life Skill Series is an initiative of JCI
                Continental that connects you with the resources and tools you
                need to enhance your skills, aid your personal development, and
                propel your career forward.
              </p>
            </div>

            {/* CTA Button */}
            <Button className="w-fit">Become A Member</Button>
          </div>

          {/* Right side - Interactive Images */}
          <div className="flex gap-3 h-[352px] items-center justify-start w-[589px]">
            {lifeSkillItems.map((item, index) => (
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
        </div>
      </div>
    </section>
  );
}
