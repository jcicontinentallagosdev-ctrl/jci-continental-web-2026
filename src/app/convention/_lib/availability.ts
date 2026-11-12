import { convention } from "./config";
import { countConfirmed } from "./registrations";

export function registrationIsOpen(now = Date.now()) {
  return now < Date.parse(convention.registrationClosesAt);
}

export async function isSoldOut() {
  if (convention.capacity == null) return false;
  return (await countConfirmed()) >= convention.capacity;
}

/** For the landing pages: is the form open, and are seats left? */
export async function registrationStatus() {
  const open = registrationIsOpen();
  let soldOut = false;
  if (open) {
    try {
      soldOut = await isSoldOut();
    } catch (error) {
      // If the database is briefly unreachable, still show the form; the action re-checks.
      console.error("[convention] Capacity check failed", error);
    }
  }
  return { open, soldOut };
}
