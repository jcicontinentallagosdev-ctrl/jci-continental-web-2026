import React from 'react';

import { Navbar } from '@/components/shared/navbar';

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default WebLayout;
