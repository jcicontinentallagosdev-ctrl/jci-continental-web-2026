"use client";

import { useActionState } from "react";
import { SubmitButton } from "./_components/submit-button";
import { Callout, TextField } from "./_components/ui";
import { resendTicket, type ResendState } from "./actions";

export function ResendTicketForm() {
  const [state, formAction] = useActionState<ResendState, FormData>(resendTicket, { status: "idle" });

  return (
    <details className="group rounded-(--cv-radius) border-2 border-(--cv-line) bg-white">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 font-sans font-semibold text-(--cv-ink) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand)/40 [&::-webkit-details-marker]:hidden">
        Already registered? Resend my ticket
        <span aria-hidden="true" className="text-xl text-(--cv-brand-strong) transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="space-y-4 px-5 pb-5">
        {state.status === "sent" ? (
          <Callout tone="success" title="On its way" role="status">
            <p>
              If <strong>{state.email}</strong> is registered, your ticket will arrive in a minute or two. Check your spam folder
              too.
            </p>
          </Callout>
        ) : (
          <form action={formAction} noValidate className="space-y-4">
            <TextField
              id="cv-resend-email"
              label="Email you registered with"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              error={state.status === "invalid" ? state.error : undefined}
              required
            />
            {state.status === "error" && (
              <Callout tone="danger" title="We couldn't send it just now" role="alert">
                <p>Please try again in a minute.</p>
              </Callout>
            )}
            <SubmitButton pendingLabel="Sending…" variant="secondary" size="md" className="w-full sm:w-auto">
              Resend my ticket
            </SubmitButton>
          </form>
        )}
      </div>
    </details>
  );
}
