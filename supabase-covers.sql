-- The Cornies' Getaway V6: public-facing spot covers with admin-only editing.
-- Run in Supabase SQL Editor AFTER the original supabase.sql setup.
-- Insert ONLY your verified email to trip_photo_admins at bottom.
-- WARNING: Photos in this bucket are PUBLIC to anyone who knows the URL.

create table if not exists public.trip_photo_admins (
  email text primary key,
  added_at timestamptz not null default now(),
  constraint photo_admin_email_format check (position('@' in email) > 1)
);

create table if not exists public.trip_covers (
  spot_id text primary key,
  image_url text not null,
  source_type text not null default 'url' check (source_type in ('url','upload')),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint trip_covers_image_url_length check (length(image_url) between 8 and 2048)
);

alter table public.trip_photo_admins enable row level security;
alter table public.trip_covers enable row level security;

-- No one can add themselves as admin through the web client.
revoke all on public.trip_photo_admins from anon;
grant select on public.trip_photo_admins to authenticated;
drop policy if exists "Admins can recognize themselves" on public.trip_photo_admins;
create policy "Admins can recognize themselves" on public.trip_photo_admins
  for select to authenticated using (lower(email)=lower(auth.jwt()->>'email'));

-- Guests can VIEW current cover photos, but cannot EDIT them.
grant select on public.trip_covers to anon;
grant select,insert,update,delete on public.trip_covers to authenticated;
drop policy if exists "Everyone views cover photos" on public.trip_covers;
create policy "Everyone views cover photos" on public.trip_covers
  for select to anon,authenticated using (true);

drop policy if exists "Only photo admins insert covers" on public.trip_covers;
create policy "Only photo admins insert covers" on public.trip_covers
  for insert to authenticated
  with check (exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

drop policy if exists "Only photo admins update covers" on public.trip_covers;
create policy "Only photo admins update covers" on public.trip_covers
  for update to authenticated
  using (exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ))
  with check (exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

drop policy if exists "Only photo admins delete covers" on public.trip_covers;
create policy "Only photo admins delete covers" on public.trip_covers
  for delete to authenticated
  using (exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

-- Supabase Storage. Public read URLs are needed for a public travel guide.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('trip-covers','trip-covers',true,5242880,array['image/webp'])
on conflict (id) do update set
  public=true,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "Only photo admins upload cover objects" on storage.objects;
create policy "Only photo admins upload cover objects" on storage.objects
  for insert to authenticated
  with check (bucket_id='trip-covers' and exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

drop policy if exists "Only photo admins read storage rows" on storage.objects;
create policy "Only photo admins read storage rows" on storage.objects
  for select to authenticated
  using (bucket_id='trip-covers' and exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

drop policy if exists "Only photo admins remove cover objects" on storage.objects;
create policy "Only photo admins remove cover objects" on storage.objects
  for delete to authenticated
  using (bucket_id='trip-covers' and exists (
    select 1 from public.trip_photo_admins a
    where lower(a.email)=lower(auth.jwt()->>'email')
  ));

-- Change this example and run MANUALLY, in Supabase SQL Editor (not in the public app):
-- insert into public.trip_photo_admins (email)
-- values ('your-verified-email@example.com') on conflict (email) do nothing;
