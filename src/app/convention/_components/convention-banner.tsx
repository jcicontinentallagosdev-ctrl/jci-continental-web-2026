"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { convention } from "../_lib/config";
import { formatShortDate } from "../_lib/format";
import "../convention.css";

/**
 * Site-wide announcement bar. Render it once in the root layout, above the fixed header.
 * It sets --convention-banner-h so the header and page content can make room for it;
 * deleting the <ConventionBanner /> line after the event puts everything back automatically.
 * It hides itself on /convention pages, which have their own header.
 */
export function ConventionBanner() {
  const pathname = usePathname();
  if (pathname?.startsWith("/convention")) return null;

  return (
    <>
      <style>{":root{--convention-banner-h:44px}"}</style>
      <Link
        href="/convention#register"
        className="group fixed inset-x-0 top-0 z-[60] flex h-(--convention-banner-h) items-center justify-center gap-x-2 overflow-hidden bg-(--cv-ink) px-4 font-sans text-sm whitespace-nowrap text-white outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-on-ink-accent) focus-visible:ring-inset sm:text-[15px]"
      >
        <span className="font-semibold">
          {/* The full name is too long for a phone, next to the date and the call to action. */}
          <span className="sm:hidden">{new Date(convention.startsAt).getFullYear()} Convention</span>
          <span className="hidden sm:inline">{convention.shortName}</span>
        </span>
        <span aria-hidden="true" className="text-white/60">
          ·
        </span>
        <span>{formatShortDate(convention.startsAt)}</span>
        <span className="hidden md:inline">
          <span aria-hidden="true" className="text-white/60">
            ·{" "}
          </span>
          Members attend free
        </span>
        <span className="ml-1 font-semibold text-(--cv-on-ink-accent) underline decoration-2 underline-offset-4 group-hover:text-white">
          Register now{" "}
          <span aria-hidden="true" className="inline-block transition-[translate] duration-200 group-hover:translate-x-1 motion-reduce:translate-none">
            →
          </span>
        </span>
      </Link>
    </>
  );
}
