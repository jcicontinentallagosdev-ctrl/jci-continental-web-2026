import React from 'react';
import AboutHero from '@/container/About/AboutHero';
import AboutChangemakers from '@/container/About/AboutChangemakers';
import AboutCoreAreas from '@/container/About/AboutCoreAreas';
import AboutMissionVision from '@/container/About/AboutMissionVision';
import AboutWhatSetsUsApart from '@/container/About/AboutWhatSetsUsApart';
import { JoinJCI } from '@/container/Home/JoinJCI';

const About = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutHero />
      <AboutChangemakers />
      <AboutCoreAreas />
      <AboutMissionVision />
      <AboutWhatSetsUsApart />
      <JoinJCI />
    </main>
  );
};

export default About;
