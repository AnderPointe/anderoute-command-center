create extension if not exists pgcrypto;
create extension if not exists postgis;

alter table public.companies
  add column if not exists company_name text,
  add column if not exists legal_name text,
  add column if not exists company_type text default 'customer',
  add column if not exists industry text,
  add column if not exists website text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists billing_email text,
  add column if not exists status text default 'active',
  add column if not exists timezone text default 'America/Chicago',
  add column if not exists default_currency text default 'USD',
  add column if not exists updated_at timestamptz not null default now();

-- Backfill company_name from existing name column
update public.companies set company_name = name where company_name is null;

-- Keep company_name and name in sync going forward
create or replace function public.sync_company_name()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.company_name is null and new.name is not null then
    new.company_name := new.name;
  elsif new.name is null and new.company_name is not null then
    new.name := new.company_name;
  elsif tg_op = 'UPDATE' then
    if new.company_name is distinct from old.company_name and new.name = old.name then
      new.name := new.company_name;
    elsif new.name is distinct from old.name and new.company_name = old.company_name then
      new.company_name := new.name;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_company_name on public.companies;
create trigger trg_sync_company_name
before insert or update on public.companies
for each row execute function public.sync_company_name();

drop trigger if exists trg_companies_updated_at on public.companies;
create trigger trg_companies_updated_at
before update on public.companies
for each row execute function public.touch_updated_at();