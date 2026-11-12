import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

const COOKIE = "convention_staff";
const TWELVE_HOURS = 60 * 60 * 12;

/**
 * Staff unlock the check-in desk with one shared passcode. The cookie holds an HMAC of the
 * passcode keyed with the database URL (a server-only secret), so it can't be forged, and
 * changing the passcode signs everyone out.
 */
function sessionValue() {
  return createHmac("sha256", env.databaseUrl()).update(`staff:${env.staffPasscode()}`).digest("base64url");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function isStaff() {
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value && same(value, sessionValue()));
}

export async function startStaffSession(passcode: string) {
  if (!same(passcode.trim(), env.staffPasscode())) return false;
  (await cookies()).set(COOKIE, sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/convention",
    maxAge: TWELVE_HOURS,
  });
  return true;
}

export async function endStaffSession() {
  (await cookies()).delete({ name: COOKIE, path: "/convention" });
}
