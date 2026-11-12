import { convention } from "./config";

/** FAQ answers built from the config, so prices, dates and contacts stay in one place. */
export function faqs(guestPrice: string) {
  const email = convention.contact.email;
  return [
    {
      q: "Who can attend?",
      a: `Everyone is welcome. JCI Continental Lagos members attend free, and guests pay ${guestPrice}.`,
    },
    {
      q: "How do I register as a member?",
      a: `Choose "I'm a JCI Continental Lagos member" and use the email on your membership record. We check it against our member list and email your ticket straight away. If we can't find it, you can register as a guest or write to ${email}.`,
    },
    {
      q: "How do I pay?",
      a: `Guests pay ${guestPrice} by bank transfer to the chapter's account, then upload the receipt on the page that opens after registering (the link is emailed to you too). We match it with our account and email your ticket ${convention.bankTransfer.reviewTime}.`,
    },
    {
      q: "I registered but can't find my ticket.",
      a: `Check your spam or promotions folder, or use "Resend my ticket" in the registration section. Still nothing? Write to ${email} and we'll sort it out.`,
    },
    {
      q: "What should I wear?",
      a: `${convention.dressCode.summary} The rule: ${convention.dressCode.rule} Ready-made looks are in the Dress code section above.`,
    },
    {
      q: "What do I bring on the day?",
      a: "Your QR ticket, on your phone or printed. A screenshot works fine, even without internet.",
    },
    {
      q: "Where is it happening?",
      a: convention.venue
        ? `${convention.venue.name}, ${convention.venue.address}.`
        : "We're confirming the venue in Lagos and will email every registered attendee as soon as it's set.",
    },
  ];
}
