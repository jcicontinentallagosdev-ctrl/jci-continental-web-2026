"use client";

import { useActionState, useEffect, useRef } from "react";
import { SubmitButton } from "../../_components/submit-button";
import { Callout, TextField } from "../../_components/ui";
import { addPaidGuest, type PaidGuestState } from "../actions";

const METHODS = [
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "cash", label: "Cash" },
] as const;

/**
 * For people who paid outside the site: cash, or a transfer from someone who never registered.
 * Closed until needed; it opens by itself when there's something to fix.
 */
export function AddPaidGuest({ price }: { price: string }) {
  const [state, formAction] = useActionState<PaidGuestState, FormData>(addPaidGuest, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const values = state.status === "idle" ? undefined : state.values;
  const errors = state.status === "invalid" ? state.errors : {};

  // Move focus to whatever needs reading or fixing.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid=true], fieldset[data-invalid] input")?.focus();
    }
    else if (state.status !== "idle") noticeRef.current?.focus();
  }, [state]);

  return (
    <details open={state.status !== "idle" || undefined} className="group rounded-(--cv-radius) border-2 border-(--cv-line) bg-white">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 font-sans font-semibold text-(--cv-ink) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand)/40 [&::-webkit-details-marker]:hidden">
        Add someone who paid outside the site
        <span aria-hidden="true" className="text-xl text-(--cv-brand-strong) transition-transform group-open:rotate-45">
          +
        </span>
      </summary>

      <form ref={formRef} action={formAction} noValidate className="space-y-5 px-5 pb-5">
        <p className="leading-7 text-(--cv-text)">
          For cash, or a transfer from someone who never registered. They&apos;re confirmed straight away and their ticket is
          emailed. Only add someone once you have their {price}.
        </p>

        {state.status === "already_confirmed" && (
          <Callout ref={noticeRef} tabIndex={-1} tone="info" title={`${state.fullName} already has a ticket`}>
            <p>
              Their ticket is <strong className="font-mono">{state.ticketCode}</strong>, so there&apos;s nothing to add. If they&apos;ve
              lost the email, they can use &quot;Resend my ticket&quot; on the convention page.
            </p>
          </Callout>
        )}
        {state.status === "error" && <Callout ref={noticeRef} tabIndex={-1} tone="danger" title={state.message} />}

        <TextField
          id="paid-fullName"
          name="fullName"
          label="Full name"
          autoComplete="off"
          defaultValue={values?.fullName}
          error={errors.fullName}
        />
        <TextField
          id="paid-email"
          name="email"
          type="email"
          inputMode="email"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          label="Email"
          hint="Their ticket is sent here."
          defaultValue={values?.email}
          error={errors.email}
        />
        <TextField
          id="paid-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          label="Phone"
          defaultValue={values?.phone}
          error={errors.phone}
        />

        <fieldset
          className="space-y-2"
          data-invalid={errors.paymentMethod ? true : undefined}
          aria-describedby={errors.paymentMethod ? "paid-method-error" : undefined}
        >
          <legend className="mb-2 font-sans text-[15px] font-bold text-(--cv-ink)">How did they pay?</legend>
          {METHODS.map((method) => (
            <label key={method.value} className="flex min-h-11 cursor-pointer items-center gap-3 text-base">
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                defaultChecked={values?.paymentMethod === method.value}
                className="size-5 shrink-0 accent-(--cv-brand-strong)"
              />
              {method.label}
            </label>
          ))}
          {errors.paymentMethod && (
            <p id="paid-method-error" className="text-sm font-medium text-(--cv-danger)">
              {errors.paymentMethod}
            </p>
          )}
        </fieldset>

        <SubmitButton pendingLabel="Adding…" size="md" className="w-full sm:w-auto">
          Add and email their ticket
        </SubmitButton>
      </form>
    </details>
  );
}
