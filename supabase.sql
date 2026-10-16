-- Optional collaborative notes for the Guangzhou/Shenzhen trip.
-- Run in Supabase SQL Editor. Then add your friends' real emails at bottom.
-- Public GitHub Pages hosts itinerary; authenticated allowlisted users see shared notes.

create extension if not exists pgcrypto;

create table if not exists public.trip_members (
  email text primary key,
  added_at timestamptz not null default now(),
  constraint trip_members_email_format check (position('@' in email) > 1)
);

create table if not exists public.trip_notes (
  id uuid primary key default gen_random_uuid(),
  spot_id text not null,
  url text not null default '',
  memo text not null default '',
  title text not null default '',
  image text not null default '',
  created_by uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint non_empty_note check (length(trim(url)) > 0 or length(trim(memo)) > 0),
  constraint max_url check (length(url) <= 2048),
  constraint max_memo check (length(memo) <= 5000)
);

create index if not exists trip_notes_spot_created_at on public.trip_notes(spot_id,created_at desc);

alter table public.trip_members enable row level security;
alter table public.trip_notes enable row level security;

-- Users may only look up whether their own verified email is invited.
create policy "Read my own invitation"
  on public.trip_members for select to authenticated
  using (lower(email) = lower(auth.jwt()->>'email'));

-- Anyone not invited cannot read any shared note.
create policy "Invited members can view notes"
  on public.trip_notes for select to authenticated
  using (exists (
    select 1 from public.trip_members m
    where lower(m.email) = lower(auth.jwt()->>'email')
  ));

-- Every invitee can create their own note.
create policy "Invited members can add notes"
  on public.trip_notes for insert to authenticated
  with check (created_by = auth.uid() and exists (
    select 1 from public.trip_members m
    where lower(m.email) = lower(auth.jwt()->>'email')
  ));

-- Only the author can modify or delete their own note.
create policy "Authors can edit their notes"
  on public.trip_notes for update to authenticated
  using (created_by = auth.uid() and exists (
    select 1 from public.trip_members m
    where lower(m.email) = lower(auth.jwt()->>'email')
  ))
  with check (created_by = auth.uid());

create policy "Authors can remove their notes"
  on public.trip_notes for delete to authenticated
  using (created_by = auth.uid() and exists (
    select 1 from public.trip_members m
    where lower(m.email) = lower(auth.jwt()->>'email')
  ));

-- No guest access. Frontend must use ONLY the publishable/anon key, never service_role.
revoke all on public.trip_members from anon;
revoke all on public.trip_notes from anon;
grant select on public.trip_members to authenticated;
grant select,insert,update,delete on public.trip_notes to authenticated;

-- IMPORTANT: Add friend emails as verified in Supabase Auth.
-- Example (replace, or run manually in Table Editor):
-- insert into public.trip_members (email)
-- values ('your-email@example.com'),('friend1@example.com'),('friend2@example.com')
-- on conflict(email) do nothing;
