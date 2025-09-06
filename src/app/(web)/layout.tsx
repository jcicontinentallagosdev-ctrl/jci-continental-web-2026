import React from 'react';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="lg:pt-[100px] pt-[77px]">{children}</div>
      <Footer />
    </div>
  );
};

export default WebLayout;
