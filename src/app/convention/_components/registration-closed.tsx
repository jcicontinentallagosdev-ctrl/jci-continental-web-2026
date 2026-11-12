import { convention } from "../_lib/config";
import { Callout } from "./ui";

/** Shown in place of the registration form once it closes or every seat is taken. */
export function RegistrationClosed({ soldOut }: { soldOut: boolean }) {
  return (
    <div className="space-y-4">
      <h3 className="cv-display text-3xl text-(--cv-ink)">{soldOut ? "We're fully booked" : "Registration has closed"}</h3>
      <p className="leading-7">
        {soldOut
          ? "Every seat has been taken. Thank you for the overwhelming response!"
          : "Online registration for this year's convention is now closed."}{" "}
        Already registered? Your ticket is in your email, and you can resend it below.
      </p>
      <Callout tone="info" title="Need help?">
        <p>
          Write to{" "}
          <a className="font-semibold underline" href={`mailto:${convention.contact.email}`}>
            {convention.contact.email}
          </a>
          {soldOut ? " to join the waiting list." : "."}
        </p>
      </Callout>
    </div>
  );
}
