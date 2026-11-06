-- =====================================================================
-- GOLIS EXPEDITIONS — PRODUCTION SUPABASE DATABASE & RLS FIX
-- Target Supabase Project: xxcarxtrjjjzyexljrkr
-- Instructions: Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run
-- =====================================================================

-- 1. Create Inquiries Table (Preserves existing data)
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

create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

-- 2. Create Administrator Allowlist Table
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Automatically Enroll Existing Administrator Accounts from auth.users
insert into public.admin_users (id, email, role)
select id, lower(email), 'super_admin'
from auth.users
where lower(email) in ('mahdxasan0062@gmail.com', 'mahdxasan0062z@gmail.com')
on conflict (id) do update set role = 'super_admin', email = excluded.email;

-- 4. Auto-Sync Trigger: Automatically enroll admins whenever they sign up or confirm
create or replace function public.handle_admin_auth_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(new.email) in ('mahdxasan0062@gmail.com', 'mahdxasan0062z@gmail.com') then
    insert into public.admin_users (id, email, role)
    values (new.id, lower(new.email), 'super_admin')
    on conflict (id) do update set role = 'super_admin', email = excluded.email;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_admin_sync on auth.users;
create trigger on_auth_user_admin_sync
after insert or update of email on auth.users
for each row execute function public.handle_admin_auth_sync();

-- 5. Robust Security Definer Function to Verify Admin Authorization
-- Handles UUID lookup, JWT claims, direct email match, and auth.users fallback
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, auth
stable
as $$
  select exists (
    -- 1. Check if authenticated UUID exists in admin_users
    select 1 from public.admin_users where id = auth.uid()
  )
  or exists (
    -- 2. Check if JWT email claim exists in admin_users
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
  -- 3. Direct match for authorized administrator emails (both with & without 'z')
  or lower(coalesce(auth.jwt() ->> 'email', '')) in ('mahdxasan0062@gmail.com', 'mahdxasan0062z@gmail.com')
  -- 4. Direct match in auth.users by UUID
  or exists (
    select 1 from auth.users
    where id = auth.uid()
      and lower(email) in ('mahdxasan0062@gmail.com', 'mahdxasan0062z@gmail.com')
  );
$$;

-- 6. Enable Table Privileges
grant usage on schema public to anon, authenticated;
grant select, insert on public.inquiries to anon;
grant select, insert, update, delete on public.inquiries to authenticated;
grant select on public.admin_users to authenticated;
grant execute on function public.is_admin to anon, authenticated;

-- 7. Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;
alter table public.admin_users enable row level security;

-- 8. Refresh RLS Policies (Clean Idempotency)
drop policy if exists "Allow public visitors to insert inquiries" on public.inquiries;
drop policy if exists "Allow admins to read inquiries" on public.inquiries;
drop policy if exists "Allow admins to update inquiries" on public.inquiries;
drop policy if exists "Allow admins to delete inquiries" on public.inquiries;
drop policy if exists "Allow admins to read admin users" on public.admin_users;

-- Public/Anonymous visitors can ONLY insert inquiries
create policy "Allow public visitors to insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

-- Only verified administrators can SELECT inquiries (never public USING (true))
create policy "Allow admins to read inquiries"
on public.inquiries
for select
to authenticated
using (public.is_admin());

-- Only verified administrators can UPDATE inquiry status
create policy "Allow admins to update inquiries"
on public.inquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Only verified administrators can DELETE inquiries
create policy "Allow admins to delete inquiries"
on public.inquiries
for delete
to authenticated
using (public.is_admin());

-- Authorized administrators can view admin roster
create policy "Allow admins to read admin users"
on public.admin_users
for select
to authenticated
using (auth.uid() = id or public.is_admin());

-- 9. Trigger to Automatically Update 'updated_at' Timestamp
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
-- 10. Verification Checks (Inspect Results Directly in SQL Editor)
-- =====================================================================
select
  count(*) as total_inquiries,
  count(*) filter (where id = 'cb85fbb8-9775-4835-84f2-219868af9c77') as existing_target_inquiry
from public.inquiries;

select id, email, role, created_at
from public.admin_users;
