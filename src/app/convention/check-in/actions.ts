"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { redirect } from "next/navigation";
import type { PaymentMethod, RegistrationStatus } from "../_lib/db";
import { RETURN_REASONS } from "../_lib/bank";
import { deliverTicket, sendReceiptReturned, sendTransferDetails } from "../_lib/email";
import {
  acceptTransfer,
  checkIn,
  findRegistrationById,
  findRegistrationByToken,
  rejectReceipt,
  undoCheckIn,
} from "../_lib/registrations";
import { endStaffSession, isStaff, startStaffSession } from "../_lib/staff";
import { confirmTransfer, recordPaidGuest } from "../_lib/transfers";
import { readRegistrationForm, validateRegistration, type FieldErrors } from "../_lib/validation";

/* Unlock / lock ------------------------------------------------------------------ */

export type UnlockState = { error?: string };

export async function unlockDesk(_previous: UnlockState, formData: FormData): Promise<UnlockState> {
  const passcode = String(formData.get("passcode") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!(await startStaffSession(passcode))) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // slow down guessing
    return { error: "That passcode didn't work. Check with the convention lead." };
  }
  redirect(next.startsWith("/convention/") ? next : "/convention/check-in");
}

export async function lockDesk() {
  await endStaffSession();
  redirect("/convention/check-in");
}

/* Ticket page panel ---------------------------------------------------------------- */

export type TicketSnapshot = { status: RegistrationStatus; checkedInAt: string | null };

export type StaffTicketState = {
  snapshot: TicketSnapshot;
  event?: "checked_in" | "already_checked_in" | "undone" | "now_paid" | "still_unpaid" | "locked" | "error";
  /** False when the payment was confirmed but the ticket email didn't go out. */
  emailSent?: boolean;
};

export async function staffTicketAction(previous: StaffTicketState, formData: FormData): Promise<StaffTicketState> {
  if (!(await isStaff())) return { ...previous, event: "locked" };

  const token = String(formData.get("token") ?? "");
  const intent = String(formData.get("intent") ?? "");

  try {
    if (intent === "check_in") {
      const updated = await checkIn(token);
      if (updated) return { snapshot: snapshot(updated), event: "checked_in" };
      const current = await findRegistrationByToken(token);
      if (!current) return { ...previous, event: "error" };
      return {
        snapshot: snapshot(current),
        event: current.checkedInAt ? "already_checked_in" : current.status === "confirmed" ? "error" : "still_unpaid",
      };
    }

    if (intent === "undo") {
      const updated = await undoCheckIn(token);
      return updated ? { snapshot: snapshot(updated), event: "undone" } : { ...previous, event: "error" };
    }

    if (intent === "confirm_payment") {
      const registration = await findRegistrationByToken(token);
      if (!registration) return { ...previous, event: "error" };
      const { registration: updated, emailSent } = await confirmTransfer(registration.id);
      if (updated?.status === "confirmed") {
        revalidatePath(`/convention/ticket/${token}`); // the page below the panel now shows the QR code
        return { snapshot: snapshot(updated), event: "now_paid", emailSent };
      }
      return { snapshot: snapshot(registration), event: "still_unpaid" };
    }
  } catch (error) {
    console.error("[convention] Staff action failed", error);
  }
  return { ...previous, event: "error" };
}

function snapshot(registration: { status: RegistrationStatus; checkedInAt: Date | null }): TicketSnapshot {
  return { status: registration.status, checkedInAt: registration.checkedInAt?.toISOString() ?? null };
}

/* Desk list ------------------------------------------------------------------------ */

export async function checkInFromDesk(formData: FormData) {
  if (!(await isStaff())) redirect("/convention/check-in");
  const token = String(formData.get("token") ?? "");
  if (formData.get("intent") === "undo") await undoCheckIn(token);
  else await checkIn(token);
  revalidatePath("/convention/check-in");
}

/* Payments to confirm ---------------------------------------------------------------- */

const PAYMENTS = "/convention/check-in/payments";

export type ConfirmPaymentResult = { ok: true; ticketCode: string } | { ok: false };
export type ReturnPaymentResult =
  | { ok: true; ticketCode: string; emailSent: boolean }
  | { ok: false; missing?: true };
export type RemindPaymentResult =
  | { ok: true; ticketCode: string; emailSent: boolean }
  | { ok: false };

/** Staff saw the money: confirm in the DB, return at once, email the ticket in the background. */
export async function confirmPaymentFromList(formData: FormData): Promise<ConfirmPaymentResult> {
  if (!(await isStaff())) redirect(`/convention/check-in?next=${PAYMENTS}`);
  const registrationId = String(formData.get("registrationId") ?? "");
  try {
    const { registration, newlyConfirmed } = await acceptTransfer(registrationId);
    if (!registration) return { ok: false };
    // Don't await Resend here — waiting kept the Confirm button spinning forever.
    if (newlyConfirmed) {
      after(() => {
        void deliverTicket(registration).then((emailSent) => {
          if (!emailSent) console.error(`[convention] Ticket email failed for ${registration.ticketCode}`);
        });
      });
    }
    revalidatePath(PAYMENTS);
    revalidatePath("/convention/check-in");
    return { ok: true, ticketCode: registration.ticketCode };
  } catch (error) {
    console.error("[convention] Confirm payment failed", error);
    return { ok: false };
  }
}

/** Staff couldn't match the receipt: mark it returned, then email the guest (background). */
export async function returnPaymentFromList(formData: FormData): Promise<ReturnPaymentResult> {
  if (!(await isStaff())) redirect(`/convention/check-in?next=${PAYMENTS}`);
  const receiptId = String(formData.get("receiptId") ?? "");
  const reason = String(formData.get("reason") ?? "");
  const extra = String(formData.get("note") ?? "").trim().slice(0, 500);
  const preset = (RETURN_REASONS as readonly string[]).includes(reason) ? reason : "";
  const note = [preset, extra].filter(Boolean).join("\n\n");
  if (!note) return { ok: false, missing: true };

  try {
    const registration = await rejectReceipt(receiptId, note);
    if (!registration) return { ok: false };
    after(() => {
      void sendReceiptReturned(registration, note);
    });
    revalidatePath(PAYMENTS);
    revalidatePath("/convention/check-in");
    return { ok: true, ticketCode: registration.ticketCode, emailSent: true };
  } catch (error) {
    console.error("[convention] Return receipt failed", error);
    return { ok: false };
  }
}

/** A reminder sent in the last couple of minutes isn't sent again, so two staff tapping at once send one. */
const REMINDER_COOLDOWN_MS = 2 * 60 * 1000;

/** Re-sends the account details and receipt link to a guest who hasn't sent a receipt yet. */
export async function remindFromList(formData: FormData): Promise<RemindPaymentResult> {
  if (!(await isStaff())) redirect(`/convention/check-in?next=${PAYMENTS}`);
  const registrationId = String(formData.get("registrationId") ?? "");
  try {
    const registration = await findRegistrationById(registrationId);
    if (registration?.status !== "pending_payment") return { ok: false };

    const lastSent = registration.instructionsSentAt?.getTime() ?? 0;
    if (Date.now() - lastSent < REMINDER_COOLDOWN_MS) {
      revalidatePath(PAYMENTS);
      return { ok: true, ticketCode: registration.ticketCode, emailSent: true };
    }

    // Await reminder email — it's usually quick; still return to the client without a redirect hang.
    const emailSent = await sendTransferDetails(registration, { reminder: true });
    revalidatePath(PAYMENTS);
    return { ok: true, ticketCode: registration.ticketCode, emailSent };
  } catch (error) {
    console.error("[convention] Reminder failed", error);
    return { ok: false };
  }
}

export type PaidGuestValues = { fullName: string; email: string; phone: string; paymentMethod: PaymentMethod | "" };

export type PaidGuestState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors & { paymentMethod?: string }; values: PaidGuestValues }
  | { status: "already_confirmed"; fullName: string; ticketCode: string; values: PaidGuestValues }
  | { status: "error"; message: string; values: PaidGuestValues };

/** Someone paid outside the site: record them as a confirmed guest and email their ticket. */
export async function addPaidGuest(_previous: PaidGuestState, formData: FormData): Promise<PaidGuestState> {
  if (!(await isStaff())) redirect(`/convention/check-in?next=${PAYMENTS}`);

  const method = String(formData.get("paymentMethod") ?? "");
  const paymentMethod = method === "bank_transfer" || method === "cash" ? method : "";
  const form = readRegistrationForm(formData);
  const values: PaidGuestValues = { fullName: form.fullName, email: form.email, phone: form.phone, paymentMethod };

  const parsed = validateRegistration({ ...form, attendeeType: "guest" });
  if (!parsed.ok || !paymentMethod) {
    const errors: FieldErrors & { paymentMethod?: string } = parsed.ok ? {} : { ...parsed.errors };
    if (errors.fullName) errors.fullName = "Enter their full name as it should appear on the ticket.";
    if (errors.email) errors.email = "Enter a valid email, like ada@example.com. Their ticket is sent here.";
    if (errors.phone) errors.phone = "Enter a phone number we can reach them on, like 0803 123 4567.";
    if (!paymentMethod) errors.paymentMethod = "Choose how they paid.";
    return { status: "invalid", errors, values };
  }

  let done: string;
  try {
    const result = await recordPaidGuest(parsed.data, paymentMethod);
    if (result.outcome === "already_confirmed") {
      return { status: "already_confirmed", fullName: result.registration.fullName, ticketCode: result.registration.ticketCode, values };
    }
    if (result.outcome === "cancelled") {
      return { status: "error", message: "This email belongs to a cancelled registration. Ask the convention lead to restore it.", values };
    }
    if (result.outcome === "failed") {
      return { status: "error", message: "That didn't save. Check your connection and try again.", values };
    }
    const existing = result.outcome === "confirmed_existing" ? "&existing=1" : "";
    done = `added=${result.registration.ticketCode}${existing}${result.emailSent ? "" : "&email=failed"}`;
  } catch (error) {
    console.error("[convention] Add paid guest failed", error);
    return { status: "error", message: "That didn't save. Check your connection and try again.", values };
  }
  revalidatePath(PAYMENTS);
  redirect(`${PAYMENTS}?${done}`);
}
