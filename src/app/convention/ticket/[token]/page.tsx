import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarIcon, ClockIcon, DownloadIcon, PinIcon } from "../../_components/icons";
import { buttonClasses, Card, PageShell, Pill } from "../../_components/ui";
import { convention } from "../../_lib/config";
import { admissionLabel, eventTimeRange, firstName, formatDate, formatNaira, googleCalendarUrl } from "../../_lib/format";
import { ticketQrSvg } from "../../_lib/qr";
import { findRegistrationByToken, latestReceipt } from "../../_lib/registrations";
import { isStaff } from "../../_lib/staff";
import { StaffPanel } from "./staff-panel";
import { TransferSteps } from "./transfer-steps";

export const metadata: Metadata = {
  title: "Your ticket · JCI Continental Lagos",
  robots: { index: false, follow: false },
  referrer: "no-referrer", // the URL is the ticket; don't leak it to other sites
};

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ new?: string; sent?: string; receipt?: string }>;
};

export default async function TicketPage({ params, searchParams }: Props) {
  const [{ token }, query] = await Promise.all([params, searchParams]);
  const registration = await findRegistrationByToken(token);
  if (!registration || registration.status === "cancelled") notFound();

  const staff = await isStaff();
  const confirmed = registration.status === "confirmed";
  // Members are confirmed when they register, so only guests ever wait on a transfer.
  const awaitingTransfer = !confirmed && registration.attendeeType === "guest";
  const receipt = awaitingTransfer ? await latestReceipt(registration.id) : null;
  const qrSvg = confirmed ? await ticketQrSvg(token) : null;
  const name = firstName(registration.fullName);

  return (
    <PageShell className="max-w-lg space-y-6">
      {staff && (
        <StaffPanel
          token={token}
          firstName={name}
          initial={{ status: registration.status, checkedInAt: registration.checkedInAt?.toISOString() ?? null }}
          price={formatNaira(registration.amountDueKobo)}
          receipt={
            receipt?.status === "submitted"
              ? { id: receipt.id, sentAt: receipt.createdAt.toISOString(), isPdf: receipt.contentType === "application/pdf" }
              : null
          }
        />
      )}

      {!staff && confirmed && (
        <header className="space-y-2 text-center">
          <h1 className="cv-display text-4xl text-balance text-(--cv-ink)">
            Your ticket
          </h1>
          <p className="text-(--cv-muted)">We&apos;ve also emailed this ticket to {registration.email}.</p>
        </header>
      )}

      {!staff && awaitingTransfer && (
        <TransferSteps
          registration={registration}
          receipt={receipt}
          isNew={query.new === "1"}
          justSent={query.sent === "1"}
          uploadError={query.receipt}
        />
      )}

      <Card className="overflow-hidden">
        <div className="space-y-1 bg-(--cv-ink) px-6 py-5 text-white">
          <p className="font-sans text-xs font-bold tracking-[0.08em] text-(--cv-on-ink-accent) uppercase">
            JCI Continental Lagos
          </p>
          <p className="font-sans text-lg leading-snug font-bold">{convention.name}</p>
        </div>

        <div className="space-y-6 p-6">
          {qrSvg ? (
            <div className="mx-auto w-full max-w-[260px] space-y-3 text-center">
              <div
                className="cv-qr border-2 border-(--cv-ink) p-2"
                role="img"
                aria-label={`QR code for ticket ${registration.ticketCode}`}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="font-mono text-xl font-bold tracking-[0.12em] text-(--cv-ink)">{registration.ticketCode}</p>
            </div>
          ) : (
            <p className="bg-(--cv-surface) p-4 text-center text-sm text-(--cv-muted)">
              Your QR code appears here once we&apos;ve confirmed your transfer.
            </p>
          )}

          <div className="space-y-1 text-center">
            <p className="font-sans text-2xl font-bold break-words text-(--cv-ink)">{registration.fullName}</p>
            <Pill>{confirmed ? admissionLabel(registration) : receipt?.status === "submitted" ? "Guest · Checking payment" : "Guest · Awaiting transfer"}</Pill>
          </div>

          <ul className="space-y-3 border-t border-(--cv-line) pt-5">
            <li className="flex gap-3">
              <CalendarIcon className="mt-0.5 text-(--cv-brand-strong)" />
              <span>{formatDate(convention.startsAt)}</span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 text-(--cv-brand-strong)" />
              <span>{eventTimeRange()}</span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 text-(--cv-brand-strong)" />
              <span>
                {convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "Venue to be announced. We'll email you."}
              </span>
            </li>
          </ul>
        </div>
      </Card>

      {confirmed && !staff && (
        <div className="space-y-3">
          <p className="text-center text-sm text-(--cv-muted)">
            Show this QR code at the entrance. A screenshot works too, even without internet.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`/convention/ticket/${token}/qr.png`} download={`${registration.ticketCode}-ticket.png`} className={buttonClasses("secondary", "md")}>
              <DownloadIcon />
              Save QR code
            </a>
            <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className={buttonClasses("secondary", "md")}>
              <CalendarIcon />
              Add to calendar
            </a>
          </div>
        </div>
      )}

      {!staff && (
        <p className="text-center text-sm text-(--cv-muted)">
          Event staff?{" "}
          <Link href={`/convention/check-in?next=/convention/ticket/${token}`} className="font-semibold text-(--cv-brand-strong) underline underline-offset-2">
            Unlock check-in
          </Link>
        </p>
      )}
    </PageShell>
  );
}
