function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. See .env.example in the convention handoff.`);
  }
  return value;
}

export const env = {
  databaseUrl: () => required("CONVENTION_DATABASE_URL"),
  staffPasscode: () => required("CONVENTION_STAFF_PASSCODE"),
  resendApiKey: () => process.env.RESEND_API_KEY,
  emailFrom: () =>
    process.env.CONVENTION_EMAIL_FROM ?? "JCI Continental Lagos <onboarding@resend.dev>",

  /**
   * Public base URL, used in emails and QR codes.
   * Set CONVENTION_SITE_URL for Production only; Vercel previews fall back to their own branch URL.
   */
  siteUrl: () => {
    const explicit = process.env.CONVENTION_SITE_URL;
    if (explicit) return explicit.replace(/\/$/, "");
    if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_BRANCH_URL) {
      return `https://${process.env.VERCEL_BRANCH_URL}`;
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    return "http://localhost:3000";
  },
};
