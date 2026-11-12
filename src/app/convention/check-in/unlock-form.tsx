"use client";

import { useActionState } from "react";
import { LockIcon } from "../_components/icons";
import { SubmitButton } from "../_components/submit-button";
import { Card, TextField } from "../_components/ui";
import { unlockDesk, type UnlockState } from "./actions";

export function UnlockForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<UnlockState, FormData>(unlockDesk, {});
  return (
    <Card className="space-y-6 p-6 sm:p-8">
      <div className="space-y-2">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--cv-surface) text-(--cv-brand-strong)">
          <LockIcon />
        </span>
        <h1 className="cv-display text-3xl text-(--cv-ink)">Check-in desk</h1>
        <p className="text-(--cv-muted)">For convention staff only. Enter the passcode from the convention lead.</p>
      </div>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next ?? ""} />
        <TextField
          label="Staff passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          error={state.error}
          required
          autoFocus
        />
        <SubmitButton pendingLabel="Unlocking…" className="w-full">
          Unlock check-in
        </SubmitButton>
      </form>
    </Card>
  );
}
