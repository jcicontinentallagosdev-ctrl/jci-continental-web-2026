import { displayPhone, formatDateTime } from "../../_lib/format";
import { listAllRegistrations } from "../../_lib/registrations";
import { isStaff } from "../../_lib/staff";

/** Spreadsheet of everyone registered. Print it as a backup in case the venue has no internet. */
export async function GET() {
  if (!(await isStaff())) return new Response("Unlock the check-in desk first", { status: 401 });

  const rows = await listAllRegistrations();
  const header = ["Ticket code", "Full name", "Email", "Phone", "Type", "Status", "Amount paid (NGN)", "Paid by", "Checked in (Lagos time)", "Registered (Lagos time)"];
  const lines = rows.map((r) =>
    [
      r.ticketCode,
      r.fullName,
      r.email,
      displayPhone(r.phone),
      r.attendeeType,
      r.status,
      String(r.amountPaidKobo / 100),
      r.paymentMethod === "cash" ? "Cash" : r.paymentMethod === "bank_transfer" ? "Bank transfer" : "",
      r.checkedInAt ? formatDateTime(r.checkedInAt) : "",
      formatDateTime(r.createdAt),
    ]
      .map(csvCell)
      .join(","),
  );
  const date = new Date().toISOString().slice(0, 10);

  return new Response([header.map(csvCell).join(","), ...lines].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="convention-attendees-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

function csvCell(value: string) {
  // Stop spreadsheet apps from running cell contents as formulas.
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}
