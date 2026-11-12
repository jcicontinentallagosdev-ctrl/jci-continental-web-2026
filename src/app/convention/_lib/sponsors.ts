import { db } from "./db";
import type { SponsorEnquiry } from "./validation";

export async function saveSponsorEnquiry(enquiry: SponsorEnquiry) {
  await db()`
    insert into convention_sponsor_enquiries
      (organisation, contact_name, role, email, phone, interests, budget, message)
    values (
      ${enquiry.organisation}, ${enquiry.contactName}, ${enquiry.role}, ${enquiry.email},
      ${enquiry.phone}, ${enquiry.interests}, ${enquiry.budget}, ${enquiry.message}
    )
  `;
}

/** True if this email sent an enquiry in the last 10 minutes (a double submit or a bot). */
export async function sentRecently(email: string) {
  const [row] = await db()`
    select 1 from convention_sponsor_enquiries
    where email = ${email} and created_at > now() - interval '10 minutes'
    limit 1
  `;
  return Boolean(row);
}
