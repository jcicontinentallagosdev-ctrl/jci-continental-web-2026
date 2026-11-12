"use server";

import { convention } from "./_lib/config";
import { sendSponsorEnquiryEmails } from "./_lib/email";
import { firstName } from "./_lib/format";
import { saveSponsorEnquiry, sentRecently } from "./_lib/sponsors";
import { validateSponsorEnquiry, type SponsorField } from "./_lib/validation";

export type SponsorState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<SponsorField, string>> }
  | { status: "sent"; firstName: string; organisation: string; email: string }
  | { status: "error" };

export async function sendSponsorEnquiry(_previous: SponsorState, formData: FormData): Promise<SponsorState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("website")) return { status: "idle" };

  const parsed = validateSponsorEnquiry(formData, convention.sponsorship);
  if (!parsed.ok) return { status: "invalid", errors: parsed.errors };
  const enquiry = parsed.data;

  try {
    const duplicate = await sentRecently(enquiry.email);
    await saveSponsorEnquiry(enquiry);
    // A second send within minutes is saved but doesn't email everyone again.
    if (!duplicate) await sendSponsorEnquiryEmails(enquiry);
  } catch (error) {
    console.error("[convention] Sponsor enquiry failed", error);
    return { status: "error" };
  }

  return { status: "sent", firstName: firstName(enquiry.contactName), organisation: enquiry.organisation, email: enquiry.email };
}
