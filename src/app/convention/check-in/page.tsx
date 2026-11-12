import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, DownloadIcon, SearchIcon } from "../_components/icons";
import { SubmitButton } from "../_components/submit-button";
import { buttonClasses, Card, cx, nudge, PageShell, Pill } from "../_components/ui";
import type { Registration } from "../_lib/db";
import { displayPhone, formatNaira, formatTime } from "../_lib/format";
import { getStats, searchRegistrations } from "../_lib/registrations";
import { isStaff } from "../_lib/staff";
import { checkInFromDesk, lockDesk } from "./actions";
import { UnlockForm } from "./unlock-form";

export const metadata: Metadata = { title: "Check-in desk · JCI Continental Lagos", robots: { index: false } };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; next?: string }> };

export default async function CheckInDeskPage({ searchParams }: Props) {
  const { q = "", next } = await searchParams;

  if (!(await isStaff())) {
    return (
      <PageShell className="max-w-md">
        <UnlockForm next={next} />
      </PageShell>
    );
  }

  const [stats, results] = await Promise.all([getStats(), searchRegistrations(q)]);

  return (
    <PageShell className="max-w-3xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Pill>Staff only</Pill>
          <h1 className="cv-display text-4xl text-(--cv-ink)">Check-in desk</h1>
        </div>
        <form action={lockDesk}>
          <SubmitButton pendingLabel="Locking…" variant="ghost" size="md">
            Lock this device
          </SubmitButton>
        </form>
      </header>

      {stats.receiptsToCheck > 0 && (
        <Link
          href="/convention/check-in/payments"
          className="group/btn flex items-center justify-between gap-3 border-2 border-(--cv-ink) bg-(--cv-sun) p-4 font-sans font-bold text-(--cv-ink) shadow-(--cv-shadow) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand)"
        >
          {stats.receiptsToCheck} transfer {stats.receiptsToCheck === 1 ? "receipt" : "receipts"} to check
          <ArrowRightIcon className={nudge.forward} />
        </Link>
      )}

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Checked in" value={`${stats.checkedIn} / ${stats.confirmed}`} strong />
        <Stat label="Members" value={stats.members} />
        <Stat label="Guests" value={stats.guests} />
        <Stat label="Collected" value={formatNaira(stats.revenueKobo)} />
      </dl>

      <Card className="space-y-4 p-5">
        <p className="leading-7">
          <strong className="text-(--cv-ink)">To scan:</strong> open your phone camera and point it at the attendee&apos;s QR code,
          then tap the link. Their ticket opens with a <em>Check in</em> button.
        </p>
        <form role="search" className="flex gap-2">
          <label htmlFor="cv-desk-q" className="sr-only">
            Search attendees
          </label>
          <input
            id="cv-desk-q"
            name="q"
            defaultValue={q}
            type="search"
            placeholder="Name, email, phone or ticket code"
            className="h-12 min-w-0 flex-1 border-2 border-(--cv-input-line) px-4 text-base outline-none focus:border-(--cv-brand-strong) focus:ring-[3px] focus:ring-(--cv-brand)/30"
          />
          <button type="submit" className={buttonClasses("primary", "md", "h-12")}>
            <SearchIcon />
            <span className="sr-only sm:not-sr-only">Search</span>
          </button>
        </form>
      </Card>

      {q ? (
        results.length > 0 ? (
          <ul className="space-y-3" aria-label={`${results.length} matching attendees`}>
            {results.map((r) => (
              <AttendeeRow key={r.id} registration={r} />
            ))}
          </ul>
        ) : (
          <p className="bg-(--cv-surface) p-5 text-center">
            No one matches &ldquo;{q}&rdquo;. Check the spelling, or try their phone number or ticket code.
          </p>
        )
      ) : (
        <p className="text-center text-(--cv-muted)">Search for anyone whose QR code won&apos;t scan or who can&apos;t find their ticket.</p>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-(--cv-line) pt-5 text-sm text-(--cv-muted)">
        <span>
          {stats.awaitingTransfer > 0
            ? `${stats.awaitingTransfer} ${stats.awaitingTransfer === 1 ? "guest hasn't" : "guests haven't"} sent a transfer receipt yet.`
            : "No guests waiting on a transfer."}
        </span>
        <div className="flex flex-wrap gap-3">
          <Link href="/convention/check-in/payments" className={buttonClasses("secondary", "md")}>
            Payments
          </Link>
          <a href="/convention/check-in/export.csv" className={buttonClasses("secondary", "md")}>
            <DownloadIcon />
            Download attendee list (CSV)
          </a>
        </div>
      </footer>
    </PageShell>
  );
}

function Stat({ label, value, strong }: { label: string; value: string | number; strong?: boolean }) {
  return (
    <div className={cx("p-4", strong ? "bg-(--cv-ink) text-white" : "bg-(--cv-surface)")}>
      <dt className={cx("text-sm", strong ? "text-(--cv-on-ink-accent)" : "text-(--cv-muted)")}>{label}</dt>
      <dd className={cx("font-sans text-2xl font-bold", !strong && "text-(--cv-ink)")}>{value}</dd>
    </div>
  );
}

function AttendeeRow({ registration: r }: { registration: Registration }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border-2 border-(--cv-ink) bg-white p-4">
      <div className="min-w-0 space-y-0.5">
        <Link href={`/convention/ticket/${r.ticketToken}`} className="font-sans text-lg font-bold break-words text-(--cv-ink) underline-offset-2 hover:underline">
          {r.fullName}
        </Link>
        <p className="text-sm break-all text-(--cv-muted)">
          <span className="font-mono font-semibold text-(--cv-text)">{r.ticketCode}</span> · {r.email} · {displayPhone(r.phone)}
        </p>
        <p className="text-sm">{r.attendeeType === "member" ? "Member" : "Guest"}</p>
      </div>

      {r.status !== "confirmed" ? (
        <Link
          href={`/convention/ticket/${r.ticketToken}`}
          className="rounded-full bg-(--cv-danger-bg) px-3 py-1.5 text-sm font-semibold text-(--cv-danger) underline-offset-2 hover:underline"
        >
          Not paid · Review
        </Link>
      ) : r.checkedInAt ? (
        <form action={checkInFromDesk} className="flex items-center gap-3">
          <input type="hidden" name="token" value={r.ticketToken} />
          <input type="hidden" name="intent" value="undo" />
          <span className="rounded-full bg-(--cv-success-bg) px-3 py-1.5 text-sm font-semibold text-(--cv-success)">
            In at {formatTime(r.checkedInAt)}
          </span>
          <SubmitButton pendingLabel="Undoing…" variant="ghost" size="md">
            Undo
          </SubmitButton>
        </form>
      ) : (
        <form action={checkInFromDesk}>
          <input type="hidden" name="token" value={r.ticketToken} />
          <SubmitButton pendingLabel="Checking in…" size="md">
            Check in
          </SubmitButton>
        </form>
      )}
    </li>
  );
}
