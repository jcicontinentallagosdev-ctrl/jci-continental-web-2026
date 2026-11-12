import { Marquee } from "./_components/marquee";
import { ScrollReveal } from "./_components/motion";
import { registrationStatus } from "./_lib/availability";
import { convention } from "./_lib/config";
import { formatNaira, formatShortDate } from "./_lib/format";
import { guestPriceKobo } from "./_lib/pricing";
import { About, Highlights, Investiture, Programme, Speakers } from "./_sections/about";
import { DressCode } from "./_sections/dress-code";
import { Closing, Faq } from "./_sections/faq";
import { Gallery } from "./_sections/gallery";
import { Hero } from "./_sections/hero";
import { Register } from "./_sections/register";
import { Sponsors } from "./_sections/sponsors";

// Registration opens and closes by the clock, so render on every request.
export const dynamic = "force-dynamic";

export default async function ConventionPage() {
  const { open, soldOut } = await registrationStatus();
  const guestPrice = formatNaira(guestPriceKobo());
  const year = new Date(convention.startsAt).getFullYear();

  return (
    <>
      <Hero open={open && !soldOut} guestPrice={guestPrice} />
      <Marquee
        className="bg-(--cv-brand) text-(--cv-ink)"
        items={[
          `${formatShortDate(convention.startsAt)} ${year}`,
          convention.venue ? `${convention.venue.name}, ${convention.venue.address}` : "Lagos",
          convention.headline.join(" "),
          convention.theme,
          "Members attend free",
          `Guests ${guestPrice}`,
        ]}
      />
      <About />
      <Highlights />
      <Investiture />
      <Programme />
      <Speakers />
      <Gallery open={open && !soldOut} />
      <Register open={open} soldOut={soldOut} guestPrice={guestPrice} />
      <DressCode />
      <Sponsors />
      <Faq guestPrice={guestPrice} />
      <Closing open={open && !soldOut} />
      <ScrollReveal />
    </>
  );
}
