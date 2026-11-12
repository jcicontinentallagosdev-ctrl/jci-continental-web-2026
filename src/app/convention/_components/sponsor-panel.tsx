"use client";

import Image from "next/image";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendSponsorEnquiry, type SponsorState } from "../sponsor-actions";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { SubmitButton } from "./submit-button";
import { buttonClasses, Callout, cx, TextField } from "./ui";

type Props = {
  title: string;
  pitch: string;
  interests: string[];
  budgets: string[];
  responseTime: string;
};

/** "Become a sponsor": the pitch, and a form that drops open underneath it. */
export function SponsorPanel({ title, pitch, interests, budgets, responseTime }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<SponsorState, FormData>(sendSponsorEnquiry, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  // Fields edited since the last submit drop their error, so fixed fields stop showing red.
  const [edited, setEdited] = useState<ReadonlySet<string>>(new Set());
  const allErrors = state.status === "invalid" ? state.errors : {};
  const errors: typeof allErrors = Object.fromEntries(Object.entries(allErrors).filter(([field]) => !edited.has(field)));
  const sent = state.status === "sent";

  // Opening: bring the form into view and put the cursor in the first field once it has slid open.
  useEffect(() => {
    if (!open || sent) return;
    const timer = setTimeout(() => {
      document.getElementById("cv-sp-organisation")?.focus({ preventScroll: true });
      drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
    return () => clearTimeout(timer);
  }, [open, sent]);

  useEffect(() => {
    if (state.status === "invalid") formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    if (state.status === "sent") doneRef.current?.focus();
  }, [state]);

  return (
    <div className="mt-10 overflow-hidden rounded-(--cv-radius) border-2 border-(--cv-line) bg-white shadow-(--cv-shadow-lg)">
      <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-8">
        <div className="space-y-5">
          <p className="cv-display text-[clamp(1.75rem,4vw,3rem)] text-(--cv-ink)">{title}</p>
          <p className="max-w-xl text-lg leading-8">{pitch}</p>
          {!sent && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls="cv-sponsor-form"
              onClick={() => setOpen((o) => !o)}
              className={buttonClasses("accent", "lg", "h-auto min-h-[52px] w-full justify-between py-2 pr-3 text-left sm:w-auto sm:justify-center")}
            >
              {open ? "Close the form" : "Talk to us about sponsoring"}
              <span className="flex size-8 items-center justify-center rounded-(--cv-radius-control) border-2 border-(--cv-control-line) bg-white">
                <ChevronDownIcon
                  width={18}
                  height={18}
                  className={cx("transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
                />
              </span>
            </button>
          )}
        </div>
        <Image
          src="/convention/art/sponsor-spotlight.webp"
          alt=""
          width={520}
          height={520}
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 260px, 140px"
          // On phones it sits above the title, so the button leads straight into the form it opens.
          data-reveal="bloom"
          className="order-first h-auto w-full max-w-[140px] md:order-none md:mx-auto md:max-w-[260px] lg:max-w-[320px]"
        />
      </div>

      {/* The drawer: animates its height from 0 to auto by transitioning grid rows. */}
      <div
        id="cv-sponsor-form"
        ref={drawerRef}
        inert={!open}
        className={cx(
          "grid scroll-mt-24 transition-[grid-template-rows,opacity] md:scroll-mt-32 duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-(--cv-line) bg-(--cv-surface) p-6 sm:p-10">
            {sent ? (
              <div className="cv-rise flex flex-col items-start gap-6 sm:flex-row sm:items-center" role="status">
                <Image src="/convention/art/spot-connect.webp" alt="" width={480} height={480} className="cv-bloom-in h-auto w-36 shrink-0 sm:w-44" />
                <div className="space-y-3">
                  <p ref={doneRef} tabIndex={-1} className="cv-display text-3xl text-(--cv-ink) outline-none sm:text-4xl">
                    Thanks, {state.firstName}. We&apos;ll be in touch.
                  </p>
                  <p className="max-w-xl text-lg leading-8">
                    Your enquiry for <strong className="text-(--cv-ink)">{state.organisation}</strong> is with the convention team.
                    We&apos;ll reply to <strong className="text-(--cv-ink)">{state.email}</strong> {responseTime}, and we&apos;ve
                    sent you a copy of what you told us.
                  </p>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                action={formAction}
                // Submit by hand so React doesn't clear the form if something needs fixing.
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  setEdited(new Set());
                  startTransition(() => formAction(formData));
                }}
                onInput={(event) => {
                  const field = (event.target as HTMLInputElement).name;
                  if (field in allErrors && !edited.has(field)) setEdited(new Set(edited).add(field));
                }}
                noValidate
                className="space-y-8"
              >
                <div className="space-y-1">
                  <h3 className="cv-display text-3xl text-(--cv-ink)">Tell us about your brand</h3>
                  <p className="text-(--cv-muted)">Takes about a minute. We&apos;ll reply {responseTime}.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <TextField id="cv-sp-organisation" label="Organisation" name="organisation" autoComplete="organization" error={errors.organisation} required />
                  </div>
                  <TextField id="cv-sp-name" label="Your name" name="contactName" autoComplete="name" error={errors.contactName} required />
                  <TextField id="cv-sp-role" label="Your role (optional)" name="role" autoComplete="organization-title" error={errors.role} />
                  <TextField
                    id="cv-sp-email"
                    label="Work email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    error={errors.email}
                    required
                  />
                  <TextField
                    id="cv-sp-phone"
                    label="Phone number"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0803 123 4567"
                    error={errors.phone}
                    required
                  />
                </div>

                <fieldset aria-describedby={errors.interests ? "cv-sp-interests-error" : "cv-sp-interests-hint"} className="space-y-3">
                  <legend className="font-sans text-[15px] font-bold text-(--cv-ink)">How would you like to get involved?</legend>
                  <p id="cv-sp-interests-hint" className="text-sm text-(--cv-muted)">
                    Pick as many as you like.
                  </p>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className={cx(
                          "group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-(--cv-radius-field) border-2 bg-white px-4 py-3 font-sans font-bold text-(--cv-ink) transition-[background-color,box-shadow,translate] duration-150",
                          "has-[:checked]:bg-(--cv-sun) has-[:checked]:shadow-(--cv-shadow-chosen) has-[:checked]:[translate:var(--cv-lift)] motion-reduce:translate-none",
                          "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-(--cv-brand) has-[:focus-visible]:ring-offset-2",
                          errors.interests ? "border-(--cv-danger)" : "border-(--cv-control-line)",
                        )}
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          aria-invalid={errors.interests ? true : undefined}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center rounded-[min(var(--cv-radius-field),6px)] border-2 border-(--cv-control-line) bg-white text-transparent peer-checked:bg-(--cv-ink) peer-checked:text-(--cv-sun)"
                        >
                          <CheckIcon width={14} height={14} strokeWidth={3} />
                        </span>
                        <span className="text-[15px] leading-tight">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <p id="cv-sp-interests-error" className="text-sm font-medium text-(--cv-danger)">
                      {errors.interests}
                    </p>
                  )}
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="font-sans text-[15px] font-bold text-(--cv-ink)">Rough budget (optional)</legend>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((budget) => (
                      <label
                        key={budget}
                        className="flex min-h-11 cursor-pointer items-center rounded-(--cv-radius-control) border-2 border-(--cv-control-line) bg-white px-4 font-sans text-[15px] font-bold text-(--cv-ink) transition-colors has-[:checked]:bg-(--cv-ink) has-[:checked]:text-white has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-(--cv-brand) has-[:focus-visible]:ring-offset-2"
                      >
                        <input type="radio" name="budget" value={budget} className="sr-only" />
                        {budget}
                      </label>
                    ))}
                  </div>
                  {errors.budget && <p className="text-sm font-medium text-(--cv-danger)">{errors.budget}</p>}
                </fieldset>

                <div className="space-y-1.5">
                  <label htmlFor="cv-sp-message" className="block font-sans text-[15px] font-bold text-(--cv-ink)">
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    id="cv-sp-message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    aria-invalid={errors.message ? true : undefined}
                    className="block w-full rounded-(--cv-radius-field) border-2 border-(--cv-input-line) bg-white px-4 py-3 text-base text-(--cv-ink) outline-none focus:border-(--cv-control-line) focus:shadow-(--cv-shadow-focus)"
                  />
                  {errors.message && <p className="text-sm font-medium text-(--cv-danger)">{errors.message}</p>}
                </div>

                {/* Honeypot for bots. Hidden from people and screen readers. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {state.status === "error" && (
                  <Callout tone="danger" title="We couldn't send your enquiry just now" role="alert">
                    <p>Nothing was lost on your side. Please try again in a minute.</p>
                  </Callout>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <SubmitButton pending={isPending} pendingLabel="Sending…" className="w-full sm:w-auto">
                    Send enquiry
                  </SubmitButton>
                  <p className="text-sm text-(--cv-muted)">We&apos;ll only use these details to talk to you about sponsorship.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
