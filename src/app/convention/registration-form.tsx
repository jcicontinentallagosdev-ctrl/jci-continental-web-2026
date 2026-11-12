"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { CheckIcon } from "./_components/icons";
import { SubmitButton } from "./_components/submit-button";
import { buttonClasses, Callout, cx, TextField } from "./_components/ui";
import { register, type RegisterState } from "./actions";

type Props = {
  guestPriceLabel: string;
  eventDateLabel: string;
  calendarUrl: string;
  contactEmail: string;
};

type Values = { fullName: string; email: string; phone: string; attendeeType: "" | "member" | "guest" };

const EMPTY: Values = { fullName: "", email: "", phone: "", attendeeType: "" };

/** Wrapper so "Register someone else" can start over with a fresh form and fresh action state. */
export function RegistrationForm(props: Props) {
  const [round, setRound] = useState(0);
  return <RegistrationRound key={round} {...props} onRestart={() => setRound((r) => r + 1)} />;
}

function RegistrationRound({ guestPriceLabel, eventDateLabel, calendarUrl, contactEmail, onRestart }: Props & { onRestart: () => void }) {
  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(register, { status: "idle" });
  const [values, setValues] = useState<Values>(EMPTY);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const errors = state.status === "invalid" ? state.errors : {};
  const set = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: event.target.value }));

  // Move focus to whatever the person needs to read or fix next.
  useEffect(() => {
    if (state.status === "invalid") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
    } else if (state.status === "registered" || state.status === "already_registered" || state.status === "transfer_started") {
      doneRef.current?.focus();
    } else if (state.status !== "idle") {
      noticeRef.current?.focus();
    }
  }, [state]);

  // Not on the financial list: keep them as a paying attendee so the CTA becomes "Continue to bank transfer".
  useEffect(() => {
    if (state.status === "member_not_found") {
      setValues((v) => (v.attendeeType === "guest" ? v : { ...v, attendeeType: "guest" }));
    }
  }, [state]);

  if (state.status === "registered") {
    return (
      <div className="cv-rise space-y-5" role="status">
        <span className="cv-pop flex size-14 items-center justify-center rounded-full bg-(--cv-success-bg) text-(--cv-success)">
          <CheckIcon width={28} height={28} strokeWidth={2.5} className="cv-draw" />
        </span>
        <div className="space-y-2">
          <h3 id="cv-register" ref={doneRef} tabIndex={-1} className="cv-display text-3xl text-(--cv-ink) outline-none">
            You&apos;re registered, {state.firstName}!
          </h3>
          {state.upgradedToMember && (
            <p className="font-medium text-(--cv-success)">Good news: your email is on our member list, so your ticket is free.</p>
          )}
          {state.emailSent ? (
            <p className="leading-7">
              We&apos;ve emailed your ticket to <strong className="text-(--cv-ink)">{state.email}</strong>. Show its QR code at the
              entrance on {eventDateLabel}.
            </p>
          ) : (
            <Callout tone="warning" title="Your seat is confirmed, but the email didn't go out">
              <p>
                Give it a few minutes, then use <strong>Resend my ticket</strong> below. If it still doesn&apos;t arrive, write to{" "}
                <a className="font-semibold underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            </Callout>
          )}
        </div>
        <p className="text-sm text-(--cv-muted)">Nothing in your inbox after 5 minutes? Check your spam or promotions folder.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={calendarUrl} target="_blank" rel="noreferrer" className={buttonClasses("secondary", "md")}>
            Add to Google Calendar
          </a>
          <button type="button" onClick={onRestart} className={buttonClasses("ghost", "md")}>
            Register someone else
          </button>
        </div>
      </div>
    );
  }

  if (state.status === "already_registered" || state.status === "transfer_started") {
    const pending = state.status === "transfer_started";
    return (
      <div className="cv-rise space-y-5" role="status">
        <div className="space-y-2">
          <h3 id="cv-register" ref={doneRef} tabIndex={-1} className="cv-display text-3xl text-(--cv-ink) outline-none">
            {pending ? "You've already started registering" : "You're already registered"}
          </h3>
          <p className="leading-7">
            {pending ? (
              <>
                We&apos;ve sent the bank details and the link to upload your receipt to{" "}
                <strong className="text-(--cv-ink)">{state.email}</strong>. Already sent a receipt? We&apos;ll email your ticket
                once we&apos;ve confirmed your transfer, so there&apos;s no need to pay again.
              </>
            ) : (
              <>
                Your ticket is on its way to <strong className="text-(--cv-ink)">{state.email}</strong>. It can take a
                minute to arrive. Check your spam folder too.
              </>
            )}
          </p>
        </div>
        <button type="button" onClick={onRestart} className={buttonClasses("secondary", "md")}>
          Register someone else
        </button>
      </div>
    );
  }

  const isGuest = values.attendeeType === "guest";
  const submitLabel =
    values.attendeeType === "member" ? "Register for free" : isGuest ? "Continue to bank transfer" : "Register";

  return (
    <form
      ref={formRef}
      action={formAction}
      // Submit by hand so React doesn't reset the form afterwards, which would clear the
      // chosen radio and lose what the person typed. Without JS, `action` still works.
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
      noValidate
      className="space-y-6"
    >
      <h3 id="cv-register" className="cv-display text-3xl text-(--cv-ink)">
        Your details
      </h3>

      <TextField
        label="Full name"
        name="fullName"
        autoComplete="name"
        hint="As you'd like it on your ticket."
        value={values.fullName}
        onChange={set("fullName")}
        error={errors.fullName}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        spellCheck={false}
        hint="Your ticket is sent here. Members, use the email on your membership record."
        value={values.email}
        onChange={set("email")}
        error={errors.email}
        required
      />
      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="0803 123 4567"
        value={values.phone}
        onChange={set("phone")}
        error={errors.phone}
        required
      />

      <fieldset aria-describedby={errors.attendeeType ? "cv-attendeeType-error" : undefined} className="space-y-3">
        <legend className="mb-3 font-sans text-[15px] font-semibold text-(--cv-ink)">How are you attending?</legend>
        <AttendeeOption
          value="member"
          checked={values.attendeeType === "member"}
          onChange={set("attendeeType")}
          invalid={Boolean(errors.attendeeType)}
          title="I'm a JCI Continental Lagos member"
          price="Free"
          detail="We'll match your email to our member list."
        />
        <AttendeeOption
          value="guest"
          checked={isGuest}
          onChange={set("attendeeType")}
          invalid={Boolean(errors.attendeeType)}
          title="I'm a guest"
          price={guestPriceLabel}
          detail="Pay by bank transfer, then send us your receipt."
        />
        {errors.attendeeType && (
          <p id="cv-attendeeType-error" className="text-sm font-medium text-(--cv-danger)">
            {errors.attendeeType}
          </p>
        )}
      </fieldset>

      {/* Honeypot for bots. Hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div ref={noticeRef} tabIndex={-1} className="outline-none empty:hidden">
        {state.status === "member_not_found" && (
          <Callout
            tone="info"
            title={`You're registering as a non-financial member · ${guestPriceLabel}`}
            role="alert"
          >
            <p>
              We couldn&apos;t find <strong className="text-(--cv-ink)">{state.email}</strong> on our list of members whose
              dues are paid for this year, so your ticket is {guestPriceLabel}. Pay by bank transfer, send us your receipt,
              and you&apos;re in as a member.
            </p>
            <p>
              Already paid your dues? Try the email on your membership record, or write to{" "}
              <a className="font-semibold underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          </Callout>
        )}
        {state.status === "error" && (
          <Callout tone="danger" title="Something went wrong" role="alert">
            <p>{state.message}</p>
          </Callout>
        )}
        {state.status === "sold_out" && (
          <Callout tone="warning" title="We're fully booked" role="alert">
            <p>
              Every seat has been taken. Write to{" "}
              <a className="font-semibold underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              to join the waiting list.
            </p>
          </Callout>
        )}
        {state.status === "closed" && (
          <Callout tone="info" title="Registration has closed" role="alert">
            <p>Online registration closed while you were filling the form. Please contact the secretariat.</p>
          </Callout>
        )}
      </div>

      <div className="space-y-3">
        <SubmitButton pending={isPending} pendingLabel={isGuest ? "Saving your details…" : "Registering…"} className="w-full">
          {submitLabel}
        </SubmitButton>
        <p className="text-center text-sm leading-6 text-(--cv-muted)">
          {isGuest && "Next, you'll see the account details. Your ticket follows once we've confirmed your transfer. "}
          By registering, you agree to our{" "}
          <a href="https://www.jcicontinentallagos.org/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function AttendeeOption({
  value,
  checked,
  onChange,
  invalid,
  title,
  price,
  detail,
}: {
  value: "member" | "guest";
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  title: string;
  price: string;
  detail: string;
}) {
  return (
    <label
      className={cx(
        "flex cursor-pointer items-start gap-3 rounded-(--cv-radius-field) border-2 p-4 transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-(--cv-brand)/40",
        checked
          ? "border-(--cv-control-line) bg-(--cv-sky) shadow-(--cv-shadow-chosen)"
          : invalid
            ? "border-(--cv-danger) bg-white"
            : "border-(--cv-input-line) bg-white hover:border-(--cv-control-line)",
      )}
    >
      <input
        type="radio"
        name="attendeeType"
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 size-5 shrink-0 accent-(--cv-brand-strong)"
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="font-sans font-semibold text-(--cv-ink)">{title}</span>
          <span className="font-sans font-bold text-(--cv-brand-stronger)">{price}</span>
        </span>
        <span className="mt-1 block text-sm text-(--cv-muted)">{detail}</span>
      </span>
    </label>
  );
}
