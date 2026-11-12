"use server";

import { redirect } from "next/navigation";
import { isSoldOut, registrationIsOpen } from "./_lib/availability";
import type { Registration } from "./_lib/db";
import { deliverTicket, sendTransferDetails } from "./_lib/email";
import { firstName } from "./_lib/format";
import { guestPriceKobo } from "./_lib/pricing";
import { createRegistration, findRegistrationByEmail, isOnMemberList, updatePendingRegistration } from "./_lib/registrations";
import {
  normalizeEmail,
  readRegistrationForm,
  validateRegistration,
  type FieldErrors,
} from "./_lib/validation";

const RESEND_COOLDOWN_MS = 2 * 60 * 1000;

const SOMETHING_WENT_WRONG = "We couldn't finish your registration just now. Please try again in a minute.";

export type RegisterState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "member_not_found"; email: string }
  | { status: "registered"; email: string; firstName: string; upgradedToMember: boolean; emailSent: boolean }
  | { status: "already_registered"; email: string }
  | { status: "transfer_started"; email: string }
  | { status: "closed" }
  | { status: "sold_out" }
  | { status: "error"; message: string };

/**
 * Re-sends what someone needs next, unless it went out in the last couple of minutes: the ticket
 * once they're confirmed, otherwise the transfer details with the link to their payment page.
 */
async function resendIfQuiet(registration: Registration) {
  const confirmed = registration.status === "confirmed";
  const lastSent = (confirmed ? registration.ticketSentAt : registration.instructionsSentAt)?.getTime() ?? 0;
  if (Date.now() - lastSent < RESEND_COOLDOWN_MS) return;
  if (confirmed) await deliverTicket(registration);
  else await sendTransferDetails(registration);
}

export async function register(_previous: RegisterState, formData: FormData): Promise<RegisterState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("website")) return { status: "idle" };
  if (!registrationIsOpen()) return { status: "closed" };

  const parsed = validateRegistration(readRegistrationForm(formData));
  if (!parsed.ok) return { status: "invalid", errors: parsed.errors };
  const input = parsed.data;

  let paymentPage: string;
  try {
    const existing = await findRegistrationByEmail(input.email);
    const onMemberList = await isOnMemberList(input.email);

    if (existing?.status === "pending_payment" && !onMemberList) {
      // A guest who started before. Their payment page is private, so it goes to their inbox, not this browser.
      await resendIfQuiet(existing);
      return { status: "transfer_started", email: existing.email };
    }
    if (existing?.status === "confirmed") {
      await resendIfQuiet(existing);
      return { status: "already_registered", email: existing.email };
    }
    if (existing?.status === "cancelled") {
      return { status: "error", message: "This registration was cancelled. Please contact the secretariat to restore it." };
    }

    if (input.attendeeType === "member" && !onMemberList) {
      return { status: "member_not_found", email: input.email };
    }
    if (await isSoldOut()) return { status: "sold_out" };

    const details = {
      ...input,
      attendeeType: onMemberList ? ("member" as const) : ("guest" as const),
      amountDueKobo: onMemberList ? 0 : guestPriceKobo(),
      confirmed: onMemberList,
    };
    const registration = existing
      ? await updatePendingRegistration(existing.id, details)
      : await createRegistration(details);

    // Null means the same email was submitted twice at once; the other request handles it.
    if (!registration) return { status: "already_registered", email: input.email };

    if (onMemberList) {
      const emailSent = await deliverTicket(registration);
      return {
        status: "registered",
        email: registration.email,
        firstName: firstName(registration.fullName),
        upgradedToMember: input.attendeeType === "guest",
        emailSent,
      };
    }

    // The page shows the account details too, so a failed email doesn't stop them paying.
    await sendTransferDetails(registration);
    paymentPage = `/convention/ticket/${registration.ticketToken}?new=1`;
  } catch (error) {
    console.error("[convention] Registration failed", error);
    return { status: "error", message: SOMETHING_WENT_WRONG };
  }

  redirect(paymentPage);
}

/* Resend ticket ---------------------------------------------------------------- */

export type ResendState =
  | { status: "idle" }
  | { status: "invalid"; error: string }
  | { status: "sent"; email: string }
  | { status: "error" };

export async function resendTicket(_previous: ResendState, formData: FormData): Promise<ResendState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    return { status: "invalid", error: "Enter the email you registered with." };
  }
  try {
    const registration = await findRegistrationByEmail(email);
    if (registration && registration.status !== "cancelled") await resendIfQuiet(registration);
  } catch (error) {
    console.error("[convention] Resend failed", error);
    return { status: "error" };
  }
  // Same answer whether or not the email is registered, so the form can't be used to look people up.
  return { status: "sent", email };
}
