import { findReceiptFile } from "../../../_lib/registrations";
import { isTreasurer } from "../../../_lib/staff";

const EXTENSIONS = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" } as const;

/** A guest's transfer receipt, for the treasurer only. Opens in the browser; never cached. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isTreasurer())) return new Response("Unlock the payments desk first", { status: 401 });

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response("Not found", { status: 404 });
  const receipt = await findReceiptFile(id);
  if (!receipt) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(receipt.file), {
    headers: {
      // The type was checked from the file's own bytes on upload, so it's always one of these four.
      "Content-Type": receipt.contentType,
      "Content-Disposition": `inline; filename="transfer-receipt.${EXTENSIONS[receipt.contentType]}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
