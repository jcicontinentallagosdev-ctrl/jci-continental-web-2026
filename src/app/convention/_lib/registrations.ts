import { randomBytes, randomInt } from "node:crypto";
import {
  db,
  isDbFatal,
  resetDb,
  type AttendeeType,
  type PaymentMethod,
  type Receipt,
  type ReceiptType,
  type Registration,
} from "./db";

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O or 1/I, easy to read aloud

function ticketCode() {
  let code = "";
  for (let i = 0; i < 6; i++) code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return `CL-${code}`;
}

function ticketToken() {
  return randomBytes(24).toString("base64url");
}

function isUniqueViolation(error: unknown, constraint?: string) {
  const e = error as { code?: string; constraint_name?: string };
  return e?.code === "23505" && (!constraint || e.constraint_name === constraint);
}

/** True when this email belongs to a financial member (free ticket). */
export async function isOnMemberList(email: string) {
  const [row] = await db()`
    select 1 from convention_members
    where lower(trim(email)) = ${email} and is_financial = true
    limit 1
  `;
  return Boolean(row);
}

export async function findRegistrationByEmail(email: string) {
  const [row] = await db()<Registration[]>`
    select * from convention_registrations where lower(email) = ${email}
  `;
  return row ?? null;
}

export async function findRegistrationByToken(token: string) {
  const [row] = await db()<Registration[]>`
    select * from convention_registrations where ticket_token = ${token}
  `;
  return row ?? null;
}

export async function findRegistrationByCode(code: string) {
  const [row] = await db()<Registration[]>`
    select * from convention_registrations where ticket_code = ${code.trim().toUpperCase()}
  `;
  return row ?? null;
}

export async function countConfirmed() {
  const [row] = await db()<{ count: number }[]>`
    select count(*)::int as count from convention_registrations where status = 'confirmed'
  `;
  return row.count;
}

type NewRegistration = {
  fullName: string;
  email: string;
  phone: string;
  attendeeType: AttendeeType;
  amountDueKobo: number;
  confirmed: boolean;
  /** For a guest who has already paid (recorded by staff), how they paid. */
  paymentMethod?: PaymentMethod;
};

/** Inserts a registration. Returns null if the email was registered a moment ago (double submit). */
export async function createRegistration(input: NewRegistration) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const [row] = await db()<Registration[]>`
        insert into convention_registrations (
          ticket_code, ticket_token, full_name, email, phone, attendee_type,
          status, amount_due_kobo, amount_paid_kobo, payment_method, confirmed_at
        ) values (
          ${ticketCode()}, ${ticketToken()}, ${input.fullName}, ${input.email}, ${input.phone},
          ${input.attendeeType}, ${input.confirmed ? "confirmed" : "pending_payment"},
          ${input.amountDueKobo}, ${input.confirmed ? input.amountDueKobo : 0}, ${input.paymentMethod ?? null},
          ${input.confirmed ? new Date() : null}
        )
        returning *
      `;
      return row;
    } catch (error) {
      if (isUniqueViolation(error, "convention_registrations_email_key")) return null;
      if (isUniqueViolation(error)) continue; // ticket code collision, try another
      throw error;
    }
  }
  throw new Error("Could not generate a unique ticket code");
}

/** Refreshes the details on a registration that hasn't been confirmed yet. */
export async function updatePendingRegistration(id: string, input: NewRegistration) {
  const [row] = await db()<Registration[]>`
    update convention_registrations set
      full_name = ${input.fullName},
      phone = ${input.phone},
      attendee_type = ${input.attendeeType},
      amount_due_kobo = ${input.amountDueKobo},
      status = ${input.confirmed ? "confirmed" : "pending_payment"},
      confirmed_at = ${input.confirmed ? new Date() : null},
      updated_at = now()
    where id = ${id} and status = 'pending_payment'
    returning *
  `;
  return row ?? null;
}

export async function markTicketSent(id: string) {
  await db()`update convention_registrations set ticket_sent_at = now() where id = ${id}`;
}

export async function markInstructionsSent(id: string) {
  await db()`update convention_registrations set instructions_sent_at = now() where id = ${id}`;
}

/* Bank-transfer receipts ------------------------------------------------------ */

// Columns to load when listing receipts: everything except the file.
const RECEIPT_COLUMNS = [
  "id",
  "registration_id",
  "content_type",
  "file_name",
  "size_bytes",
  "status",
  "review_note",
  "reviewed_at",
  "created_at",
];

/** Each guest can send this many receipts in all, so a stuck upload loop can't fill the database. */
export const MAX_RECEIPTS_PER_REGISTRATION = 10;

/**
 * Saves a receipt for a guest who hasn't been confirmed yet, and retires any receipt of theirs still
 * waiting for review, so staff only ever see the newest one.
 */
export async function addReceipt(
  registrationId: string,
  file: { bytes: Buffer; contentType: ReceiptType; fileName: string | null },
) {
  return db().begin(async (tx) => {
    const [registration] = await tx<{ id: string }[]>`
      select id from convention_registrations
      where id = ${registrationId} and status = 'pending_payment'
      for update
    `;
    if (!registration) return { error: "not_pending" as const };
    const [{ count }] = await tx<{ count: number }[]>`
      select count(*)::int as count from convention_transfer_receipts where registration_id = ${registrationId}
    `;
    if (count >= MAX_RECEIPTS_PER_REGISTRATION) return { error: "too_many" as const };

    await tx`
      update convention_transfer_receipts set status = 'replaced'
      where registration_id = ${registrationId} and status = 'submitted'
    `;
    const [receipt] = await tx<Receipt[]>`
      insert into convention_transfer_receipts (registration_id, file, content_type, file_name, size_bytes)
      values (${registrationId}, ${file.bytes}, ${file.contentType}, ${file.fileName}, ${file.bytes.length})
      returning ${tx(RECEIPT_COLUMNS)}
    `;
    return { receipt };
  });
}

/** The guest's most recent receipt, if any: what their ticket page shows. */
export async function latestReceipt(registrationId: string) {
  const [row] = await db()<Receipt[]>`
    select ${db()(RECEIPT_COLUMNS)} from convention_transfer_receipts
    where registration_id = ${registrationId}
    order by created_at desc
    limit 1
  `;
  return row ?? null;
}

export async function findReceiptFile(id: string) {
  const [row] = await db()<{ file: Buffer; contentType: ReceiptType; fileName: string | null }[]>`
    select file, content_type, file_name from convention_transfer_receipts where id = ${id}
  `;
  return row ?? null;
}

export type ReceiptToReview = Registration & {
  receipt: Pick<Receipt, "id" | "contentType" | "fileName" | "sizeBytes" | "createdAt">;
};

/** Receipts waiting for staff, oldest first, each with the guest who sent it. */
export async function listReceiptsToReview(): Promise<ReceiptToReview[]> {
  const rows = await db()<
    (Registration & {
      receiptId: string;
      receiptContentType: Receipt["contentType"];
      receiptFileName: string | null;
      receiptSizeBytes: number;
      receiptCreatedAt: Date;
    })[]
  >`
    select r.*, t.id as receipt_id, t.content_type as receipt_content_type, t.file_name as receipt_file_name,
      t.size_bytes as receipt_size_bytes, t.created_at as receipt_created_at
    from convention_transfer_receipts t
    join convention_registrations r on r.id = t.registration_id
    where t.status = 'submitted' and r.status = 'pending_payment'
    order by t.created_at
  `;
  return rows.map(({ receiptId, receiptContentType, receiptFileName, receiptSizeBytes, receiptCreatedAt, ...registration }) => ({
    ...registration,
    receipt: {
      id: receiptId,
      contentType: receiptContentType,
      fileName: receiptFileName,
      sizeBytes: receiptSizeBytes,
      createdAt: receiptCreatedAt,
    },
  }));
}

/** Guests who registered but have no receipt waiting: they never sent one, or theirs was sent back. */
export type AwaitingTransfer = Registration & { lastReturnedAt: Date | null };

/** Everyone the treasurer is still waiting on, oldest first, so the longest wait is at the top. */
export async function listAwaitingTransfer() {
  return db()<AwaitingTransfer[]>`
    select r.*, (
      select max(t.reviewed_at) from convention_transfer_receipts t
      where t.registration_id = r.id and t.status = 'rejected'
    ) as last_returned_at
    from convention_registrations r
    where r.status = 'pending_payment' and r.attendee_type = 'guest' and not exists (
      select 1 from convention_transfer_receipts t where t.registration_id = r.id and t.status = 'submitted'
    )
    order by r.created_at
  `;
}

/**
 * Confirms a guest's payment: the registration becomes confirmed and any waiting receipt accepted,
 * in one transaction. newlyConfirmed is true only for the call that actually confirmed it, so two
 * staff tapping Confirm at once never send the ticket twice.
 */
export async function acceptTransfer(registrationId: string, paymentMethod: PaymentMethod = "bank_transfer") {
  return db().begin(async (tx) => {
    const [confirmed] = await tx<Registration[]>`
      update convention_registrations set
        status = 'confirmed',
        amount_paid_kobo = amount_due_kobo,
        payment_method = ${paymentMethod},
        confirmed_at = now(),
        updated_at = now()
      where id = ${registrationId} and status = 'pending_payment' and attendee_type = 'guest'
      returning *
    `;
    if (confirmed) {
      await tx`
        update convention_transfer_receipts set status = 'accepted', reviewed_at = now()
        where registration_id = ${registrationId} and status = 'submitted'
      `;
      return { registration: confirmed, newlyConfirmed: true };
    }
    const [existing] = await tx<Registration[]>`select * from convention_registrations where id = ${registrationId}`;
    return { registration: existing ?? null, newlyConfirmed: false };
  });
}

/** Sends a receipt back to the guest with a reason. Returns null if it was already reviewed or replaced. */
export async function rejectReceipt(receiptId: string, note: string) {
  const [row] = await db()<{ registrationId: string }[]>`
    update convention_transfer_receipts set status = 'rejected', review_note = ${note}, reviewed_at = now()
    where id = ${receiptId} and status = 'submitted'
    returning registration_id
  `;
  return row ? findRegistrationById(row.registrationId) : null;
}

export async function findRegistrationById(id: string) {
  const [row] = await db()<Registration[]>`
    select * from convention_registrations where id = ${id}
  `;
  return row ?? null;
}

/* Check-in desk ------------------------------------------------------------ */

export async function checkIn(token: string) {
  const [row] = await db()<Registration[]>`
    update convention_registrations set checked_in_at = now(), updated_at = now()
    where ticket_token = ${token} and status = 'confirmed' and checked_in_at is null
    returning *
  `;
  return row ?? null;
}

export async function undoCheckIn(token: string) {
  const [row] = await db()<Registration[]>`
    update convention_registrations set checked_in_at = null, updated_at = now()
    where ticket_token = ${token}
    returning *
  `;
  return row ?? null;
}

export async function searchRegistrations(query: string) {
  const q = query.trim();
  if (!q) return [];
  const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  // Phones are stored as +234…, so "0701…" and "234701…" both search for "701…".
  const digits = q.replace(/\D/g, "").replace(/^(234|0)/, "");
  const phoneLike = digits.length >= 3 ? `%${digits.slice(-10)}%` : null;
  return db()<Registration[]>`
    select * from convention_registrations
    where status <> 'cancelled' and (
      full_name ilike ${like}
      or email ilike ${like}
      or ticket_code ilike ${like}
      or (${phoneLike}::text is not null and regexp_replace(phone, '\\D', '', 'g') like ${phoneLike})
    )
    order by full_name
    limit 25
  `;
}

const EMPTY_STATS = {
  confirmed: 0,
  members: 0,
  guests: 0,
  checkedIn: 0,
  receiptsToCheck: 0,
  awaitingTransfer: 0,
  revenueKobo: 0,
  cashKobo: 0,
};

export async function getStats() {
  try {
    // Two small aggregates — not a per-row EXISTS over every registration (that scanned
    // the receipts table once per attendee and made the payments desk crawl).
    const [row] = await db()<
      {
        confirmed: number;
        members: number;
        guests: number;
        checkedIn: number;
        receiptsToCheck: number;
        awaitingTransfer: number;
        revenueKobo: number;
        cashKobo: number;
      }[]
    >`
      select
        count(*) filter (where status = 'confirmed')::int as confirmed,
        count(*) filter (where status = 'confirmed' and attendee_type = 'member')::int as members,
        count(*) filter (where status = 'confirmed' and attendee_type = 'guest')::int as guests,
        count(*) filter (where checked_in_at is not null)::int as checked_in,
        coalesce(sum(amount_paid_kobo) filter (where status = 'confirmed'), 0)::int as revenue_kobo,
        coalesce(sum(amount_paid_kobo) filter (where status = 'confirmed' and payment_method = 'cash'), 0)::int as cash_kobo,
        (
          select count(*)::int
          from convention_transfer_receipts t
          join convention_registrations r on r.id = t.registration_id
          where t.status = 'submitted' and r.status = 'pending_payment'
        ) as receipts_to_check,
        (
          select count(*)::int
          from convention_registrations r
          where r.status = 'pending_payment'
            and r.attendee_type = 'guest'
            and not exists (
              select 1 from convention_transfer_receipts t
              where t.registration_id = r.id and t.status = 'submitted'
            )
        ) as awaiting_transfer
      from convention_registrations
    `;
    // Pooler / empty-result edge cases can leave `row` undefined — never crash the desk UI.
    return row ?? EMPTY_STATS;
  } catch (error) {
    console.error("[convention] getStats failed", error);
    // A dead pooler socket poisons the cached client; drop it for the next request.
    if (isDbFatal(error)) resetDb();
    return EMPTY_STATS;
  }
}

/** Confirmed guests + money only — payments page already has the two pending lists in memory. */
export async function getConfirmedMoneyStats() {
  try {
    const [row] = await db()<
      {
        guests: number;
        revenueKobo: number;
        cashKobo: number;
      }[]
    >`
      select
        count(*) filter (where status = 'confirmed' and attendee_type = 'guest')::int as guests,
        coalesce(sum(amount_paid_kobo) filter (where status = 'confirmed'), 0)::int as revenue_kobo,
        coalesce(sum(amount_paid_kobo) filter (where status = 'confirmed' and payment_method = 'cash'), 0)::int as cash_kobo
      from convention_registrations
    `;
    return row ?? { guests: 0, revenueKobo: 0, cashKobo: 0 };
  } catch (error) {
    console.error("[convention] getConfirmedMoneyStats failed", error);
    if (isDbFatal(error)) resetDb();
    return { guests: 0, revenueKobo: 0, cashKobo: 0 };
  }
}

export async function listAllRegistrations() {
  return db()<Registration[]>`
    select * from convention_registrations order by status, full_name
  `;
}
