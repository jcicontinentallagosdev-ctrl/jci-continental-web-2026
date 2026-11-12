import { ticketQrPng } from "../../../_lib/qr";
import { findRegistrationByToken } from "../../../_lib/registrations";

/** The QR image used in the ticket email and the "Save QR code" button. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const registration = await findRegistrationByToken(token);
  if (!registration || registration.status !== "confirmed") {
    return new Response("Ticket not found", { status: 404 });
  }
  const png = await ticketQrPng(token);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "private, max-age=86400",
      "Content-Disposition": `inline; filename="${registration.ticketCode}-ticket.png"`,
    },
  });
}
