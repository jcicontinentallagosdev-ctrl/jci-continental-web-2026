import React from 'react';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { MembershipModal } from '@/components/shared/membership-modal';
import { MembershipModalProvider } from '@/context/membership-modal-context';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MembershipModalProvider>
      <div>
        <Navbar />
        <div className="lg:pt-[100px] pt-[77px]">{children}</div>
        <Footer />
      </div>
      <MembershipModal />
    </MembershipModalProvider>
  );
};

export default WebLayout;
