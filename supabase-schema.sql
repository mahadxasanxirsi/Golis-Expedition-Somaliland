-- =====================================================================
-- GOLIS EXPEDITIONS — SUPABASE PRODUCTION DATABASE SCHEMA
-- Instructions: Open your Supabase project -> SQL Editor -> Paste & Run
-- =====================================================================

-- 1. Create Inquiries Table (Stores website contact inquiries)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text not null check (char_length(trim(phone)) >= 5),
  inquiry_subject text not null check (char_length(trim(inquiry_subject)) >= 2),
  message text not null check (char_length(trim(message)) >= 5),
  status text not null default 'New' check (status in ('New', 'In Progress', 'Replied', 'Closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for lightning-fast dashboard queries
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

-- 2. Create Admin Users Table (Allowlist for authorized administrators)
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Security Definer Helper to safely verify admin status without recursive RLS checks
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid() 
       or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  ) or lower(coalesce(auth.jwt() ->> 'email', '')) = 'mahdxasan0062z@gmail.com';
$$;

-- 4. Enable Row Level Security (RLS) on both tables
alter table public.inquiries enable row level security;
alter table public.admin_users enable row level security;

-- 5. Drop existing policies if re-running script to ensure clean idempotency
drop policy if exists "Allow public visitors to insert inquiries" on public.inquiries;
drop policy if exists "Allow admins to read inquiries" on public.inquiries;
drop policy if exists "Allow admins to update inquiries" on public.inquiries;
drop policy if exists "Allow admins to delete inquiries" on public.inquiries;
drop policy if exists "Allow admins to read admin users" on public.admin_users;

-- 6. Define Strict RLS Policies for Inquiries

-- (A) Anonymous & Public visitors may INSERT customer inquiries
create policy "Allow public visitors to insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

-- (B) Only verified administrators can SELECT/view inquiries
create policy "Allow admins to read inquiries"
on public.inquiries
for select
to authenticated
using (public.is_admin());

-- (C) Only verified administrators can UPDATE inquiry status
create policy "Allow admins to update inquiries"
on public.inquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- (D) Only verified administrators can DELETE inquiries
create policy "Allow admins to delete inquiries"
on public.inquiries
for delete
to authenticated
using (public.is_admin());

-- 7. Define RLS Policies for Admin Users Table
-- Users can see their own admin entry, or other admins can view the roster
create policy "Allow admins to read admin users"
on public.admin_users
for select
to authenticated
using (auth.uid() = id or public.is_admin());

-- 8. Trigger to Automatically Update 'updated_at' Timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.handle_updated_at();

-- =====================================================================
-- HOW TO CREATE YOUR FIRST ADMINISTRATOR ACCOUNT:
-- 1. In Supabase Dashboard -> Authentication -> Users -> Click "Add User" -> "Create user".
--    Email: mahdxasan0062z@gmail.com
--    Password: Set your secure password.
-- 2. Copy the generated User UID (e.g. 11111111-2222-3333-4444-555555555555).
-- 3. Run this single SQL statement below, replacing the UID:
--
--    insert into public.admin_users (id, email, role)
--    values ('YOUR_USER_UID_HERE', 'mahdxasan0062z@gmail.com', 'super_admin')
--    on conflict (id) do nothing;
-- =====================================================================
