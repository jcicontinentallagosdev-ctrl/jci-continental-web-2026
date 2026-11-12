import Image from "next/image";
import { CalendarIcon, PinIcon } from "../_components/icons";
import { RegistrationClosed } from "../_components/registration-closed";
import { Band, buttonClasses, Card, stagger } from "../_components/ui";
import { convention } from "../_lib/config";
import { formatDate, formatShortDate, formatTime, googleCalendarUrl } from "../_lib/format";
import { RegistrationForm } from "../registration-form";
import { ResendTicketForm } from "../resend-ticket-form";

type Props = { open: boolean; soldOut: boolean; guestPrice: string };

export function Register({ open, soldOut, guestPrice }: Props) {
  const tickets = [
    { stub: "Member", stubColour: "bg-(--cv-sky)", price: "Free", detail: "Use the email on your JCI Continental Lagos membership record." },
    { stub: "Guest", stubColour: "bg-(--cv-coral)", price: guestPrice, detail: "Pay by bank transfer, then send us your receipt. Your ticket follows once it's confirmed." },
  ];

  return (
    <Band id="register" aria-labelledby="cv-register-title" className="border-y-2 border-(--cv-ink) bg-(--cv-surface) py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
        <div className="space-y-6">
          <h2 id="cv-register-title" data-reveal className="cv-display text-[clamp(2.5rem,7vw,5rem)] text-(--cv-ink)">
            Be part of the experience
          </h2>
          <dl data-reveal style={stagger(1)} className="space-y-3">
            <div className="flex gap-3">
              <dt>
                <CalendarIcon className="mt-0.5 text-(--cv-brand-strong)" />
                <span className="sr-only">Date</span>
              </dt>
              <dd className="font-sans font-bold text-(--cv-ink)">{formatDate(convention.startsAt)}</dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <PinIcon className="mt-0.5 text-(--cv-brand-strong)" />
                <span className="sr-only">Venue</span>
              </dt>
              <dd className="font-sans font-bold text-(--cv-ink)">
                {convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "Lagos · venue to be announced"}
                {convention.venue?.mapUrl && (
                  <>
                    {" "}
                    <a href={convention.venue.mapUrl} target="_blank" rel="noreferrer" className="font-medium whitespace-nowrap text-(--cv-brand-strong) underline underline-offset-2">
                      Get directions
                    </a>
                  </>
                )}
              </dd>
            </div>
          </dl>
          <p data-reveal style={stagger(2)} className="max-w-md text-lg leading-8">
            Your seat at this celebration awaits. Registering takes about a minute, and your ticket arrives by email with a
            QR code for the door.
          </p>

          {/* On phones the radio cards in the form already show both prices, so these stay desktop-only. */}
          <ul className="hidden space-y-5 lg:block">
            {tickets.map((ticket, i) => (
              <li key={ticket.stub} data-reveal style={stagger(i + 3)} className="flex border-2 border-(--cv-ink) bg-white shadow-(--cv-shadow-lg)">
                <span
                  className={`cv-display flex w-14 shrink-0 items-center justify-center border-r-2 border-dashed border-(--cv-ink) text-xl text-(--cv-ink) [writing-mode:vertical-rl] rotate-180 ${ticket.stubColour}`}
                >
                  {ticket.stub}
                </span>
                <div className="space-y-1 p-5">
                  <p className="cv-display text-4xl text-(--cv-ink)">{ticket.price}</p>
                  <p className="text-(--cv-muted)">{ticket.detail}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>

        <div data-reveal style={stagger(1)} className="space-y-6 lg:row-span-2">
          <Card className="p-5 sm:p-8">
            {open && !soldOut ? (
              <RegistrationForm
                guestPriceLabel={guestPrice}
                eventDateLabel={formatDate(convention.startsAt)}
                calendarUrl={googleCalendarUrl()}
                contactEmail={convention.contact.email}
              />
            ) : (
              <RegistrationClosed soldOut={soldOut} />
            )}
          </Card>
          <ResendTicketForm />
        </div>

        {/* Below the form on phones, under the ticket cards on desktop. */}
        <div className="space-y-4 lg:col-start-1 lg:row-start-2">
          <p className="font-sans font-bold text-(--cv-ink)">
            {open
              ? `Registration closes ${formatShortDate(convention.registrationClosesAt)} at ${formatTime(convention.registrationClosesAt)}.`
              : "Registration has closed."}
          </p>
          <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className={buttonClasses("ghost", "md", "-ml-1")}>
            <CalendarIcon />
            Add to Google Calendar
          </a>
          <Image
            src="/convention/art/ticket-phone.webp"
            alt=""
            width={640}
            height={640}
            sizes="320px"
            data-reveal="bloom"
            style={stagger(2)}
            className="mt-4 hidden h-auto w-full max-w-[320px] lg:block"
          />
        </div>
      </div>
    </Band>
  );
}
