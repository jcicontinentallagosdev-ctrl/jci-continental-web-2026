import Image from "next/image";
import { convention } from "../_lib/config";
import { ArrowLeftIcon } from "./icons";
import { buttonClasses, nudge } from "./ui";

/**
 * The convention's own header: the same logo pairing as the main site, and a way back to it.
 * Same height and position as the site header it replaces on /convention pages (80px, 110px from md).
 */
export function ConventionHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[80px] border-b-2 border-(--cv-line) bg-(--cv-paper) md:h-[110px]">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a
          href={convention.mainSiteHref}
          className="flex shrink-0 items-center gap-3 outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand) focus-visible:ring-offset-4 md:gap-4"
        >
          <Image
            src="/convention/brand/jci-continental-lagos.png"
            alt="JCI Continental Lagos home"
            width={283}
            height={176}
            priority
            className="h-11 w-auto md:h-16"
          />
          <span aria-hidden="true" className="h-8 w-px bg-(--cv-muted)/40 md:h-10" />
          <Image
            src="/convention/brand/beacon-2026.png"
            alt=""
            width={329}
            height={132}
            priority
            className="h-8 w-auto md:h-12"
          />
        </a>

        <a href={convention.mainSiteHref} className={buttonClasses("secondary", "md", "shrink-0 px-3 sm:px-4")}>
          <ArrowLeftIcon width={18} height={18} className={nudge.back} />
          <span className="hidden sm:inline">Back to the website</span>
          <span className="sm:hidden">Website</span>
        </a>
      </div>
    </header>
  );
}
