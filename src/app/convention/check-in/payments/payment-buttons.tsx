"use client";

import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import { Spinner } from "../../_components/icons";
import { buttonClasses } from "../../_components/ui";
import { confirmPaymentFromList, remindFromList, returnPaymentFromList } from "../actions";

const PAYMENTS = "/convention/check-in/payments";

/*
 * Each button runs its server action inside a transition. The spinner stays on until the
 * navigation to the updated list has rendered, then React clears it on its own.
 * The actions call revalidatePath, so one router.replace is enough to get fresh data.
 */

export function ConfirmPaymentButton({
  registrationId,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  registrationId: string;
  children: ReactNode;
  variant?: Parameters<typeof buttonClasses>[0];
  size?: Parameters<typeof buttonClasses>[1];
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-disabled={pending}
      className={buttonClasses(variant, size, className)}
      onClick={() => {
        const formData = new FormData();
        formData.set("registrationId", registrationId);
        startTransition(async () => {
          try {
            const result = await confirmPaymentFromList(formData);
            router.replace(`${PAYMENTS}?${result.ok ? `confirmed=${result.ticketCode}` : "error=1"}`);
          } catch {
            router.replace(`${PAYMENTS}?error=1`);
          }
        });
      }}
    >
      {pending ? (
        <>
          <Spinner />
          <span>Confirming…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function RemindPaymentButton({
  registrationId,
  children,
}: {
  registrationId: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-disabled={pending}
      className={buttonClasses("ghost", "md")}
      onClick={() => {
        const formData = new FormData();
        formData.set("registrationId", registrationId);
        startTransition(async () => {
          try {
            const result = await remindFromList(formData);
            const qs = result.ok
              ? `reminded=${result.ticketCode}${result.emailSent === false ? "&email=failed" : ""}`
              : "error=1";
            router.replace(`${PAYMENTS}?${qs}`);
          } catch {
            router.replace(`${PAYMENTS}?error=1`);
          }
        });
      }}
    >
      {pending ? (
        <>
          <Spinner />
          <span>Sending…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function ReturnPaymentForm({
  receiptId,
  firstName,
  children,
}: {
  receiptId: string;
  firstName: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        // Read the form now: event.currentTarget is gone once the transition awaits.
        const formData = new FormData(event.currentTarget);
        formData.set("receiptId", receiptId);
        startTransition(async () => {
          try {
            const result = await returnPaymentFromList(formData);
            if (result.ok === false && result.missing) {
              // Keep this receipt's form open so the "pick a reason" prompt shows.
              router.replace(`${PAYMENTS}?missing=${receiptId}#receipt-${receiptId}`);
              return;
            }
            const qs = result.ok
              ? `returned=${result.ticketCode}${result.emailSent === false ? "&email=failed" : ""}`
              : "error=1";
            router.replace(`${PAYMENTS}?${qs}`);
          } catch {
            router.replace(`${PAYMENTS}?error=1`);
          }
        });
      }}
    >
      {children}
      <button type="submit" disabled={pending} aria-disabled={pending} className={buttonClasses("secondary", "md")}>
        {pending ? (
          <>
            <Spinner />
            <span>Sending…</span>
          </>
        ) : (
          <>Send back to {firstName}</>
        )}
      </button>
    </form>
  );
}
