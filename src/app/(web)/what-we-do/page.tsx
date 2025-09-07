import React from 'react';
import WhatWeDoHero from '@/container/WhatWeDo/WhatWeDoHero';
import WhatWeDoPrograms from '@/container/WhatWeDo/WhatWeDoPrograms';
import WhatWeDoInitiatives from '@/container/WhatWeDo/WhatWeDoInitiatives';
import WhatWeDoEventLocal from '@/container/WhatWeDo/WhatWeDoEventLocal';
import WhatWeDoNationalInternationalEvents from '@/container/WhatWeDo/WhatWeDoNationalInternationalEvents';
import { JoinJCI } from '@/container/Home/JoinJCI';

const WhatWeDo = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <WhatWeDoHero />
      <WhatWeDoPrograms />
      <WhatWeDoInitiatives />
      <WhatWeDoEventLocal />
      <WhatWeDoNationalInternationalEvents />
      <JoinJCI />
    </main>
  );
};

export default WhatWeDo;
