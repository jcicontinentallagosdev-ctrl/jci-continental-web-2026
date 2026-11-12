"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wrap the main site's header in this. On /convention pages it renders nothing,
 * so the convention's own header (logo + "Back to the website") takes its place.
 */
export function HideOnConvention({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/convention") ? null : children;
}
