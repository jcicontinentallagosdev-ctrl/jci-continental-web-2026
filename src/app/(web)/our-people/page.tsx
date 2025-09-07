import React from 'react';
import OurPeopleHero from '@/container/OurPeople/OurPeopleHero';
import OurBoardMembers from '@/container/OurPeople/OurBoardMembers';
import { JoinJCI } from '@/container/Home/JoinJCI';

const OurPeople = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <OurPeopleHero />
      <OurBoardMembers />
      <JoinJCI />
    </main>
  );
};

export default OurPeople;
