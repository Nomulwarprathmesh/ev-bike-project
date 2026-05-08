create extension if not exists "pgcrypto";

create or replace function public.current_app_role()
returns text
language sql
stable
as $$
  select coalesce(
    auth.jwt() -> 'app_metadata' ->> 'role',
    auth.jwt() -> 'user_metadata' ->> 'role',
    'user'
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select public.current_app_role() in ('admin', 'super_admin');
$$;

create or replace function public.is_vendor()
returns boolean
language sql
stable
as $$
  select public.current_app_role() = 'vendor';
$$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique not null,
  role text not null default 'user' check (role in ('admin', 'vendor', 'user', 'super_admin')),
  status text not null default 'active' check (status in ('active', 'inactive', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.users(id) on delete set null,
  business_name text not null,
  email text,
  phone text,
  status text not null default 'pending' check (status in ('pending', 'active', 'inactive', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scooters (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.vendors(id) on delete set null,
  name text not null,
  brand text,
  category text,
  description text,
  price numeric(12,2),
  range_km integer,
  top_speed_kmph integer,
  status text not null default 'active' check (status in ('active', 'inactive', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stock (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.vendors(id) on delete cascade,
  scooter_id uuid references public.scooters(id) on delete cascade,
  quantity integer not null default 0,
  reserved_quantity integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (vendor_id, scooter_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  vendor_id uuid references public.vendors(id) on delete set null,
  scooter_id uuid references public.scooters(id) on delete set null,
  status text not null default 'pending',
  total_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  amount numeric(12,2) not null default 0,
  provider text,
  provider_reference text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  discount_type text,
  discount_value numeric(12,2),
  status text not null default 'inactive' check (status in ('active', 'inactive', 'scheduled', 'expired')),
  start_date date,
  end_date date,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.test_rides (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  vendor_id uuid references public.vendors(id) on delete set null,
  scooter_id uuid references public.scooters(id) on delete set null,
  scheduled_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  scooter_id uuid references public.scooters(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  body text,
  type text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.vendors enable row level security;
alter table public.scooters enable row level security;
alter table public.stock enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.offers enable row level security;
alter table public.test_rides enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

create policy "Admins full users access" on public.users for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users read own profile" on public.users for select to authenticated using (id = auth.uid());
create policy "Users update own profile" on public.users for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "Admins full vendors access" on public.vendors for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Vendors read own vendor" on public.vendors for select to authenticated using (owner_id = auth.uid() or public.is_vendor());
create policy "Vendors update own vendor" on public.vendors for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Public read active scooters" on public.scooters for select to anon, authenticated using (status = 'active');
create policy "Admins full scooters access" on public.scooters for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Vendors manage own scooters" on public.scooters for all to authenticated using (public.is_vendor()) with check (public.is_vendor());

create policy "Admins full stock access" on public.stock for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Vendors manage stock" on public.stock for all to authenticated using (public.is_vendor()) with check (public.is_vendor());

create policy "Admins full orders access" on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users read own orders" on public.orders for select to authenticated using (user_id = auth.uid());
create policy "Users create own orders" on public.orders for insert to authenticated with check (user_id = auth.uid());
create policy "Vendors read vendor orders" on public.orders for select to authenticated using (public.is_vendor());

create policy "Admins full payments access" on public.payments for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users read own payments" on public.payments for select to authenticated using (user_id = auth.uid());

create policy "Public read active offers" on public.offers for select to anon, authenticated using (status = 'active' and (start_date is null or start_date <= current_date) and (end_date is null or end_date >= current_date));
create policy "Admins full offers access" on public.offers for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Admins full test rides access" on public.test_rides for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users manage own test rides" on public.test_rides for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Vendors read test rides" on public.test_rides for select to authenticated using (public.is_vendor());

create policy "Public read published reviews" on public.reviews for select to anon, authenticated using (status = 'published');
create policy "Admins full reviews access" on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users create own reviews" on public.reviews for insert to authenticated with check (user_id = auth.uid());
create policy "Users update own reviews" on public.reviews for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Admins full notifications access" on public.notifications for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Users read own notifications" on public.notifications for select to authenticated using (user_id = auth.uid());
create policy "Users update own notifications" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
