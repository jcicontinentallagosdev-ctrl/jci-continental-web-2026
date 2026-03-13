'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface MembershipModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MembershipModalContext = createContext<
  MembershipModalContextValue | undefined
>(undefined);

export function MembershipModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback((value: boolean) => setOpenState(value), []);

  return (
    <MembershipModalContext.Provider value={{ open, setOpen }}>
      {children}
    </MembershipModalContext.Provider>
  );
}

export function useMembershipModal() {
  const context = useContext(MembershipModalContext);
  if (!context) {
    throw new Error(
      'useMembershipModal must be used within a MembershipModalProvider'
    );
  }
  return context;
}
