import { RECEIPT_ERRORS, type ReceiptError } from "../../../_lib/bank";
import { addReceipt, findRegistrationByToken } from "../../../_lib/registrations";
import { MAX_RECEIPT_BYTES, sniffReceiptType } from "../../../_lib/transfers";

type Props = { params: Promise<{ token: string }> };

/**
 * A guest sends their transfer receipt. The page posts here with fetch and gets JSON back; without
 * JavaScript the plain form posts here and is redirected back to the page with the result.
 */
export async function POST(request: Request, { params }: Props) {
  const { token } = await params;
  const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;
  const page = `/convention/ticket/${token}`;

  const reply = (error?: ReceiptError) => {
    if (wantsJson) {
      return Response.json(error ? { error: RECEIPT_ERRORS[error] } : { ok: true }, { status: error ? 400 : 200 });
    }
    return Response.redirect(new URL(error ? `${page}?receipt=${error}` : `${page}?sent=1`, request.url), 303);
  };

  // Turn away oversized uploads before reading them.
  if (Number(request.headers.get("content-length") ?? 0) > MAX_RECEIPT_BYTES + 64 * 1024) return reply("too_big");

  try {
    const registration = await findRegistrationByToken(token);
    if (!registration || registration.status === "cancelled") return new Response("Not found", { status: 404 });
    if (registration.status !== "pending_payment" || registration.attendeeType !== "guest") return reply("not_pending");

    const file = (await request.formData()).get("receipt");
    if (!(file instanceof File) || file.size === 0) return reply("missing");
    if (file.size > MAX_RECEIPT_BYTES) return reply("too_big");

    const bytes = Buffer.from(await file.arrayBuffer());
    const contentType = sniffReceiptType(bytes);
    if (!contentType) return reply("wrong_type");

    const fileName = file.name.replace(/[^\p{L}\p{N} ._()-]/gu, "").slice(0, 120) || null;
    const saved = await addReceipt(registration.id, { bytes, contentType, fileName });
    if ("error" in saved) return reply(saved.error);
    return reply();
  } catch (error) {
    console.error("[convention] Receipt upload failed", error);
    return reply("failed");
  }
}
