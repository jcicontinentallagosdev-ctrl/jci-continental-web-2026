"use client";

import { useEffect } from "react";

/** Moves focus to an element once, so screen readers announce the page's new state after an action. */
export function FocusOnMount({ id }: { id: string }) {
  useEffect(() => {
    document.getElementById(id)?.focus({ preventScroll: true });
  }, [id]);
  return null;
}
