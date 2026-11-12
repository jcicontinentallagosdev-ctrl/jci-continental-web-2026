import type { AttendeeType } from "./db";

export type RegistrationField = "fullName" | "email" | "phone" | "attendeeType";

export type RegistrationInput = {
  fullName: string;
  email: string;
  phone: string;
  attendeeType: AttendeeType | "";
};

export type FieldErrors = Partial<Record<RegistrationField, string>>;

export function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

/** Returns +234XXXXXXXXXX for Nigerian numbers, +<digits> for international ones, or null. */
export function normalizePhone(raw: string) {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (/^0[789][01]\d{8}$/.test(digits)) return `+234${digits.slice(1)}`;
  if (/^234[789][01]\d{8}$/.test(digits)) return `+${digits}`;
  if (/^[789][01]\d{8}$/.test(digits)) return `+234${digits}`;
  if (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return null;
}

export function readRegistrationForm(formData: FormData): RegistrationInput {
  const text = (key: string) => String(formData.get(key) ?? "");
  const type = text("attendeeType");
  return {
    fullName: text("fullName"),
    email: text("email"),
    phone: text("phone"),
    attendeeType: type === "member" || type === "guest" ? type : "",
  };
}

export function validateRegistration(input: RegistrationInput) {
  const errors: FieldErrors = {};
  const fullName = input.fullName.trim().replace(/\s+/g, " ");
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);

  if (fullName.length < 2 || !/\p{L}/u.test(fullName)) {
    errors.fullName = "Enter your full name as you'd like it on your ticket.";
  } else if (fullName.length > 80) {
    errors.fullName = "That name is a little long. Keep it under 80 characters.";
  }

  if (!/^[^\s@,;()<>]+@[^\s@,;()<>]+\.[a-z]{2,}$/i.test(email) || email.length > 254) {
    errors.email = "Enter a valid email, like ada@example.com. Your ticket is sent here.";
  }

  if (!phone) {
    errors.phone = "Enter a phone number we can reach you on, like 0803 123 4567.";
  }

  if (!input.attendeeType) {
    errors.attendeeType = "Choose how you're attending.";
  }

  if (Object.keys(errors).length > 0) return { ok: false as const, errors };

  return {
    ok: true as const,
    data: {
      fullName,
      email,
      phone: phone!,
      attendeeType: input.attendeeType as AttendeeType,
    },
  };
}

/* Sponsorship enquiry ------------------------------------------------------------ */

export type SponsorField = "organisation" | "contactName" | "role" | "email" | "phone" | "interests" | "budget" | "message";

export type SponsorEnquiry = {
  organisation: string;
  contactName: string;
  role: string | null;
  email: string;
  phone: string;
  interests: string[];
  budget: string | null;
  message: string | null;
};

export function validateSponsorEnquiry(
  formData: FormData,
  options: { interests: string[]; budgets: string[] },
) {
  const text = (key: string) => String(formData.get(key) ?? "").trim().replace(/[ \t]+/g, " ");
  const errors: Partial<Record<SponsorField, string>> = {};

  const organisation = text("organisation");
  const contactName = text("contactName");
  const role = text("role");
  const email = normalizeEmail(text("email"));
  const phone = normalizePhone(text("phone"));
  const interests = formData.getAll("interests").map(String).filter((i) => options.interests.includes(i));
  const budget = text("budget");
  const message = String(formData.get("message") ?? "").trim();

  if (organisation.length < 2) errors.organisation = "Enter your organisation's name.";
  else if (organisation.length > 120) errors.organisation = "Keep the organisation name under 120 characters.";
  if (contactName.length < 2 || !/\p{L}/u.test(contactName)) errors.contactName = "Enter the name of the person we should speak to.";
  else if (contactName.length > 80) errors.contactName = "Keep the name under 80 characters.";
  if (role.length > 80) errors.role = "Keep the role under 80 characters.";
  if (!/^[^\s@,;()<>]+@[^\s@,;()<>]+\.[a-z]{2,}$/i.test(email) || email.length > 254) {
    errors.email = "Enter a valid email, like ada@company.com, so we can reply.";
  }
  if (!phone) errors.phone = "Enter a phone number we can reach you on, like 0803 123 4567.";
  if (interests.length === 0) errors.interests = "Pick at least one way you'd like to get involved.";
  if (budget && !options.budgets.includes(budget)) errors.budget = "Choose one of the budget options.";
  if (message.length > 1000) errors.message = "Keep your message under 1,000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false as const, errors };
  return {
    ok: true as const,
    data: {
      organisation,
      contactName,
      role: role || null,
      email,
      phone: phone!,
      interests,
      budget: budget || null,
      message: message || null,
    } satisfies SponsorEnquiry,
  };
}
