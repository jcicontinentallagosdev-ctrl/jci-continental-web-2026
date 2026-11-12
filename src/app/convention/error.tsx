"use client";

import { useEffect } from "react";
import { buttonClasses, Card, PageShell } from "./_components/ui";

export default function ConventionError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell className="max-w-xl">
      <Card className="space-y-4 p-6 sm:p-8" role="alert">
        <h1 className="cv-display text-3xl text-(--cv-ink)">This page didn&apos;t load properly</h1>
        <p className="leading-7">
          It may be your connection or a hiccup on our side. Nothing you submitted has been lost or charged twice.
        </p>
        <button type="button" onClick={reset} className={buttonClasses("primary", "lg", "w-full")}>
          Try again
        </button>
      </Card>
    </PageShell>
  );
}
