import { convention, TIME_ZONE } from "./config";
import type { Registration } from "./db";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatNaira(kobo: number) {
  return naira.format(kobo / 100);
}

/** Parse a DB/ISO value; returns null instead of throwing on junk from a bad pooler row. */
function toValidDate(iso: string | Date | null | undefined) {
  if (iso == null || iso === "") return null;
  const date = iso instanceof Date ? iso : new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(iso: string | Date) {
  const date = toValidDate(iso);
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatShortDate(iso: string | Date) {
  const date = toValidDate(iso);
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatTime(iso: string | Date) {
  const date = toValidDate(iso);
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  })
    .format(date)
    .toUpperCase();
}

export function eventTimeRange() {
  return `${formatTime(convention.startsAt)} – ${formatTime(convention.endsAt)}`;
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

/** Google Calendar "add event" link, the same pattern the main site already uses. */
export function googleCalendarUrl() {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: convention.name,
    dates: `${stamp(convention.startsAt)}/${stamp(convention.endsAt)}`,
    details: convention.description,
    location: convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "Lagos, Nigeria",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function admissionLabel(registration: Registration) {
  return registration.attendeeType === "member"
    ? "Member · Free"
    : `Guest · Paid ${formatNaira(registration.amountPaidKobo || registration.amountDueKobo)}`;
}

/** +2348031234567 → 0803 123 4567. Other numbers are returned as stored. */
export function displayPhone(phone: string) {
  const local = /^\+234(\d{3})(\d{3})(\d{4})$/.exec(phone);
  return local ? `0${local[1]} ${local[2]} ${local[3]}` : phone;
}

export function formatDateTime(iso: string | Date) {
  const date = toValidDate(iso);
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  }).format(date);
}

/** Whole days until the convention starts (0 or less once it has begun). */
export function daysUntilEvent(now = Date.now()) {
  return Math.ceil((Date.parse(convention.startsAt) - now) / 86_400_000);
}
