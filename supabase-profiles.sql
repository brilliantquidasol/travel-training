-- Run this in Supabase SQL Editor to add profiles and roles.
-- Creates table, RLS, and allows users to read/update own profile; admins can be set manually.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Drop existing policies so this script can be run again without errors
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

-- Users can read their own profile (needed for role check in app)
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can insert their own profile (on signup)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile (e.g. full_name; optionally restrict role changes in app)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Optional: trigger to create profile on signup (if you prefer not to create from client)
-- create or replace function public.handle_new_user()
-- returns trigger as $$
-- begin
--   insert into public.profiles (id, full_name, role)
--   values (new.id, new.raw_user_meta_data->>'full_name', 'user');
--   return new;
-- end;
-- $$ language plpgsql security definer;
-- create or replace trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- To make a user an admin, run (replace with real user id from auth.users):
-- update public.profiles set role = 'admin' where id = 'USER_UUID_HERE';

-- Or update by email (finds user in auth.users):
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'user@example.com');

-- Best: upsert admin by email (creates profile as admin if missing, otherwise updates role). Replace email.
-- insert into public.profiles (id, full_name, role)
-- select id, coalesce(raw_user_meta_data->>'full_name', 'User'), 'admin'
-- from auth.users where email = 'your@email.com'
-- on conflict (id) do update set role = 'admin', updated_at = now();
