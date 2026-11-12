"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { cx } from "./ui";

/** Puts a value on the clipboard, then says "Copied" for a moment. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // The clipboard API needs https; on a plain-http preview, fall back to a hidden text box.
      const box = document.createElement("textarea");
      box.value = value;
      box.setAttribute("readonly", "");
      box.style.position = "fixed";
      box.style.opacity = "0";
      document.body.append(box);
      box.select();
      document.execCommand("copy");
      box.remove();
    }
    setCopied(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={cx(
          "inline-flex h-11 min-w-[92px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-(--cv-radius-control) border-2 px-3 font-sans text-sm font-bold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-(--cv-brand)",
          copied
            ? "border-(--cv-success) bg-(--cv-success-bg) text-(--cv-success)"
            : "border-(--cv-control-line) bg-white text-(--cv-ink) hover:bg-(--cv-surface)",
          className,
        )}
      >
        {copied ? <CheckIcon width={16} height={16} strokeWidth={2.5} /> : <CopyIcon width={16} height={16} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </>
  );
}
