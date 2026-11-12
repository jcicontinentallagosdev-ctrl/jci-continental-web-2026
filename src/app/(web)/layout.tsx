import React from 'react';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { MembershipModal } from '@/components/shared/membership-modal';
import { MembershipModalProvider } from '@/context/membership-modal-context';
// Hide the main site header on /convention (that route has its own chrome)
import { HideOnConvention } from '../convention/_components/hide-on-convention';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MembershipModalProvider>
      <div>
        <HideOnConvention>
          <Navbar />
        </HideOnConvention>
        {/* Clear fixed header + optional convention banner height */}
        <div className="pt-[calc(77px+var(--convention-banner-h,0px))] lg:pt-[calc(100px+var(--convention-banner-h,0px))]">
          {children}
        </div>
        <Footer />
      </div>
      <MembershipModal />
    </MembershipModalProvider>
  );
};

export default WebLayout;
