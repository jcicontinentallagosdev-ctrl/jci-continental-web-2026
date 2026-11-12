import { convention } from "./config";
import { formatNaira } from "./format";
import { guestPriceKobo } from "./pricing";

/** The account number in config.ts until the treasurer's real one goes in. */
const SAMPLE_ACCOUNT_NUMBER = "0000000000";

export function isSampleAccount() {
  return convention.bankTransfer.accountNumber === SAMPLE_ACCOUNT_NUMBER;
}

/**
 * Everything a guest needs to make the transfer, in the order a banking app asks for it.
 * `copy` is what the copy button puts on the clipboard (digits only for numbers).
 */
export function transferDetails(ticketCode: string) {
  const { bankName, accountName, accountNumber } = convention.bankTransfer;
  return [
    { label: "Bank", value: bankName },
    { label: "Account number", value: accountNumber, copy: accountNumber },
    { label: "Account name", value: accountName },
    { label: "Amount", value: formatNaira(guestPriceKobo()), copy: String(convention.guestPriceNaira) },
    { label: "Description", value: ticketCode, copy: ticketCode },
  ];
}

/** Where to get help with a transfer: WhatsApp when the committee has set a number, otherwise email. */
export function helpLink(ticketCode?: string) {
  const { whatsapp, email } = convention.contact;
  const about = ticketCode ? ` (ticket ${ticketCode})` : "";
  if (whatsapp) {
    const text = `Hi, I registered for the ${convention.shortName}${about} and need help with my bank transfer.`;
    return { href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, label: "Chat with us on WhatsApp", external: true };
  }
  return {
    href: `mailto:${email}?subject=${encodeURIComponent(`Bank transfer help${about}`)}`,
    label: `Email ${email}`,
    external: false,
  };
}

/** Receipt files the upload accepts. HEIC photos are converted to JPEG by iPhones when picked here. */
export const RECEIPT_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
export const RECEIPT_MAX_MB = 4;

/** Why an upload didn't work, in words for the guest. Shared by the upload endpoint and the page. */
export const RECEIPT_ERRORS = {
  missing: "Choose the screenshot or PDF of your transfer receipt first.",
  too_big: `That file is over ${RECEIPT_MAX_MB} MB. A screenshot of the receipt works just as well.`,
  wrong_type: "We can only take a photo or screenshot (JPG, PNG or WebP) or a PDF. A screenshot of the receipt works best.",
  not_pending: "Your payment is already confirmed, so there's nothing more to send. Your ticket is in your email.",
  too_many: "You've sent several receipts already. Please get in touch and we'll sort it out with you.",
  failed: "We couldn't save your receipt just now. Your file is still selected, so please try again in a minute.",
} as const;

export type ReceiptError = keyof typeof RECEIPT_ERRORS;

/** Ready-made reasons staff can pick when sending a receipt back. The guest sees the one chosen. */
export const RETURN_REASONS = [
  "We haven't received this transfer in our account yet.",
  "The amount on the receipt doesn't match the ticket price.",
  "We can't read the receipt. Please send a clearer screenshot, or the PDF from your bank app.",
] as const;
