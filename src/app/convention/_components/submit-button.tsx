"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "./icons";
import { buttonClasses } from "./ui";

type Props = {
  children: ReactNode;
  /** Pass when the form is submitted by hand (useFormStatus only sees `action` submissions). */
  pending?: boolean;
  /** Extra disable reason (e.g. no receipt file chosen yet). */
  disabled?: boolean;
  pendingLabel: string;
  variant?: Parameters<typeof buttonClasses>[0];
  size?: Parameters<typeof buttonClasses>[1];
  className?: string;
};

export function SubmitButton({
  children,
  pending: pendingProp,
  disabled = false,
  pendingLabel,
  variant = "primary",
  size = "lg",
  className,
}: Props) {
  const status = useFormStatus();
  const pending = pendingProp || status.pending;
  const isDisabled = pending || disabled;
  return (
    <button type="submit" disabled={isDisabled} aria-disabled={isDisabled} className={buttonClasses(variant, size, className)}>
      {pending ? (
        <>
          <Spinner />
          <span>{pendingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
