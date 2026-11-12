import Link from "next/link";
import { buttonClasses, Card, PageShell } from "./_components/ui";

export default function ConventionNotFound() {
  return (
    <PageShell className="max-w-xl">
      <Card className="space-y-4 p-6 sm:p-8">
        <h1 className="cv-display text-3xl text-(--cv-ink)">We couldn&apos;t find that ticket</h1>
        <p className="leading-7">
          The link may be incomplete. Open the ticket from your confirmation email, or have it sent to you again.
        </p>
        <Link href="/convention" className={buttonClasses("primary", "lg", "w-full")}>
          Go to the convention page
        </Link>
      </Card>
    </PageShell>
  );
}
