"use client";

import { useEffect } from "react";

/**
 * After register → ticket (or receipt upload), bring the payment/ticket heading into view.
 * Server-action redirects keep the previous page's scroll, so guests were landing on the
 * ticket card at the bottom and missing the bank account details above.
 */
export function FocusOnMount({ id }: { id: string }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [id]);
  return null;
}
