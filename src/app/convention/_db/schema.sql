-- JCI Continental Lagos: 2026 Convention and Investiture (Beacon in Bloom) registration
-- Run once in the Supabase SQL editor (or any Postgres 13+). Safe to re-run.

-- Members who can register free when is_financial is true. Import the member list here
-- (Supabase: Table editor → Insert → Import CSV). Email is matched without regard to case or spaces.
create table if not exists convention_members (
  id bigint generated always as identity primary key,
  full_name text,
  email text not null,
  phone text,
  -- Only financial members get a free ticket; non-financial rows stay on the list for records.
  is_financial boolean not null default false,
  created_at timestamptz not null default now()
);
-- Safe to re-run if the table already existed without this column.
alter table convention_members add column if not exists is_financial boolean not null default false;
create index if not exists convention_members_email_idx on convention_members (lower(trim(email)));
create index if not exists convention_members_financial_email_idx
  on convention_members (lower(trim(email))) where is_financial;

-- One row per attendee. Emails are stored lowercase, so one email = one ticket.
create table if not exists convention_registrations (
  id uuid primary key default gen_random_uuid(),
  ticket_code text not null unique,          -- short code staff can type, e.g. CL-7KQ9PX
  ticket_token text not null unique,         -- long secret that goes in the QR code
  full_name text not null,
  email text not null,
  phone text not null,
  attendee_type text not null check (attendee_type in ('member', 'guest')),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'confirmed', 'cancelled')),
  amount_due_kobo integer not null default 0,
  amount_paid_kobo integer not null default 0,
  confirmed_at timestamptz,
  ticket_sent_at timestamptz,
  checked_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists convention_registrations_email_key on convention_registrations (lower(email));

-- Added for bank transfers: when the guest's transfer details were last emailed (for "Resend").
alter table convention_registrations add column if not exists instructions_sent_at timestamptz;

-- Added for payments taken outside the site: how each guest paid, so the treasurer can match the
-- bank account (cash never reaches it). Null for members, who don't pay.
alter table convention_registrations add column if not exists payment_method text
  check (payment_method in ('bank_transfer', 'cash'));

-- Guests pay by bank transfer and upload the receipt on their ticket page. Staff compare it with the
-- chapter's account, then confirm it (the ticket is emailed) or send it back with a reason.
-- Photos are shrunk in the browser first, so most files are well under 1 MB. Only staff can open them.
-- Receipts hold personal and bank details: delete them once the convention's accounts are closed:
--   delete from convention_transfer_receipts;
create table if not exists convention_transfer_receipts (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references convention_registrations (id) on delete cascade,
  file bytea not null,
  content_type text not null
    check (content_type in ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')),
  file_name text,
  size_bytes integer not null,
  -- submitted: waiting for staff. replaced: the guest sent a newer one. accepted / rejected: reviewed.
  status text not null default 'submitted'
    check (status in ('submitted', 'replaced', 'accepted', 'rejected')),
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists convention_transfer_receipts_registration_idx
  on convention_transfer_receipts (registration_id, created_at desc);
-- Staff payments desk filters by status a lot; keep those lookups off a full table scan.
create index if not exists convention_transfer_receipts_submitted_idx
  on convention_transfer_receipts (created_at)
  where status = 'submitted';
create index if not exists convention_registrations_pending_guest_idx
  on convention_registrations (created_at)
  where status = 'pending_payment' and attendee_type = 'guest';

-- Lock the tables from Supabase's public API. The site connects server-side with the database URL,
-- which is not affected by these rules.
alter table convention_members enable row level security;
alter table convention_registrations enable row level security;
alter table convention_transfer_receipts enable row level security;

-- Sponsorship enquiries from the "Become a sponsor" form. The committee is also emailed each one.
create table if not exists convention_sponsor_enquiries (
  id uuid primary key default gen_random_uuid(),
  organisation text not null,
  contact_name text not null,
  role text,
  email text not null,
  phone text not null,
  interests text[] not null default '{}',
  budget text,
  message text,
  created_at timestamptz not null default now()
);
alter table convention_sponsor_enquiries enable row level security;
