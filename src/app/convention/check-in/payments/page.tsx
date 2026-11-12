import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, FileIcon } from "../../_components/icons";
import { Callout, cx, PageShell, Pill } from "../../_components/ui";
import { isSampleAccount, RETURN_REASONS } from "../../_lib/bank";
import { convention } from "../../_lib/config";
import { displayPhone, firstName, formatDateTime, formatNaira } from "../../_lib/format";
import { isDbFatal, resetDb } from "../../_lib/db";
import {
  findRegistrationByCode,
  getConfirmedMoneyStats,
  listAwaitingTransfer,
  listReceiptsToReview,
  type AwaitingTransfer,
  type ReceiptToReview,
} from "../../_lib/registrations";
import { isStaff } from "../../_lib/staff";
import { UnlockForm } from "../unlock-form";
import { AddPaidGuest } from "./add-paid-guest";
import { ConfirmPaymentButton, RemindPaymentButton, ReturnPaymentForm } from "./payment-buttons";

export const metadata: Metadata = { title: "Payments to confirm · JCI Continental Lagos", robots: { index: false } };
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    confirmed?: string;
    returned?: string;
    reminded?: string;
    added?: string;
    existing?: string;
    email?: string;
    error?: string;
    missing?: string;
  }>;
};

/**
 * Where the treasurer matches payments with the chapter's bank account: receipts to check, guests
 * still waiting to pay (confirm or remind them), and people who paid outside the site.
 */
export default async function PaymentsPage({ searchParams }: Props) {
  const query = await searchParams;

  if (!(await isStaff())) {
    return (
      <PageShell className="max-w-md">
        <UnlockForm next="/convention/check-in/payments" />
      </PageShell>
    );
  }

  // Each flash message names the guest by ticket code, so no names or emails go in the URL.
  const code = query.confirmed ?? query.returned ?? query.reminded ?? query.added;
  // One connection against Supabase's transaction pooler (max:1). Run queries one after
  // another — Promise.all piled concurrent work onto that socket and could fail, then
  // retry the whole set (looked like the page was stuck in a loop). Retry once if a dead
  // socket poisoned the previous client.
  const loadDesk = async () => {
    const toReview = await listReceiptsToReview();
    const awaiting = await listAwaitingTransfer();
    const money = await getConfirmedMoneyStats();
    const reviewed = code ? await findRegistrationByCode(code) : null;
    // List lengths are the same counts getStats would recompute — no second receipts scan.
    return {
      toReview,
      awaiting,
      stats: {
        receiptsToCheck: toReview.length,
        awaitingTransfer: awaiting.length,
        guests: money.guests,
        revenueKobo: money.revenueKobo,
        cashKobo: money.cashKobo,
      },
      reviewed,
    };
  };
  let desk;
  try {
    desk = await loadDesk();
  } catch (error) {
    if (!isDbFatal(error)) throw error;
    console.error("[convention] Payments desk DB connection failed; retrying", error);
    resetDb();
    desk = await loadDesk();
  }
  const { toReview, awaiting, stats, reviewed } = desk;
  const who = reviewed ? firstName(reviewed.fullName) : code;
  const { bankName, accountNumber } = convention.bankTransfer;
  const price = formatNaira(convention.guestPriceNaira * 100);

  return (
    <PageShell className="max-w-3xl space-y-6">
      <header className="space-y-3">
        <Link href="/convention/check-in" className="group/btn inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-(--cv-brand-strong)">
          <ArrowLeftIcon width={16} height={16} />
          Check-in desk
        </Link>
        <div className="space-y-2">
          <Pill>Staff only</Pill>
          <h1 className="cv-display text-4xl text-(--cv-ink)">Payments to confirm</h1>
          <p className="max-w-2xl leading-7 text-(--cv-text)">
            Open the {bankName} account ending {accountNumber.slice(-4)} and find each guest&apos;s {price} credit. Their ticket code should be in the transfer description.
            Confirm only what you can see in the account: receipts can be faked.
          </p>
        </div>
      </header>

      {isSampleAccount() && (
        <Callout tone="danger" title="The account in config.ts is still the sample one">
          <p>Put the chapter&apos;s real account details in before guests start paying.</p>
        </Callout>
      )}

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="To check" value={stats.receiptsToCheck} strong />
        <Stat label="Waiting for a transfer" value={stats.awaitingTransfer} />
        <Stat label="Guests confirmed" value={stats.guests} />
        <Stat label="Collected" value={formatNaira(stats.revenueKobo)} note={stats.cashKobo > 0 ? `${formatNaira(stats.cashKobo)} of it in cash` : undefined} />
      </dl>

      <div role="status" className="empty:hidden">
        {query.confirmed && (
          <Callout tone={query.email ? "warning" : "success"} title={`${who} is confirmed`}>
            <p>
              {query.email
                ? "Their seat is confirmed, but the ticket email didn't go out. They can use \"Resend my ticket\" on the convention page."
                : "Their ticket is on its way by email."}
            </p>
          </Callout>
        )}
        {query.returned && (
          <Callout tone={query.email ? "warning" : "info"} title={`Receipt sent back to ${who}`}>
            <p>
              {query.email
                ? "We saved your reason, but the email to them didn't go out. Their page shows it next time they open it."
                : "They've been emailed your reason and a link to send a new receipt."}
            </p>
          </Callout>
        )}
        {query.reminded && (
          <Callout tone={query.email ? "warning" : "info"} title={query.email ? `The reminder to ${who} didn't go out` : `Reminder sent to ${who}`}>
            <p>
              {query.email
                ? `Try again in a minute${reviewed ? `, or call them on ${displayPhone(reviewed.phone)}` : ""}.`
                : "They've been emailed the account details and the link to send their receipt."}
            </p>
          </Callout>
        )}
        {query.added && (
          <Callout tone={query.email ? "warning" : "success"} title={query.existing ? `${who} is confirmed` : `${who} is added and confirmed`}>
            <p>
              {query.existing &&
                `They'd already started registering, so we confirmed that registration (${query.added}) instead of adding a second one. `}
              {query.email
                ? "Their ticket email didn't go out. They can use \"Resend my ticket\" on the convention page."
                : `${query.existing ? "Their ticket" : `Ticket ${query.added}`} is on its way${reviewed ? ` to ${reviewed.email}` : ""}.`}
            </p>
          </Callout>
        )}
        {query.error && (
          <Callout tone="danger" title="That didn't save">
            <p>Check your connection and try again. If someone else already reviewed it, it will have left this list.</p>
          </Callout>
        )}
      </div>

      <section aria-labelledby="receipts-title" className="space-y-4 pt-2">
        <SectionTitle id="receipts-title" count={toReview.length}>
          Receipts to check
        </SectionTitle>
        {toReview.length > 0 ? (
          <ul className="space-y-5">
            {toReview.map((item) => (
              <ReceiptCard key={item.receipt.id} item={item} missingReason={query.missing === item.receipt.id} />
            ))}
          </ul>
        ) : (
          <div className="space-y-1 bg-(--cv-surface) p-5">
            <p className="font-sans text-lg font-bold text-(--cv-ink)">All caught up</p>
            <p className="text-(--cv-muted)">New receipts appear here as guests send them.</p>
          </div>
        )}
      </section>

      <section id="waiting" aria-labelledby="waiting-title" className="scroll-mt-32 space-y-4 pt-2">
        <div className="space-y-1">
          <SectionTitle id="waiting-title" count={awaiting.length}>
            Waiting for a transfer
          </SectionTitle>
          <p className="max-w-2xl leading-7 text-(--cv-text)">
            Registered, but no receipt to check. If their {price} is in the account, confirm it: they don&apos;t need to send a
            receipt. If it isn&apos;t, send a reminder.
          </p>
        </div>
        {awaiting.length > 0 ? (
          <ul className="divide-y-2 divide-(--cv-line)/15 border-2 border-(--cv-ink) bg-white">
            {awaiting.map((item) => (
              <WaitingRow key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <p className="bg-(--cv-surface) p-5 text-(--cv-muted)">
            Nobody&apos;s waiting. Everyone who registered has sent a receipt or been confirmed.
          </p>
        )}
      </section>

      <section aria-labelledby="add-title" className="space-y-4 pt-2">
        <SectionTitle id="add-title">Paid outside the site</SectionTitle>
        <AddPaidGuest price={price} />
      </section>
    </PageShell>
  );
}

function SectionTitle({ id, count, children }: { id: string; count?: number; children: string }) {
  return (
    <h2 id={id} className="font-sans text-2xl font-bold text-(--cv-ink)">
      {children}
      {count !== undefined && <span className="font-semibold text-(--cv-muted)"> ({count})</span>}
    </h2>
  );
}

function Stat({ label, value, note, strong }: { label: string; value: string | number; note?: string; strong?: boolean }) {
  return (
    <div className={cx("p-4", strong ? "bg-(--cv-ink) text-white" : "bg-(--cv-surface)")}>
      <dt className={cx("text-sm", strong ? "text-(--cv-on-ink-accent)" : "text-(--cv-muted)")}>{label}</dt>
      <dd className={cx("font-sans text-2xl font-bold", !strong && "text-(--cv-ink)")}>{value}</dd>
      {note && <dd className="text-sm text-(--cv-muted)">{note}</dd>}
    </div>
  );
}

/** A guest who registered but hasn't sent a receipt: confirm them if the money's there, or nudge them. */
function WaitingRow({ item }: { item: AwaitingTransfer }) {
  const price = formatNaira(item.amountDueKobo);
  // Skip optional timestamps that aren't real dates (Invalid Date is truthy and used to crash formatDateTime).
  const ok = (value: Date | string | null | undefined) =>
    value != null && value !== "" && !Number.isNaN(new Date(value).getTime());
  const history = [
    `Registered ${formatDateTime(item.createdAt)}`,
    ok(item.lastReturnedAt) && `receipt sent back ${formatDateTime(item.lastReturnedAt!)}`,
    ok(item.instructionsSentAt) && `details last emailed ${formatDateTime(item.instructionsSentAt!)}`,
  ].filter(Boolean);

  return (
    <li className="space-y-3 p-4 sm:p-5">
      <div className="space-y-1">
        <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-lg font-bold break-words text-(--cv-ink)">
          {item.fullName}
          <span className="bg-(--cv-sun) px-2 py-0.5 font-mono text-sm tracking-[0.06em]">{item.ticketCode}</span>
        </h3>
        <p className="text-sm text-(--cv-muted)">{history.join(" · ")}</p>
        <p className="text-sm break-all text-(--cv-muted)">
          {item.email} ·{" "}
          <a href={`tel:${item.phone}`} className="underline underline-offset-2">
            {displayPhone(item.phone)}
          </a>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <ConfirmPaymentButton registrationId={item.id} variant="secondary" size="md">
          Confirm {price} received
        </ConfirmPaymentButton>
        <RemindPaymentButton registrationId={item.id}>Send a reminder</RemindPaymentButton>
      </div>
    </li>
  );
}

function ReceiptCard({ item, missingReason }: { item: ReceiptToReview; missingReason: boolean }) {
  const { receipt } = item;
  const href = `/convention/check-in/receipts/${receipt.id}`;
  const isPdf = receipt.contentType === "application/pdf";
  const price = formatNaira(item.amountDueKobo);
  const first = firstName(item.fullName);

  return (
    <li id={`receipt-${receipt.id}`} className="scroll-mt-32 border-2 border-(--cv-ink) bg-white shadow-(--cv-shadow)">
      <div className="grid gap-4 p-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:p-5">
        {/*
          Open on click only — do not embed <img src> for every receipt. Each image is a
          full BYTEA read over the single DB connection, and N of them on page load queued
          up behind each other (and behind the desk queries) so the page felt stuck.
        */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex h-48 flex-col items-center justify-center gap-2 border-2 border-(--cv-line)/20 bg-(--cv-surface) px-3 text-center font-sans text-sm font-bold text-(--cv-brand-strong) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand) sm:h-[200px]"
        >
          <FileIcon width={32} height={32} />
          {isPdf ? "Open PDF receipt" : "Open receipt"}
        </a>

        <div className="min-w-0 space-y-3">
          <div className="space-y-1">
            <h3 className="font-sans text-xl font-bold break-words text-(--cv-ink)">{item.fullName}</h3>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="bg-(--cv-sun) px-2 py-0.5 font-mono font-bold tracking-[0.06em] text-(--cv-ink)">{item.ticketCode}</span>
              <span className="font-semibold text-(--cv-ink)">{price}</span>
              <span className="text-(--cv-muted)">Sent {formatDateTime(receipt.createdAt)}</span>
            </p>
            <p className="text-sm break-all text-(--cv-muted)">
              {item.email} ·{" "}
              <a href={`tel:${item.phone}`} className="underline underline-offset-2">
                {displayPhone(item.phone)}
              </a>
            </p>
          </div>

          <ConfirmPaymentButton registrationId={item.id} size="md" className="w-full sm:w-auto">
            Confirm {price} received
          </ConfirmPaymentButton>

          <details open={missingReason} className="group border-t border-(--cv-line)/15 pt-3">
            <summary className="cursor-pointer list-none font-sans text-[15px] font-semibold text-(--cv-ink) underline decoration-2 underline-offset-4 outline-none hover:decoration-(--cv-brand) focus-visible:ring-[3px] focus-visible:ring-(--cv-brand) [&::-webkit-details-marker]:hidden">
              Can&apos;t find it? Send it back
            </summary>
            <ReturnPaymentForm receiptId={receipt.id} firstName={first}>
              <fieldset className="space-y-2">
                <legend className="mb-2 font-sans text-[15px] font-bold text-(--cv-ink)">Tell {first} why</legend>
                {RETURN_REASONS.map((reason, i) => (
                  <label key={reason} className="flex cursor-pointer items-start gap-3 text-[15px] leading-6">
                    <input type="radio" name="reason" value={reason} defaultChecked={i === 0} className="mt-1 size-5 shrink-0 accent-(--cv-brand-strong)" />
                    {reason}
                  </label>
                ))}
              </fieldset>
              <div className="space-y-1.5">
                <label htmlFor={`note-${receipt.id}`} className="block font-sans text-[15px] font-bold text-(--cv-ink)">
                  Add a note <span className="font-normal text-(--cv-muted)">(optional)</span>
                </label>
                <textarea
                  id={`note-${receipt.id}`}
                  name="note"
                  rows={2}
                  maxLength={500}
                  className="block w-full rounded-(--cv-radius-field) border-2 border-(--cv-input-line) bg-white px-4 py-3 text-base text-(--cv-ink) outline-none focus:border-(--cv-control-line) focus:shadow-(--cv-shadow-focus)"
                />
              </div>
              {missingReason && <p className="text-sm font-medium text-(--cv-danger)">Pick a reason or write a note, so {first} knows what to do.</p>}
            </ReturnPaymentForm>
          </details>
        </div>
      </div>
    </li>
  );
}

