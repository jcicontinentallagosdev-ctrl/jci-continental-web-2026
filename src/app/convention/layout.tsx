import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import type { ReactNode } from "react";
import { ConventionHeader } from "./_components/convention-header";
import { convention } from "./_lib/config";
import "./convention.css";

// Heavy display face for the convention's all-caps headlines. Scoped to /convention only.
const display = Urbanist({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-cv-display" });

export const metadata: Metadata = {
  title: `${convention.shortName} · JCI Continental Lagos`,
  description: convention.description,
};

export default function ConventionLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`cv-scope ${display.variable} bg-(--cv-paper) font-inter text-base text-(--cv-text)`}>
      <ConventionHeader />
      {/* Clear the fixed convention header (matches header h-[80px] / md:h-[110px]) */}
      <div className="pt-[80px] md:pt-[110px]">{children}</div>
    </div>
  );
}
