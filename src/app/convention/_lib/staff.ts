import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

const COOKIE = "convention_staff";
const TWELVE_HOURS = 60 * 60 * 12;

export type StaffRole = "staff" | "treasurer";

/**
 * Door staff and the treasurer unlock with different passcodes. The cookie holds an HMAC of
 * role + that role's passcode, keyed with the database URL, so it can't be forged and changing
 * a passcode signs that role out.
 */
function sessionValue(role: StaffRole) {
  const passcode = role === "treasurer" ? env.treasurerPasscode() : env.staffPasscode();
  return createHmac("sha256", env.databaseUrl()).update(`${role}:${passcode}`).digest("base64url");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

async function setSession(role: StaffRole) {
  (await cookies()).set(COOKIE, sessionValue(role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/convention",
    maxAge: TWELVE_HOURS,
  });
}

/** Which desk role the browser has unlocked, if any. */
export async function getStaffRole(): Promise<StaffRole | null> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return null;
  // Check treasurer first so a mis-matched cookie never elevates by accident.
  if (same(value, sessionValue("treasurer"))) return "treasurer";
  if (same(value, sessionValue("staff"))) return "staff";
  return null;
}

/** Door staff or treasurer — enough for check-in. */
export async function isStaff() {
  return (await getStaffRole()) !== null;
}

/** Treasurer only — payments desk and confirming money. */
export async function isTreasurer() {
  return (await getStaffRole()) === "treasurer";
}

/**
 * Unlock with either passcode. Treasurer code wins if both somehow match.
 * Pass requireTreasurer when unlocking the payments desk so a door code can't sneak in.
 */
export async function startStaffSession(passcode: string, opts?: { requireTreasurer?: boolean }) {
  const trimmed = passcode.trim();
  if (same(trimmed, env.treasurerPasscode())) {
    await setSession("treasurer");
    return true;
  }
  if (opts?.requireTreasurer) return false;
  if (same(trimmed, env.staffPasscode())) {
    await setSession("staff");
    return true;
  }
  return false;
}

export async function endStaffSession() {
  (await cookies()).delete({ name: COOKIE, path: "/convention" });
}
