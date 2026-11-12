"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveals every [data-reveal] element on the page once, as it scrolls into view (styles in convention.css).
 * Whatever is already on screen when the page loads stays put. Without JavaScript, or with
 * "reduce motion" on, nothing is ever hidden. Mount once per page, after the content.
 */
export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".cv-scope");
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const targets = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    for (const el of targets) {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) el.dataset.shown = "instant";
    }
    root.classList.add("cv-motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "animate";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    for (const el of targets) if (!el.dataset.shown) observer.observe(el);

    return () => {
      observer.disconnect();
      root.classList.remove("cv-motion");
    };
  }, []);

  return null;
}

/**
 * A stat like "150+" that counts up from zero the first time it scrolls into view.
 * Screen readers always get the real value; on screen it starts as the real value too, until JavaScript runs.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const parts = /^(\D*)(\d[\d,]*)(.*)$/.exec(value);
    if (!el || !parts || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    // Already on screen: leave the real number rather than flash it back to zero.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const [, prefix, digits, suffix] = parts;
    const target = Number(digits.replace(/,/g, ""));
    const format = (n: number) => `${prefix}${n.toLocaleString("en-NG")}${suffix}`;

    // Wait at zero below the fold, then count up over 1.2s, easing out as it lands.
    let frame = requestAnimationFrame(() => setShown(format(0)));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1200, 1);
          setShown(t < 1 ? format(Math.round(target * (1 - (1 - t) ** 3))) : value);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      setShown(value);
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
