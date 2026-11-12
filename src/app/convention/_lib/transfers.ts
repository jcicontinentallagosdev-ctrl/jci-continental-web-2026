import type { PaymentMethod, ReceiptType } from "./db";
import { deliverTicket, sendReceiptReturned } from "./email";
import { guestPriceKobo } from "./pricing";
import { acceptTransfer, createRegistration, findRegistrationByEmail, rejectReceipt } from "./registrations";

/** Vercel accepts request bodies up to 4.5 MB. Photos are shrunk in the browser, so most are far smaller. */
export const MAX_RECEIPT_BYTES = 4 * 1024 * 1024;

/** The file's real type, read from its first bytes rather than its name, so only these four kinds are stored. */
export function sniffReceiptType(bytes: Uint8Array): ReceiptType | null {
  const startsWith = (...signature: number[]) => signature.every((byte, i) => bytes[i] === byte);
  if (startsWith(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  if (startsWith(0x52, 0x49, 0x46, 0x46) && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "image/webp";
  if (startsWith(0x25, 0x50, 0x44, 0x46, 0x2d)) return "application/pdf";
  return null;
}

/**
 * Confirms a guest's payment and emails their ticket. Safe to call twice: only the call that
 * actually confirms it sends the ticket.
 */
export async function confirmTransfer(registrationId: string, paymentMethod: PaymentMethod = "bank_transfer") {
  const { registration, newlyConfirmed } = await acceptTransfer(registrationId, paymentMethod);
  const emailSent = registration && newlyConfirmed ? await deliverTicket(registration) : false;
  return { registration, newlyConfirmed, emailSent };
}

/**
 * Staff record someone who paid outside the site (cash, or a transfer before registering) and email
 * their ticket. Their email is their key: if they'd already started registering, that registration
 * is confirmed instead of a second one being made. Registration deadlines and capacity don't apply,
 * since the money is already in.
 */
export async function recordPaidGuest(guest: { fullName: string; email: string; phone: string }, paymentMethod: PaymentMethod) {
  const existing = await findRegistrationByEmail(guest.email);
  if (existing?.status === "confirmed") return { outcome: "already_confirmed" as const, registration: existing };
  if (existing?.status === "cancelled") return { outcome: "cancelled" as const, registration: existing };
  if (existing) {
    const { registration, emailSent } = await confirmTransfer(existing.id, paymentMethod);
    return registration?.status === "confirmed"
      ? { outcome: "confirmed_existing" as const, registration, emailSent }
      : { outcome: "failed" as const };
  }

  const registration = await createRegistration({
    ...guest,
    attendeeType: "guest",
    amountDueKobo: guestPriceKobo(),
    confirmed: true,
    paymentMethod,
  });
  // Null means the same email was registered a moment ago; staff can simply try again.
  if (!registration) return { outcome: "failed" as const };
  return { outcome: "added" as const, registration, emailSent: await deliverTicket(registration) };
}

/** Sends a receipt back with a reason and tells the guest by email. Null if someone already reviewed it. */
export async function returnReceipt(receiptId: string, note: string) {
  const registration = await rejectReceipt(receiptId, note);
  if (!registration) return null;
  return { registration, emailSent: await sendReceiptReturned(registration, note) };
}
