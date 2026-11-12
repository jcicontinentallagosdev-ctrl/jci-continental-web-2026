/**
 * Everything about the event lives here. Update this file, redeploy, done.
 * Items marked TODO are placeholders waiting on the convention committee.
 */

// Dress-code shades, sampled from the committee's "Beacon in Bloom" dress code slides.
const shade = {
  blush: { name: "Blush pink", hex: "#e8bfc6" },
  lavender: { name: "Lavender", hex: "#d9c5e8" },
  sage: { name: "Sage", hex: "#c8ddd0" },
  powderBlue: { name: "Powder blue", hex: "#d6e5f0" },
  butter: { name: "Butter yellow", hex: "#f1dfa0" },
  peach: { name: "Peach", hex: "#ebc7a9" },
  tan: { name: "Tan", hex: "#c9b49a" },
  champagne: { name: "Champagne", hex: "#f0e9d9" },
  black: { name: "Black", hex: "#1b1b1b" },
};

export const convention = {
  name: "JCI Continental Lagos 2026 Annual Convention, Awards & Presidential Investiture",
  shortName: "Convention & Investiture 2026",
  description:
    "Beacon in Bloom: the JCI Continental Lagos 2026 Annual Convention, Awards & Presidential Investiture. Theme: A Generation in Motion.",
  theme: "A Generation in Motion",

  // Hero headline: "Beacon", then "in Bloom" with "in" set in italics, as on the event flyer.
  headline: ["Beacon", "in Bloom"] as [string, string],
  // Copy from the committee's website brief.
  about:
    "An evening dedicated to leadership, excellence, service and new possibilities. From celebrating remarkable achievements to recognising outstanding changemakers, we bring together young leaders, professionals, entrepreneurs and partners for an unforgettable experience.",
  tagline: "One year. A generation of impact. A new chapter of leadership.",

  // Sunday 29 November 2026. TODO: confirm the times. Always include the +01:00 Lagos offset.
  startsAt: "2026-11-29T10:00:00+01:00",
  endsAt: "2026-11-29T17:00:00+01:00",

  // Set to null to show "Venue to be announced" instead.
  venue: {
    name: "Watercress Hotel",
    address: "Ikeja, Lagos",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Watercress+Hotel+Ikeja+Lagos",
  } as null | { name: string; address: string; mapUrl?: string },

  // TODO: confirm deadline. After this moment the form closes on its own.
  registrationClosesAt: "2026-11-28T23:59:00+01:00",

  // Maximum confirmed tickets. null = no limit.
  capacity: null as number | null,

  // Ticket price for guests (non-members), in naira. Members always attend free.
  guestPriceNaira: 15_000,

  // Guests pay by bank transfer to this account, then upload the receipt on their ticket page.
  // Staff confirm it on the check-in desk's Payments page, and the ticket is emailed.
  // The chapter's account, from the committee (10 Nov 2026). Guests see these exactly as written,
  // so keep the account name as the bank shows it when they check the number.
  bankTransfer: {
    bankName: "Access Bank",
    accountName: "Junior Chamber International Continental Lagos",
    accountNumber: "1870825546",
    // Shown once a guest sends their receipt. TODO: confirm the treasurer can keep this promise.
    reviewTime: "within 24 hours",
  },

  // Where the logo and "Back to the website" in the convention header go.
  mainSiteHref: "/",

  contact: {
    email: "jcicontinentallagos@mail.jci.ng",
    phone: null as string | null, // TODO: add a WhatsApp/phone number for the help desk
    // WhatsApp number for payment help, in international form without "+", e.g. "2348031234567".
    // While null, help links on the payment page and emails go to the email address instead.
    whatsapp: "2347087877392" as string | null,
  },

  // From jcicontinentallagos.org. The row fits any number of stats.
  stats: [
    { value: "150+", label: "Young leaders" },
    { value: "30+", label: "Impact projects" },
    { value: "10+", label: "Strategic partners" },
  ],

  // "Experience the evening": the five moments, in running order.
  highlights: [
    { title: "The Red Carpet", art: "/convention/art/spot-red-carpet.webp", body: "Arrive, connect and capture the moment." },
    { title: "The Keynote", art: "/convention/art/spot-learn.webp", body: "Ideas and perspectives shaping a generation in motion." },
    { title: "Awards & Recognition", art: "/convention/art/spot-celebrate.webp", body: "Celebrating outstanding members, projects and partners." },
    { title: "Presidential Investiture", art: "/convention/art/spot-investiture.webp", body: "Witness the formal transition of leadership to the 2027 President." },
    { title: "Dinner & Networking", art: "/convention/art/spot-connect.webp", body: "An evening of good company, entertainment and meaningful connections." },
  ],

  // The 2026 BEACON year hands over to the chapter's 6th President.
  investiture: {
    outgoing: { name: "JCIN Amb. Oluwatosin Lemo", role: "2026 President", year: 2026 },
    incoming: { name: "JCIN Amb. Juliet Banto", role: "2027 President", year: 2027 },
  },

  // Add the running order when it's ready; the Programme section appears automatically.
  // Example: { time: "10:00 AM", title: "Arrival & registration", detail: "Have your QR ticket ready" }
  programme: [] as { time: string; title: string; detail?: string }[],

  // Add speakers when confirmed; the Speakers section appears automatically.
  // photo: a path under /public (e.g. "/convention/speakers/ada.jpg"), square, at least 400px.
  speakers: [] as { name: string; role: string; photo?: string }[],

  // Photos from past conventions, each tagged with its year. Newest first: the first is shown large, and a
  // fifth tile, for this year's convention, completes the grid. Files live in public/convention/gallery/.
  // Refined to 4K (3840 px) from the committee's photos: de-noised and sharpened, faces untouched.
  // Years checked by the convention team, 8 Nov 2026.
  // focus: which part of the photo to keep when it's cropped to fit its tile (CSS object-position).
  gallery: [
    {
      src: "/convention/gallery/investiture-handover-gold.webp",
      year: 2025,
      alt: "The outgoing president in a gold gown, wearing the chain of office, holds the gavel as a man in a dark suit raises his hand to take the oath.",
      width: 3773,
      height: 3840,
      focus: "50% 25%",
    },
    {
      src: "/convention/gallery/investiture-oath-green.webp",
      year: 2024,
      alt: "A president in an emerald gown and chain of office holds a gavel while a woman in black lace raises her hand to take the oath.",
      width: 3840,
      height: 3487,
      focus: "50% 20%",
    },
    {
      src: "/convention/gallery/investiture-oath-stage.webp",
      year: 2023,
      alt: "On a navy JCI stage, a woman in a beaded black gown raises her hand as the president, in chain of office and bow tie, reads the oath.",
      width: 2559,
      height: 3840,
      focus: "50% 35%",
    },
    {
      src: "/convention/gallery/investiture-oath-reading.webp",
      year: 2022,
      alt: "A member reads the oath from a booklet as a man in a navy suit raises his right hand, in front of a projected presidential portrait.",
      width: 3514,
      height: 3840,
      focus: "50% 30%",
    },
  ] as { src: string; year: number; alt: string; width: number; height: number; focus: string }[],

  // "What to wear", from the committee's dress code slides. Photos live in public/convention/dress-code/:
  // cropped from the slides, with the callout markers removed (Codex job jci-convention-art, refs/approved/dresscode).
  // If the designer has the original photos, drop them in under the same names.
  dressCode: {
    summary: "Garden floral and pastel dresses. Tan and pastel floral suits.",
    rule: "One main colour. One accent. One neutral.",
    palette: [
      { ...shade.blush, role: "Main" },
      { ...shade.lavender, role: "Main" },
      { ...shade.sage, role: "Main" },
      { ...shade.powderBlue, role: "Main" },
      { ...shade.butter, role: "Accent" },
      { ...shade.peach, role: "Accent" },
      { ...shade.tan, role: "Neutral" },
      { ...shade.champagne, role: "Neutral" },
    ],
    looks: [
      {
        name: "Tan & Blush",
        photo: "/convention/dress-code/tan-blush.webp",
        alt: "A man in a tan suit and floral tie walks arm in arm with a woman in a blush floral gown and wide pink hat.",
        colours: [shade.tan, shade.blush, shade.champagne],
        why: "The suit stays calm so the dress can be the star.",
      },
      {
        name: "Rose & Lavender",
        photo: "/convention/dress-code/rose-lavender.webp",
        alt: "A man in a pink suit with a floral tie beside a woman in a pink and lavender floral gown and lavender fascinator.",
        colours: [shade.blush, shade.lavender, shade.champagne],
        why: "A pink suit is bold. Lavender keeps it gentle.",
      },
      {
        name: "Sage & Cream",
        photo: "/convention/dress-code/sage-cream.webp",
        alt: "A man in a sage suit with a peach floral tie beside a woman in a sage floral dress and cream floral hat.",
        colours: [shade.sage, shade.champagne, shade.peach],
        why: "Same colour family, two different shades. Easy and elegant.",
      },
      {
        name: "Black & Blush",
        photo: "/convention/dress-code/black-blush.webp",
        alt: "A man in a black suit and floral tie beside a woman in a blush one-shoulder gown and pink hat.",
        colours: [shade.black, shade.blush, shade.champagne],
        why: "Most of us own a black suit. Add a floral tie and a pastel partner and you're on code.",
      },
    ],
    extras: ["Hat or fascinator", "Floral tie", "Pocket square", "Pearl clutch", "Matching heels", "Gele and fila"],
    tip: "Accessories do the heavy lifting. Pick two.",
  },

  // Sponsors and partners. Logos live in public/convention/sponsors/ (SVG or transparent PNG).
  // "headline" sponsors get a large tile. While this is empty, the section only shows the sponsorship pitch.
  // TODO: add real sponsors once they're confirmed, e.g.
  // { name: "Acme Bank", logo: "/convention/sponsors/acme-bank.svg", url: "https://acme.example", tier: "headline" },
  sponsors: [] as { name: string; logo: string; url?: string; tier: "headline" | "partner" }[],
  sponsorship: {
    pitch: "Put your brand in front of 150+ young leaders across 10+ industries, and back the next generation of Lagos changemakers.",
    // Options in the sponsorship form. TODO: match these to the committee's sponsorship packages.
    interests: [
      "Headline sponsor",
      "Exhibition stand",
      "Session or award sponsor",
      "Branded items & gifts",
      "In-kind support",
      "Something else",
    ],
    budgets: ["Under ₦500,000", "₦500,000 – ₦2 million", "₦2 million – ₦5 million", "Above ₦5 million", "Not sure yet"],
    // Shown after someone sends the form. TODO: confirm the committee can keep this promise.
    responseTime: "within two working days",
    // Who gets each enquiry by email. null = contact.email.
    notifyEmail: null as string | null,
  },
};

export const TIME_ZONE = "Africa/Lagos";
