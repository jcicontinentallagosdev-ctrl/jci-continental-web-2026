import postgres from "postgres";
import { env } from "./env";

/**
 * One small connection pool per server instance.
 * prepare: false keeps it compatible with Supabase's transaction pooler (port 6543).
 * That pooler is transaction-mode PgBouncer: more than one multiplexed connection
 * desyncs the protocol ("invalid frontend message type 32" / CONNECTION_CLOSED).
 */
// Bump when pool options change so Turbopack HMR doesn't keep a poisoned max:3 client.
const POOL_KEY = "v2-single-pooler";
const globalForDb = globalThis as unknown as {
  conventionSql?: postgres.Sql;
  conventionPoolKey?: string;
};

export function db() {
  if (globalForDb.conventionPoolKey !== POOL_KEY) {
    resetDb();
    globalForDb.conventionPoolKey = POOL_KEY;
  }
  if (!globalForDb.conventionSql) {
    const url = env.databaseUrl();
    // Local docker and Supabase's :6543 pooler both need a single connection.
    const onThisMachine = /@(127\.0\.0\.1|localhost)[:/]/.test(url);
    const transactionPooler = /:6543\b/.test(url) || /pooler\.supabase\.com/.test(url);
    globalForDb.conventionSql = postgres(url, {
      prepare: false,
      max: onThisMachine || transactionPooler ? 1 : 3,
      idle_timeout: 20,
      // Recycle sockets before the pooler drops them mid-request.
      max_lifetime: 60 * 5,
      connect_timeout: 10,
      transform: postgres.camel,
    });
  }
  return globalForDb.conventionSql;
}

/** Drop a poisoned client so the next request opens a fresh socket. */
export function resetDb() {
  const sql = globalForDb.conventionSql;
  globalForDb.conventionSql = undefined;
  if (sql) void sql.end({ timeout: 1 }).catch(() => {});
}

/** Fatal pooler / socket errors that leave the cached client unusable. */
export function isDbFatal(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String(error.code) : "";
  const message = "message" in error ? String(error.message) : "";
  return (
    code === "CONNECTION_CLOSED" ||
    code === "CONNECTION_ENDED" ||
    code === "08P01" ||
    code === "57P01" ||
    /CONNECTION_CLOSED|invalid frontend message/i.test(message)
  );
}

export type AttendeeType = "member" | "guest";
export type RegistrationStatus = "pending_payment" | "confirmed" | "cancelled";
export type PaymentMethod = "bank_transfer" | "cash";

export type Registration = {
  id: string;
  ticketCode: string;
  ticketToken: string;
  fullName: string;
  email: string;
  phone: string;
  attendeeType: AttendeeType;
  status: RegistrationStatus;
  amountDueKobo: number;
  amountPaidKobo: number;
  paymentMethod: PaymentMethod | null;
  confirmedAt: Date | null;
  ticketSentAt: Date | null;
  instructionsSentAt: Date | null;
  checkedInAt: Date | null;
  createdAt: Date;
};

export type ReceiptStatus = "submitted" | "replaced" | "accepted" | "rejected";
export type ReceiptType = "image/jpeg" | "image/png" | "image/webp" | "application/pdf";

/** A bank-transfer receipt, without the file itself (that is only loaded to show it to staff). */
export type Receipt = {
  id: string;
  registrationId: string;
  contentType: ReceiptType;
  fileName: string | null;
  sizeBytes: number;
  status: ReceiptStatus;
  reviewNote: string | null;
  reviewedAt: Date | null;
  createdAt: Date;
};
