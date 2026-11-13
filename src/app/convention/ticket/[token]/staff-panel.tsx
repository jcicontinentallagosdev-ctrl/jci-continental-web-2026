"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckIcon } from "../../_components/icons";
import { SubmitButton } from "../../_components/submit-button";
import { Callout, cx } from "../../_components/ui";
import { formatDateTime, formatTime } from "../../_lib/format";
import { staffTicketAction, type StaffTicketState, type TicketSnapshot } from "../../check-in/actions";

type WaitingReceipt = { id: string; sentAt: string; isPdf: boolean };

/** What the gate team sees when they scan a ticket. One decision per screen, in big type. */
export function StaffPanel({
  token,
  firstName,
  initial,
  price,
  receipt,
  canConfirmPayment,
}: {
  token: string;
  firstName: string;
  initial: TicketSnapshot;
  price: string;
  /** A transfer receipt waiting for review, if the guest has sent one. */
  receipt: WaitingReceipt | null;
  /** Treasurer only — door staff must send unpaid guests to the payments desk. */
  canConfirmPayment: boolean;
}) {
  const [state, formAction] = useActionState<StaffTicketState, FormData>(staffTicketAction, { snapshot: initial });
  const { snapshot, event } = state;

  const verdict =
    snapshot.status !== "confirmed"
      ? receipt
        ? {
            tone: "warning" as const,
            title: "Payment not confirmed yet",
            body: canConfirmPayment
              ? `They sent a transfer receipt on ${formatDateTime(receipt.sentAt)}. Check ${price} is in the chapter's account before confirming.`
              : `They sent a transfer receipt on ${formatDateTime(receipt.sentAt)}. Send them to the payments desk — only the treasurer can confirm.`,
          }
        : { tone: "danger" as const, title: "Not paid. Don't admit yet.", body: "No transfer receipt yet. Send them to the help desk." }
      : snapshot.checkedInAt && event === "checked_in"
        ? { tone: "success" as const, title: `Checked in at ${formatTime(snapshot.checkedInAt)}`, body: `Welcome ${firstName} in!` }
        : snapshot.checkedInAt
          ? {
              tone: "warning" as const,
              title: `Already checked in at ${formatTime(snapshot.checkedInAt)}`,
              body: "This ticket has been used. Check their ID before letting them in.",
            }
          : { tone: "info" as const, title: "Valid ticket", body: event === "undone" ? "Check-in undone." : "Not checked in yet." };

  return (
    <section aria-label="Staff check-in" className="space-y-3 border-2 border-dashed border-(--cv-brand) p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-xs font-bold tracking-[0.08em] text-(--cv-brand-stronger) uppercase">Staff check-in</p>
        <Link href="/convention/check-in" className="text-sm font-semibold text-(--cv-brand-strong) underline underline-offset-2">
          Check-in desk
        </Link>
      </div>

      <div
        role="status"
        className={cx(
          "p-4",
          verdict.tone === "success" && "bg-(--cv-success-bg)",
          verdict.tone === "warning" && "bg-(--cv-warning-bg)",
          verdict.tone === "danger" && "bg-(--cv-danger-bg)",
          verdict.tone === "info" && "bg-(--cv-surface)",
        )}
      >
        <p className="flex items-center gap-2 font-sans text-xl font-bold text-(--cv-ink)">
          {verdict.tone === "success" && (
            <span className="cv-pop flex size-8 items-center justify-center rounded-full bg-(--cv-success) text-white">
              <CheckIcon width={18} height={18} strokeWidth={3} className="cv-draw" />
            </span>
          )}
          {verdict.title}
        </p>
        <p className="mt-1 text-(--cv-text)">{verdict.body}</p>
      </div>

      {event === "locked" && (
        <Callout tone="warning" title="Your staff session has ended">
          <Link className="font-semibold underline" href={`/convention/check-in?next=/convention/ticket/${token}`}>
            Unlock again
          </Link>
        </Callout>
      )}
      {event === "need_treasurer" && (
        <Callout tone="warning" title="Only the treasurer can confirm payments">
          <Link className="font-semibold underline" href="/convention/check-in/payments">
            Open the payments desk
          </Link>
        </Callout>
      )}
      {event === "error" && <Callout tone="danger" title="That didn't save. Check your connection and try again." />}

      <form action={formAction} className="flex flex-col gap-2">
        <input type="hidden" name="token" value={token} />
        {snapshot.status !== "confirmed" ? (
          canConfirmPayment ? (
            <>
              {receipt && (
                <a
                  href={`/convention/check-in/receipts/${receipt.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center font-sans font-semibold text-(--cv-brand-strong) underline underline-offset-2"
                >
                  Open their receipt{receipt.isPdf ? " (PDF)" : ""}
                </a>
              )}
              <input type="hidden" name="intent" value="confirm_payment" />
              <SubmitButton pendingLabel="Confirming…" variant="secondary" className="w-full">
                Confirm {price} received
              </SubmitButton>
              <p className="text-sm text-(--cv-muted)">
                Only once you&apos;ve seen the money in the chapter&apos;s account. Their ticket is emailed straight away.
              </p>
              {event === "still_unpaid" && <p className="text-sm text-(--cv-danger)">That didn&apos;t confirm. Refresh the page and try again.</p>}
            </>
          ) : (
            <p className="text-center text-sm text-(--cv-muted)">
              <Link href="/convention/check-in/payments" className="font-semibold text-(--cv-brand-strong) underline underline-offset-2">
                Payments desk
              </Link>{" "}
              — treasurer unlock required to confirm this guest.
            </p>
          )
        ) : snapshot.checkedInAt ? (
          <>
            <input type="hidden" name="intent" value="undo" />
            <SubmitButton pendingLabel="Undoing…" variant="ghost" size="md" className="w-full">
              Undo check-in
            </SubmitButton>
          </>
        ) : (
          <>
            <input type="hidden" name="intent" value="check_in" />
            <SubmitButton pendingLabel="Checking in…" className="w-full">
              Check in {firstName}
            </SubmitButton>
            {event === "now_paid" && (
              <p className="text-sm font-medium text-(--cv-success)">
                Payment confirmed. The ticket is now valid{state.emailSent === false ? ", but the ticket email didn't go out" : " and emailed"}.
              </p>
            )}
          </>
        )}
      </form>
    </section>
  );
}
