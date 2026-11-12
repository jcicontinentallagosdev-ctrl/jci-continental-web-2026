import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { helpLink, isSampleAccount, transferDetails } from "./bank";
import { convention } from "./config";
import type { Registration } from "./db";
import type { SponsorEnquiry } from "./validation";
import { env } from "./env";
import { displayPhone, firstName, formatDate, formatNaira, googleCalendarUrl } from "./format";
import { ticketQrPng, ticketUrl } from "./qr";
import { markInstructionsSent, markTicketSent } from "./registrations";

type EmailAttachment = {
  filename: string;
  content: Buffer;
  /** When set, the file can be shown inline with <img src="cid:…"> (Gmail-friendly QR). */
  contentId?: string;
};

type Email = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailAttachment[];
  replyTo?: string;
};

async function sendEmail(email: Email) {
  const apiKey = env.resendApiKey();

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") throw new Error("Missing environment variable RESEND_API_KEY");
    // Local development without a key: save the email to disk so it can be opened in a browser.
    const dir = path.join(process.cwd(), ".convention-outbox");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${email.to.replace(/[^a-z0-9@.]/gi, "_")}.html`);
    await writeFile(file, email.html);
    console.info(`[convention] RESEND_API_KEY not set. Email to ${email.to} saved to ${file}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.emailFrom(),
      to: [email.to],
      reply_to: email.replyTo ?? convention.contact.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments: email.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content.toString("base64"),
        // Resend uses content_id so the HTML can reference cid:… for inline images.
        ...(a.contentId ? { content_id: a.contentId } : {}),
      })),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Resend failed (${response.status}): ${await response.text()}`);
  }
}

/**
 * Emails the ticket and records when it was sent. Never throws: a failed email must not
 * undo a confirmed registration. Attendees can always use "Resend my ticket".
 */
export async function deliverTicket(registration: Registration) {
  try {
    // Embed the QR both as an attachment (offline at the door) and inline via CID
    // so Gmail shows it without fetching our website URL.
    const qrPng = await ticketQrPng(registration.ticketToken);
    const qrContentId = "ticket-qr";
    await sendEmail({
      to: registration.email,
      ...ticketEmail(registration, qrContentId),
      attachments: [
        {
          filename: `${registration.ticketCode}-qr.png`,
          content: qrPng,
          contentId: qrContentId,
        },
      ],
    });
    await markTicketSent(registration.id);
    return true;
  } catch (error) {
    console.error(`[convention] Could not send ticket ${registration.ticketCode}`, error);
    return false;
  }
}

/* Template ------------------------------------------------------------------ */

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** The ticket email, in the committee's words. Members don't pay, so they get no payment lines. */
function ticketEmail(registration: Registration, qrContentId: string) {
  const url = ticketUrl(registration.ticketToken);
  // Inline CID image — do not use the public /qr.png URL (breaks when the site URL isn't live yet).
  const qrSrc = `cid:${qrContentId}`;
  const first = firstName(registration.fullName);
  const isGuest = registration.attendeeType === "guest";
  const year = new Date(convention.startsAt).getFullYear();
  const venueText = convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "To be announced";
  const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Lagos" }).format(
    new Date(convention.startsAt),
  );
  const subject = `You're Confirmed! Your JCI Continental Lagos ${year} Convention Ticket`;
  const dressCodeUrl = `${env.siteUrl()}/convention#dress-code`;
  const amountPaid = formatNaira(registration.amountPaidKobo || registration.amountDueKobo);
  const paidCash = registration.paymentMethod === "cash";

  const details: [string, string][] = [
    ["Event", convention.theme],
    ["Name", registration.fullName],
    ["Date", formatDate(convention.startsAt)],
    ["Venue", venueText],
    ["Ticket ID", registration.ticketCode],
    isGuest ? ["Amount paid", `${amountPaid} ${paidCash ? "in cash" : "by bank transfer"}`] : ["Admission", "Member · Free"],
  ];
  const beforeTheDay = [
    "Keep this email and your ticket safe.",
    "Look out for further event updates and any venue or programme announcements.",
    "Arrive early to enjoy the red carpet experience and avoid check-in delays.",
    "Have your ticket ready when you arrive.",
  ];
  const opening = !isGuest
    ? "You're officially registered! Your member ticket is free."
    : paidCash
      ? "We've received your payment. You're officially registered!"
      : "We've confirmed your bank transfer. You're officially registered!";

  const row = ([label, value]: [string, string]) => `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#546165;font-size:14px;width:132px;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#001319;font-size:14px;font-weight:600">${escape(value)}</td>
    </tr>`;
  const heading = (text: string) =>
    `<p style="margin:0 0 10px;color:#00779c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${text}</p>`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(subject)}</title></head>
<body style="margin:0;padding:0;background:#e6f5fa;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif">
  <div style="display:none;max-height:0;overflow:hidden">Your ticket for ${formatDate(convention.startsAt)}. Show the QR code at the registration desk.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e6f5fa;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
        <tr><td style="padding:28px 28px 0;color:#2b2b3d;font-size:16px;line-height:1.6">
          <p style="margin:0;color:#00779c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">JCI Continental Lagos</p>
          <h1 style="margin:12px 0 16px;color:#001319;font-size:26px;line-height:1.25">You're confirmed!</h1>
          <p style="margin:0 0 12px">Hello ${escape(first)},</p>
          <p style="margin:0 0 12px;font-weight:600;color:#001319">${opening}</p>
          <p style="margin:0 0 12px">Thank you for securing your place at the ${escape(convention.name)}.</p>
          <p style="margin:0">We look forward to welcoming you to an evening of celebration, recognition, leadership and meaningful connections.</p>
        </td></tr>
        <tr><td style="padding:24px 28px 0">
          ${heading("Your registration details")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #cfe3ea">${details.map(row).join("")}</table>
        </td></tr>
        <tr><td style="padding:24px 28px">
          ${heading("Your event ticket")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #cfe3ea;border-radius:12px">
            <tr><td align="center" style="padding:20px">
              <img src="${qrSrc}" width="220" height="220" alt="QR code for ticket ${registration.ticketCode}" style="display:block;width:220px;height:220px">
              <p style="margin:8px 0 0;font-family:Menlo,Consolas,monospace;font-size:18px;font-weight:700;letter-spacing:.12em;color:#001319">${registration.ticketCode}</p>
            </td></tr>
          </table>
          <p style="margin:16px 0 8px;color:#2b2b3d;font-size:15px;line-height:1.6">Please keep this ticket accessible on your phone or print a copy. Present your ticket or QR code at the registration desk for verification and entry.</p>
          <p style="margin:0 0 20px;color:#2b2b3d;font-size:15px;line-height:1.6">Your ticket is for individual admission. Please do not share or duplicate it.</p>
          <a href="${url}" style="display:inline-block;background:#00779c;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 24px;border-radius:12px">View your ticket online</a>
          <p style="margin:16px 0 0;font-size:14px"><a href="${googleCalendarUrl()}" style="color:#00779c">Add to Google Calendar</a></p>
        </td></tr>
        <tr><td style="padding:0 28px 24px">
          ${heading("A few things before the big day")}
          <ul style="margin:0;padding-left:20px;color:#2b2b3d;font-size:15px;line-height:1.7">${beforeTheDay.map((item) => `<li>${item}</li>`).join("")}</ul>
          <p style="margin:16px 0 0;color:#2b2b3d;font-size:15px;line-height:1.6"><strong style="color:#001319">What to wear:</strong> ${escape(convention.dressCode.summary)} ${escape(convention.dressCode.rule)} <a href="${dressCodeUrl}" style="color:#00779c">See the looks</a></p>
        </td></tr>
        <tr><td style="padding:0 28px 28px;color:#2b2b3d;font-size:16px;line-height:1.6">
          <p style="margin:0 0 12px">For enquiries, contact us at <a href="mailto:${escape(convention.contact.email)}" style="color:#00779c">${escape(convention.contact.email)}</a>.</p>
          <p style="margin:0 0 16px;font-weight:600;color:#001319">See you on ${dayMonth}!</p>
          <p style="margin:0;color:#001319">JCI Continental Lagos<br><span style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#00779c">${escape(convention.theme)}.</span></p>
        </td></tr>
        <tr><td style="padding:20px 28px;background:#f5fafc;color:#546165;font-size:13px;line-height:1.6">
          The QR code is also attached to this email, so you can open it without internet at the venue.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `You're confirmed!`,
    ``,
    `Hello ${first},`,
    ``,
    opening,
    `Thank you for securing your place at the ${convention.name}.`,
    `We look forward to welcoming you to an evening of celebration, recognition, leadership and meaningful connections.`,
    ``,
    `YOUR REGISTRATION DETAILS`,
    ...details.map(([label, value]) => `- ${label}: ${value}`),
    ``,
    `YOUR EVENT TICKET`,
    `View your ticket and QR code: ${url}`,
    `Please keep this ticket accessible on your phone or print a copy. Present your ticket or QR code at the registration desk for verification and entry. The QR code is also attached to this email.`,
    `Your ticket is for individual admission. Please do not share or duplicate it.`,
    ``,
    `A FEW THINGS BEFORE THE BIG DAY`,
    ...beforeTheDay.map((item) => `- ${item}`),
    ``,
    `What to wear: ${convention.dressCode.summary} ${convention.dressCode.rule} See the looks: ${dressCodeUrl}`,
    ``,
    `For enquiries, contact us at ${convention.contact.email}.`,
    ``,
    `See you on ${dayMonth}!`,
    ``,
    `JCI Continental Lagos`,
    `${convention.theme.toUpperCase()}.`,
  ].join("\n");

  return { subject, html, text };
}

/* Bank transfers ------------------------------------------------------------------ */

/** The plain card the transfer emails share: same look as the ticket email, without the ticket. */
function guestEmail({ preheader, title, body }: { preheader: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title></head>
<body style="margin:0;padding:0;background:#e6f5fa;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif">
  <div style="display:none;max-height:0;overflow:hidden">${escape(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e6f5fa;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
        <tr><td style="padding:28px;color:#2b2b3d;font-size:16px;line-height:1.6">
          <p style="margin:0;color:#00779c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">JCI Continental Lagos</p>
          <h1 style="margin:12px 0 16px;color:#001319;font-size:26px;line-height:1.25">${escape(title)}</h1>
          ${body}
          <p style="margin:24px 0 0;color:#001319">JCI Continental Lagos<br><span style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#00779c">${escape(convention.theme)}.</span></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const p = (html: string, style = "") => `<p style="margin:0 0 12px;${style}">${html}</p>`;
const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#00779c;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 24px;border-radius:12px">${escape(label)}</a>`;

function transferTable(ticketCode: string) {
  const rows = transferDetails(ticketCode)
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#546165;font-size:14px;width:132px;vertical-align:top">${label}</td>
        <td style="padding:8px 0;color:#001319;font-size:16px;font-weight:700">${escape(value)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 16px;border-top:1px solid #cfe3ea">${rows}</table>`;
}

function helpHtml(ticketCode: string) {
  const help = helpLink(ticketCode);
  return p(`Paid from someone else's account, or stuck? <a href="${escape(help.href)}" style="color:#00779c">${escape(help.label)}</a>.`, "font-size:15px");
}

/**
 * Right after a guest registers: the account to pay into and the link to upload their receipt,
 * so they can finish later. Staff can send it again as a reminder from the Payments page.
 * Never throws; returns whether it went out.
 */
export async function sendTransferDetails(registration: Registration, { reminder = false } = {}) {
  const first = firstName(registration.fullName);
  const url = ticketUrl(registration.ticketToken);
  const price = formatNaira(registration.amountDueKobo);
  const title = reminder ? "Your seat is still held" : "Complete your registration";
  const subject = reminder ? `Reminder: transfer ${price} to confirm your seat` : `Complete your registration: transfer ${price}`;
  const intro = reminder
    ? `Your place at the ${convention.name} is still held, but we haven't had your transfer receipt yet. Already paid? Just send us the receipt with the button below. If not, transfer ${price} to the account below first.`
    : `Your place at the ${convention.name} is held. To confirm it, transfer ${price} to the account below, then send us your receipt.`;
  const sample = isSampleAccount() ? p("<strong>These are sample account details. Don't pay into them.</strong>", "color:#b42318") : "";
  const html = guestEmail({
    preheader: reminder ? "Already paid? Just send us your receipt." : `Transfer ${price} and send your receipt to confirm your seat.`,
    title,
    body: [
      p(`Hello ${escape(first)},`),
      p(escape(intro).replace(price, `<strong>${price}</strong>`)),
      sample,
      transferTable(registration.ticketCode),
      p(`Please put <strong>${registration.ticketCode}</strong> in the transfer description, so we can match your payment quickly.`),
      `<p style="margin:20px 0">${button(url, "I've paid: send my receipt")}</p>`,
      p(`We check every transfer against our account and email your ticket ${escape(convention.bankTransfer.reviewTime)} of receiving your receipt.`),
      helpHtml(registration.ticketCode),
    ].join(""),
  });
  const text = [
    title,
    ``,
    `Hello ${first},`,
    ``,
    intro,
    ...(isSampleAccount() ? [``, `THESE ARE SAMPLE ACCOUNT DETAILS. DON'T PAY INTO THEM.`] : []),
    ``,
    ...transferDetails(registration.ticketCode).map(({ label, value }) => `- ${label}: ${value}`),
    ``,
    `Please put ${registration.ticketCode} in the transfer description, so we can match your payment quickly.`,
    ``,
    `Send your receipt here: ${url}`,
    ``,
    `We check every transfer against our account and email your ticket ${convention.bankTransfer.reviewTime} of receiving your receipt.`,
    `Need help? ${helpLink(registration.ticketCode).href}`,
  ].join("\n");

  try {
    await sendEmail({ to: registration.email, subject, html, text });
    await markInstructionsSent(registration.id);
    return true;
  } catch (error) {
    console.error(`[convention] Could not send transfer details for ${registration.ticketCode}`, error);
    return false;
  }
}

/** When staff send a receipt back: the reason, and the link to try again. Never throws. */
export async function sendReceiptReturned(registration: Registration, reason: string) {
  const first = firstName(registration.fullName);
  const url = ticketUrl(registration.ticketToken);
  const title = "We couldn't confirm your transfer yet";
  const html = guestEmail({
    preheader: "Your seat is still held. Here's what we need.",
    title,
    body: [
      p(`Hello ${escape(first)},`),
      p(`We looked at the receipt you sent for ticket <strong>${registration.ticketCode}</strong>, but we couldn't match it to a payment yet:`),
      `<p style="margin:0 0 16px;padding:12px 16px;background:#fff3d6;border-left:4px solid #7a4d00;color:#001319;font-weight:600;white-space:pre-wrap">${escape(reason)}</p>`,
      p("Your seat is still held. If you've paid, send a clearer receipt from your bank app. If you haven't, the account details are on your page."),
      `<p style="margin:20px 0">${button(url, "Send a new receipt")}</p>`,
      helpHtml(registration.ticketCode),
    ].join(""),
  });
  const text = [
    title,
    ``,
    `Hello ${first},`,
    ``,
    `We looked at the receipt you sent for ticket ${registration.ticketCode}, but we couldn't match it to a payment yet:`,
    reason,
    ``,
    `Your seat is still held. If you've paid, send a clearer receipt from your bank app. If you haven't, the account details are on your page.`,
    ``,
    `Send a new receipt: ${url}`,
    `Need help? ${helpLink(registration.ticketCode).href}`,
  ].join("\n");

  try {
    await sendEmail({ to: registration.email, subject: `Action needed: your convention ticket ${registration.ticketCode}`, html, text });
    return true;
  } catch (error) {
    console.error(`[convention] Could not send receipt returned email for ${registration.ticketCode}`, error);
    return false;
  }
}

/* Sponsorship enquiries ------------------------------------------------------------ */

/**
 * Emails the committee (replying goes straight to the sponsor) and sends the sponsor a copy.
 * Never throws: the enquiry is already saved in the database.
 */
export async function sendSponsorEnquiryEmails(enquiry: SponsorEnquiry) {
  const rows: [string, string][] = [
    ["Organisation", enquiry.organisation],
    ["Contact", enquiry.contactName + (enquiry.role ? `, ${enquiry.role}` : "")],
    ["Email", enquiry.email],
    ["Phone", displayPhone(enquiry.phone)],
    ["Interested in", enquiry.interests.join(", ")],
    ["Budget", enquiry.budget ?? "Not given"],
    ["Message", enquiry.message ?? "None"],
  ];
  const table = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#546165;font-size:14px;vertical-align:top;width:120px">${label}</td>
        <td style="padding:8px 0;color:#001319;font-size:14px;font-weight:600;white-space:pre-wrap">${escape(value)}</td>
      </tr>`,
    )
    .join("");
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const wrap = (heading: string, intro: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:#e6f5fa;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:2px solid #001319">
    <tr><td style="padding:28px">
      <p style="margin:0;color:#00779c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${escape(convention.shortName)} · Sponsorship</p>
      <h1 style="margin:12px 0 8px;color:#001319;font-size:24px;line-height:1.25">${heading}</h1>
      <p style="margin:0 0 16px;color:#2b2b3d;font-size:16px;line-height:1.6">${intro}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #cfe3ea">${table}</table>
    </td></tr>
  </table>
</body></html>`;

  const committee = convention.sponsorship.notifyEmail ?? convention.contact.email;
  const results = await Promise.allSettled([
    sendEmail({
      to: committee,
      replyTo: enquiry.email,
      subject: `New sponsorship enquiry: ${enquiry.organisation}`,
      html: wrap(
        `New sponsorship enquiry from ${escape(enquiry.organisation)}`,
        `Reply to this email to answer ${escape(firstName(enquiry.contactName))} directly.`,
      ),
      text: `New sponsorship enquiry. Reply to this email to answer them directly.\n\n${textRows}`,
    }),
    sendEmail({
      to: enquiry.email,
      subject: `We've got your sponsorship enquiry: ${convention.shortName}`,
      html: wrap(
        `Thanks, ${escape(firstName(enquiry.contactName))}. We've got your enquiry.`,
        `The convention team will get back to you ${escape(convention.sponsorship.responseTime)}. Here's a copy of what you sent.`,
      ),
      text: `Thanks, ${firstName(enquiry.contactName)}. The convention team will get back to you ${convention.sponsorship.responseTime}.\n\n${textRows}`,
    }),
  ]);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[convention] Sponsor enquiry email ${i === 0 ? "to committee" : "to sponsor"} failed`, result.reason);
    }
  });
}
