"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileIcon, UploadIcon } from "../../_components/icons";
import { SubmitButton } from "../../_components/submit-button";
import { Callout, cx } from "../../_components/ui";
import { RECEIPT_ACCEPT, RECEIPT_ERRORS, RECEIPT_MAX_MB } from "../../_lib/bank";

const MAX_BYTES = RECEIPT_MAX_MB * 1024 * 1024;
const ACCEPTED = RECEIPT_ACCEPT.split(",");

/**
 * Pick a receipt, see it, send it. Photos are shrunk to a readable size before upload, so it's quick
 * on mobile data. Works without JavaScript too: the form then posts straight to the endpoint.
 */
export function ReceiptForm({ token, submitLabel, initialError }: { token: string; submitLabel: string; initialError?: string }) {
  const router = useRouter();
  const errorRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [sending, setSending] = useState(false);
  const [dragging, setDragging] = useState(false);
  const action = `/convention/ticket/${token}/receipt`;

  useEffect(() => {
    if (!file?.type.startsWith("image/")) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  function choose(next: File | undefined) {
    if (!next) return;
    if (next.type && !ACCEPTED.includes(next.type)) {
      setFile(null);
      return setError(RECEIPT_ERRORS.wrong_type);
    }
    setError(null);
    setFile(next);
  }

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return setError(RECEIPT_ERRORS.missing);
    setSending(true);
    setError(null);
    try {
      const upload = await shrink(file);
      if (upload.size > MAX_BYTES) throw new UploadError(RECEIPT_ERRORS.too_big);
      const body = new FormData();
      body.set("receipt", upload, file.name);
      const response = await fetch(action, { method: "POST", body, headers: { Accept: "application/json" } });
      const result = (await response.json().catch(() => null)) as { ok?: true; error?: string } | null;
      if (!response.ok || !result?.ok) throw new UploadError(result?.error ?? RECEIPT_ERRORS.failed);
      router.replace(`/convention/ticket/${token}?sent=1`, { scroll: true });
      router.refresh();
    } catch (caught) {
      setSending(false);
      setError(
        caught instanceof UploadError
          ? caught.message
          : navigator.onLine === false
            ? "You seem to be offline. Your file is still selected, so try again once you're connected."
            : RECEIPT_ERRORS.failed,
      );
    }
  }

  return (
    <form action={action} method="post" encType="multipart/form-data" onSubmit={send} noValidate className="space-y-4">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          choose(event.dataTransfer.files[0]);
        }}
        className={cx(
          "flex cursor-pointer flex-col items-center gap-3 rounded-(--cv-radius-field) border-2 border-dashed p-5 text-center transition-colors",
          "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-(--cv-brand)",
          dragging ? "border-(--cv-brand-strong) bg-(--cv-surface)" : error ? "border-(--cv-danger) bg-white" : "border-(--cv-input-line) bg-white hover:bg-(--cv-surface)",
        )}
      >
        <input
          type="file"
          name="receipt"
          accept={RECEIPT_ACCEPT}
          aria-describedby="cv-receipt-hint"
          aria-invalid={error ? true : undefined}
          onChange={(event) => choose(event.target.files?.[0])}
          className="sr-only"
        />
        {file ? (
          <>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element -- a local preview of the chosen file
              <img src={preview} alt="Your chosen receipt" className="max-h-56 w-auto border-2 border-(--cv-ink) object-contain" />
            ) : (
              <span className="flex size-14 items-center justify-center bg-(--cv-surface) text-(--cv-brand-strong)">
                <FileIcon width={28} height={28} />
              </span>
            )}
            <span className="max-w-full font-sans font-bold break-all text-(--cv-ink)">{file.name}</span>
            <span className="text-sm font-semibold text-(--cv-brand-strong) underline underline-offset-2">Choose a different file</span>
          </>
        ) : (
          <>
            <span className="flex size-14 items-center justify-center rounded-full bg-(--cv-sun) text-(--cv-ink)">
              <UploadIcon width={26} height={26} />
            </span>
            <span className="font-sans text-lg font-bold text-(--cv-ink)">Choose your receipt</span>
          </>
        )}
        <span id="cv-receipt-hint" className="text-sm text-(--cv-muted)">
          A screenshot or the PDF from your bank app, up to {RECEIPT_MAX_MB} MB.
        </span>
      </label>

      <div ref={errorRef} tabIndex={-1} className="outline-none empty:hidden">
        {error && (
          <Callout tone="danger" title="That didn't go through" role="alert">
            <p>{error}</p>
          </Callout>
        )}
      </div>

      {/* CTA stays off until a receipt file is chosen — avoids "I've paid" with no proof. */}
      <SubmitButton
        pending={sending}
        disabled={!file}
        pendingLabel="Sending your receipt…"
        className="w-full"
      >
        {submitLabel}
      </SubmitButton>
      {!file && (
        <p className="text-center text-sm text-(--cv-muted)">Choose a receipt screenshot or PDF before you continue.</p>
      )}
    </form>
  );
}

class UploadError extends Error {}

/** Re-encodes large photos as JPEG, at most 1800 px on the long side: still sharp enough to read every digit. */
async function shrink(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1_000_000) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.fillStyle = "#fff"; // transparent screenshots would otherwise turn black
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file; // the browser can't decode it here; the server still checks the type
  }
}
