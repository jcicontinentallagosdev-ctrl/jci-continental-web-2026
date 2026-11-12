"use client";

import { useActionState } from "react";
import { LockIcon } from "../_components/icons";
import { SubmitButton } from "../_components/submit-button";
import { Card, TextField } from "../_components/ui";
import { unlockDesk, type UnlockState } from "./actions";

/**
 * Door unlock (default) or treasurer unlock for the payments desk.
 * Payments mode only accepts the treasurer passcode on the server.
 */
export function UnlockForm({
  next,
  mode = "desk",
}: {
  next?: string;
  mode?: "desk" | "payments";
}) {
  const [state, formAction] = useActionState<UnlockState, FormData>(unlockDesk, {});
  const forPayments = mode === "payments";

  return (
    <Card className="space-y-6 p-6 sm:p-8">
      <div className="space-y-2">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--cv-surface) text-(--cv-brand-strong)">
          <LockIcon />
        </span>
        <h1 className="cv-display text-3xl text-(--cv-ink)">{forPayments ? "Payments desk" : "Check-in desk"}</h1>
        <p className="text-(--cv-muted)">
          {forPayments
            ? "Treasurer only. Enter the payments passcode from the convention lead — the door passcode will not open this page."
            : "For convention staff only. Enter the passcode from the convention lead."}
        </p>
      </div>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next ?? ""} />
        {forPayments && <input type="hidden" name="requireTreasurer" value="1" />}
        <TextField
          label={forPayments ? "Treasurer passcode" : "Staff passcode"}
          name="passcode"
          type="password"
          autoComplete="current-password"
          error={state.error}
          required
          autoFocus
        />
        <SubmitButton pendingLabel="Unlocking…" className="w-full">
          {forPayments ? "Unlock payments" : "Unlock check-in"}
        </SubmitButton>
      </form>
    </Card>
  );
}
