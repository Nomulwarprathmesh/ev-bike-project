create extension if not exists "pgcrypto";

create table if not exists public.marketplace_posters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  redirect_url text,
  placement text default 'home',
  status text default 'active',
  start_date timestamptz,
  end_date timestamptz,
  created_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint marketplace_posters_valid_dates check (
    start_date is null or end_date is null or start_date <= end_date
  )
);

alter table public.marketplace_posters
  alter column placement set default 'home',
  alter column status set default 'active',
  alter column start_date type timestamptz using start_date::timestamptz,
  alter column end_date type timestamptz using end_date::timestamptz;

alter table public.marketplace_posters
  drop constraint if exists marketplace_posters_placement_check,
  drop constraint if exists marketplace_posters_status_check;

create index if not exists marketplace_posters_active_idx
  on public.marketplace_posters (placement, status, start_date, end_date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists marketplace_posters_set_updated_at on public.marketplace_posters;
create trigger marketplace_posters_set_updated_at
before update on public.marketplace_posters
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    auth.jwt() ->> 'role' in ('admin', 'super_admin')
    or auth.jwt() -> 'app_metadata' ->> 'role' in ('admin', 'super_admin')
    or auth.jwt() -> 'user_metadata' ->> 'role' in ('admin', 'super_admin'),
    false
  );
$$;

alter table public.marketplace_posters enable row level security;

drop policy if exists "Anyone can read active marketplace posters" on public.marketplace_posters;
create policy "Anyone can read active marketplace posters"
on public.marketplace_posters
for select
to anon, authenticated
using (
  status = 'active'
  and (start_date is null or start_date <= now())
  and (end_date is null or end_date >= now())
);

drop policy if exists "Admins can read all marketplace posters" on public.marketplace_posters;
create policy "Admins can read all marketplace posters"
on public.marketplace_posters
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create marketplace posters" on public.marketplace_posters;
create policy "Admins can create marketplace posters"
on public.marketplace_posters
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update marketplace posters" on public.marketplace_posters;
create policy "Admins can update marketplace posters"
on public.marketplace_posters
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete marketplace posters" on public.marketplace_posters;
create policy "Admins can delete marketplace posters"
on public.marketplace_posters
for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('marketplace-posters', 'marketplace-posters', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Anyone can read marketplace poster images" on storage.objects;
create policy "Anyone can read marketplace poster images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'marketplace-posters');

drop policy if exists "Admins can upload marketplace poster images" on storage.objects;
create policy "Admins can upload marketplace poster images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'marketplace-posters' and public.is_admin());

drop policy if exists "Admins can update marketplace poster images" on storage.objects;
create policy "Admins can update marketplace poster images"
on storage.objects
for update
to authenticated
using (bucket_id = 'marketplace-posters' and public.is_admin())
with check (bucket_id = 'marketplace-posters' and public.is_admin());

drop policy if exists "Admins can delete marketplace poster images" on storage.objects;
create policy "Admins can delete marketplace poster images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'marketplace-posters' and public.is_admin());
