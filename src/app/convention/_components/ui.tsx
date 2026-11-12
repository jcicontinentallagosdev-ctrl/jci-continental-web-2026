import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { AlertIcon, CheckIcon, InfoIcon } from "./icons";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* Buttons ------------------------------------------------------------------- */

type ButtonVariant = "primary" | "accent" | "accentOnInk" | "secondary" | "ghost" | "danger";

// Outlined blocks that lift on hover and press in when clicked. In Design A they push into a hard
// offset shadow; the shape, outline, shadows and nudge all come from tokens in convention.css.
const pressable =
  "border-2 hover:[translate:var(--cv-lift)] active:[translate:var(--cv-push)] motion-reduce:translate-none";
const outlined = "border-(--cv-control-line) shadow-(--cv-shadow) hover:shadow-(--cv-shadow-hover) active:shadow-(--cv-shadow-press)";
const raised = "shadow-(--cv-shadow-primary) hover:shadow-(--cv-shadow-primary-hover) active:shadow-(--cv-shadow-primary-press)";

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 rounded-(--cv-radius-control) font-sans font-bold transition-[translate,box-shadow,background-color] duration-150 ease-(--cv-ease-out) outline-none focus-visible:ring-[3px] focus-visible:ring-(--cv-brand) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-none [&_svg]:shrink-0 cursor-pointer";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: cx("border-(--cv-primary) bg-(--cv-primary) text-(--cv-on-primary)", pressable, raised),
  accent: cx("bg-(--cv-sun) text-(--cv-ink)", pressable, outlined),
  // On dark bands the ink shadow would vanish, so it takes the primary (blue) shadow.
  accentOnInk: cx("border-(--cv-sun) bg-(--cv-sun) text-(--cv-ink)", pressable, raised),
  secondary: cx("bg-white text-(--cv-ink)", pressable, outlined),
  ghost: "text-(--cv-ink) underline decoration-2 underline-offset-4 hover:decoration-(--cv-brand)",
  danger: "border-2 border-(--cv-danger) bg-white text-(--cv-danger) hover:bg-(--cv-danger-bg)",
};

const buttonSizes = {
  lg: "h-[52px] px-6 text-base",
  md: "h-11 px-4 text-[15px]",
};

/** For an arrow inside a button: it nudges the way it points when the button is hovered. */
export const nudge = {
  forward: "transition-[translate] duration-200 ease-(--cv-ease-out) group-hover/btn:translate-x-1 motion-reduce:translate-none",
  back: "transition-[translate] duration-200 ease-(--cv-ease-out) group-hover/btn:-translate-x-1 motion-reduce:translate-none",
};

/** Order of an element in a staggered entrance or reveal (read by convention.css as --i). */
export function stagger(i: number) {
  return { "--i": i } as CSSProperties;
}

export function buttonClasses(variant: ButtonVariant = "primary", size: keyof typeof buttonSizes = "lg", className?: string) {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size], variant === "ghost" && "px-1", className);
}

/* Small pieces -------------------------------------------------------------- */

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-(--cv-radius-control) border-2 border-(--cv-control-line) bg-(--cv-sun) px-3 py-1 font-sans text-xs font-bold tracking-[0.08em] text-(--cv-ink) uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

const calloutTones = {
  info: { box: "bg-(--cv-surface) border-(--cv-brand)", icon: "text-(--cv-brand-strong)", Icon: InfoIcon },
  success: { box: "bg-(--cv-success-bg) border-(--cv-success)", icon: "text-(--cv-success)", Icon: CheckIcon },
  warning: { box: "bg-(--cv-warning-bg) border-(--cv-warning)", icon: "text-(--cv-warning)", Icon: AlertIcon },
  danger: { box: "bg-(--cv-danger-bg) border-(--cv-danger)", icon: "text-(--cv-danger)", Icon: AlertIcon },
};

export function Callout({
  tone = "info",
  title,
  children,
  className,
  ...props
}: { tone?: keyof typeof calloutTones; title: ReactNode; children?: ReactNode } & Omit<ComponentProps<"div">, "title">) {
  const { box, icon, Icon } = calloutTones[tone];
  return (
    <div className={cx("flex gap-3 rounded-(--cv-radius-field) border-l-4 p-4 text-(--cv-ink) outline-none", box, className)} {...props}>
      <Icon className={cx("mt-0.5", icon)} />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-sans font-bold">{title}</p>
        {children && <div className="space-y-3 text-[15px] leading-6 text-(--cv-text)">{children}</div>}
      </div>
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("rounded-(--cv-radius) border-2 border-(--cv-line) bg-white shadow-(--cv-shadow-lg)", className)} {...props} />;
}

/** Page wrapper with the main site's container widths and gutters. */
export function PageShell({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 py-10 md:px-8 lg:py-16", className)} {...props} />;
}

/** Full-bleed band with the site's container inside. */
export function Band({ className, inner, children, ...props }: ComponentProps<"section"> & { inner?: string }) {
  return (
    <section className={cx("w-full", className)} {...props}>
      <div className={cx("mx-auto w-full max-w-7xl px-4 md:px-8", inner)}>{children}</div>
    </section>
  );
}

/* Form fields --------------------------------------------------------------- */

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  name: string;
  hint?: ReactNode;
  error?: string;
};

export function TextField({ label, hint, error, id, name, className, ...input }: TextFieldProps) {
  const fieldId = id ?? `cv-${name}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  return (
    <div className={cx("space-y-1.5", className)}>
      <label htmlFor={fieldId} className="block font-sans text-[15px] font-bold text-(--cv-ink)">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-(--cv-muted)">
          {hint}
        </p>
      )}
      <input
        id={fieldId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={cx(hintId, errorId) || undefined}
        className={cx(
          "block h-12 w-full rounded-(--cv-radius-field) border-2 bg-white px-4 text-base text-(--cv-ink) outline-none transition-shadow placeholder:text-(--cv-muted)/70",
          "focus:border-(--cv-control-line) focus:shadow-(--cv-shadow-focus)",
          error ? "border-(--cv-danger)" : "border-(--cv-input-line)",
        )}
        {...input}
      />
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-(--cv-danger)">
          <AlertIcon width={16} height={16} className="mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
}
