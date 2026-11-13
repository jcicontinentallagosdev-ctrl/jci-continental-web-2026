import type { ReactNode } from "react";
import { CopyButton } from "../../_components/copy-button";
import { Callout, Card, cx } from "../../_components/ui";
import { helpLink, isSampleAccount, RECEIPT_ERRORS, transferDetails, type ReceiptError } from "../../_lib/bank";
import { convention } from "../../_lib/config";
import type { Receipt, Registration } from "../../_lib/db";
import { firstName, formatDateTime, formatNaira } from "../../_lib/format";
import { FocusOnMount } from "./focus-on-mount";
import { ReceiptForm } from "./receipt-form";

type Props = {
  registration: Registration;
  receipt: Receipt | null;
  /** Just registered (from the form), or just sent a receipt (from the upload). */
  isNew: boolean;
  justSent: boolean;
  /** Set when the no-JavaScript upload came back with a problem. */
  uploadError?: string;
};

/**
 * A guest's payment page until their transfer is confirmed. One of three moments:
 * pay (no receipt yet), checking (receipt with staff) or returned (staff sent it back, with a reason).
 */
export function TransferSteps({ registration, receipt, isNew, justSent, uploadError }: Props) {
  const name = firstName(registration.fullName);
  const price = formatNaira(registration.amountDueKobo);
  const moment = receipt?.status === "submitted" ? "checking" : receipt?.status === "rejected" ? "returned" : "pay";
  const errorMessage = uploadError && uploadError in RECEIPT_ERRORS ? RECEIPT_ERRORS[uploadError as ReceiptError] : undefined;
  const help = helpLink(registration.ticketCode);

  const helpLine = (
    <p className="text-center text-sm leading-6 text-(--cv-muted)">
      Paid from someone else&apos;s account, or stuck?{" "}
      <a
        href={help.href}
        {...(help.external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="font-semibold text-(--cv-brand-strong) underline underline-offset-2"
      >
        {help.label}
      </a>
    </p>
  );

  if (moment === "checking" && receipt) {
    return (
      <div className="space-y-6">
        {/* Scroll to the top of this flow — action redirects keep the old page scroll. */}
        {(justSent || isNew) && <FocusOnMount id="cv-transfer-title" />}
        <header className="space-y-2 text-center">
          <h1 id="cv-transfer-title" tabIndex={-1} className="cv-display text-4xl text-balance text-(--cv-ink) outline-none">
            {justSent ? `Receipt received, ${name}!` : "We're checking your transfer"}
          </h1>
          <p className="leading-7 text-(--cv-text)">
            We got your receipt on {formatDateTime(receipt.createdAt)} and we&apos;re matching it with our account. Your ticket
            will be emailed to <strong className="text-(--cv-ink)">{registration.email}</strong>{" "}
            {convention.bankTransfer.reviewTime}.
          </p>
        </header>
        <Callout tone="info" title="No need to pay again">
          <p>Your seat is held while we check. You can close this page; the ticket comes by email.</p>
        </Callout>
        <details className="group rounded-(--cv-radius) border-2 border-(--cv-line) bg-white">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 font-sans font-semibold text-(--cv-ink) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand)/40 [&::-webkit-details-marker]:hidden">
            Sent the wrong file? Send a different receipt
            <span aria-hidden="true" className="text-xl text-(--cv-brand-strong) transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="space-y-4 px-5 pb-5">
            <p className="text-sm text-(--cv-muted)">The new receipt replaces the one we have.</p>
            <ReceiptForm token={registration.ticketToken} submitLabel="Send this receipt instead" initialError={errorMessage} />
          </div>
        </details>
        {helpLine}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* New guests come from #register mid-page; force the bank details into view. */}
      {isNew && <FocusOnMount id="cv-transfer-title" />}
      <header className="space-y-2 text-center">
        <h1 id="cv-transfer-title" tabIndex={-1} className="cv-display text-4xl text-balance text-(--cv-ink) outline-none">
          {moment === "returned" ? "We couldn't confirm your transfer yet" : isNew ? `You're almost in, ${name}` : "Complete your transfer"}
        </h1>
        <p className="leading-7 text-(--cv-text)">
          {moment === "returned"
            ? "Your seat is still held. Here's what we need from you."
            : `Your seat is held. Transfer ${price}, then send us your receipt and we'll email your ticket.`}
          {isNew && (
            <>
              {" "}
              We&apos;ve also emailed these details to <strong className="text-(--cv-ink)">{registration.email}</strong>.
            </>
          )}
        </p>
      </header>

      {moment === "returned" && receipt?.reviewNote && (
        <Callout tone="warning" title="About the receipt you sent">
          <p className="whitespace-pre-line">{receipt.reviewNote}</p>
          <p>If you&apos;ve paid, send a clearer receipt below. If you haven&apos;t, transfer first.</p>
        </Callout>
      )}

      <Step number={1} title={`Transfer ${price}`}>
        {isSampleAccount() && (
          <Callout tone="danger" title="Sample account details">
            <p>The real account goes in before launch. Don&apos;t pay into these.</p>
          </Callout>
        )}
        <dl className="divide-y divide-(--cv-line)/15 border-y-2 border-(--cv-ink)">
          {transferDetails(registration.ticketCode).map((row) => (
            <div
              key={row.label}
              className={cx("flex items-center justify-between gap-3 py-3", row.label === "Description" && "-mx-3 bg-(--cv-sun) px-3")}
            >
              <div className="min-w-0">
                <dt className="text-sm text-(--cv-muted)">{row.label}</dt>
                <dd
                  className={cx(
                    "font-sans text-lg font-bold break-words text-(--cv-ink)",
                    (row.label === "Account number" || row.label === "Description") && "font-mono tracking-[0.06em]",
                  )}
                >
                  {row.value}
                </dd>
              </div>
              {row.copy && <CopyButton value={row.copy} label={row.label.toLowerCase()} />}
            </div>
          ))}
        </dl>
        <p className="text-sm leading-6 text-(--cv-text)">
          Put <strong className="font-mono text-(--cv-ink)">{registration.ticketCode}</strong> in the transfer description
          (some banks call it narration or remark), so we can match your payment quickly.
        </p>
      </Step>

      <Step number={2} title="Send your receipt">
        <p className="text-sm leading-6 text-(--cv-text)">
          Once the transfer has gone through, take a screenshot of the receipt in your bank app and send it here.
        </p>
        <ReceiptForm
          token={registration.ticketToken}
          submitLabel={moment === "returned" ? "Send new receipt" : "I've paid: send receipt"}
          initialError={errorMessage}
        />
      </Step>

      {helpLine}
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <Card className="space-y-4 p-5 sm:p-6">
      <h2 className="flex items-center gap-3 font-sans text-xl font-bold text-(--cv-ink)">
        <span className="flex size-9 shrink-0 items-center justify-center border-2 border-(--cv-ink) bg-(--cv-sun) text-base">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </Card>
  );
}
