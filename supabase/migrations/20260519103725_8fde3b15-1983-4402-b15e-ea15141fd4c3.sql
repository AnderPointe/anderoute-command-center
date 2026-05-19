
-- =========================================================
-- ENUMS
-- =========================================================
create type public.app_role as enum ('owner', 'admin', 'dispatcher', 'driver');
create type public.driver_status as enum (
  'waiting','offered','accepted','pickup','loaded','transit','break','offduty','delayed','delivered'
);
create type public.license_type as enum ('CDL-A','CDL-B','Non-CDL');
create type public.vehicle_type as enum (
  'CDL Freight','Hotshot','Box Truck','Cargo Van','Personal Vehicle',
  'Flatbed','Reefer','Dry Van','Power Only','Step Deck'
);
create type public.vehicle_op_status as enum ('Active','Idle','Maintenance','Out of Service');
create type public.fuel_type as enum ('Diesel','Gas','Electric');
create type public.load_status as enum (
  'draft','available','offered','accepted','denied','assigned','pickup',
  'picked_up','loaded','transit','delayed','delivered','completed','cancelled'
);
create type public.route_status as enum ('planned','active','completed');
create type public.alert_severity as enum ('low','medium','high','critical');
create type public.offer_response as enum ('pending','accepted','denied','expired');

-- =========================================================
-- COMPANIES
-- =========================================================
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);
alter table public.companies enable row level security;

-- =========================================================
-- PROFILES (per user)
-- =========================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  display_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- =========================================================
-- USER ROLES (company-scoped)
-- =========================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, company_id, role)
);
alter table public.user_roles enable row level security;

-- =========================================================
-- SECURITY DEFINER HELPERS
-- =========================================================
create or replace function public.has_role(_user_id uuid, _company_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and company_id = _company_id and role = _role
  );
$$;

create or replace function public.is_company_member(_user_id uuid, _company_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and company_id = _company_id
  );
$$;

create or replace function public.can_manage_company(_user_id uuid, _company_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and company_id = _company_id
      and role in ('owner','admin','dispatcher')
  );
$$;

create or replace function public.current_company()
returns uuid
language sql stable security definer set search_path = public
as $$
  select company_id from public.profiles where id = auth.uid();
$$;

-- =========================================================
-- VEHICLES
-- =========================================================
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  unit_number text not null,
  type public.vehicle_type not null,
  make text,
  model text,
  year int,
  plate text,
  fuel_type public.fuel_type not null default 'Diesel',
  average_mpg numeric(5,2),
  current_driver_id uuid,
  status public.vehicle_op_status not null default 'Idle',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.vehicles enable row level security;
create index on public.vehicles (company_id);

-- =========================================================
-- DRIVERS
-- =========================================================
create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text,
  email text,
  license_type public.license_type not null default 'Non-CDL',
  cdl_status boolean not null default false,
  status public.driver_status not null default 'offduty',
  vehicle_type public.vehicle_type,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  current_speed numeric(5,1) default 0,
  average_mpg numeric(5,2),
  current_lat double precision,
  current_lng double precision,
  current_location_label text,
  current_load_id uuid,
  active_shipment_id uuid,
  eta text,
  on_time_percentage numeric(5,2) default 0,
  safety_score numeric(5,2) default 0,
  miles_today int default 0,
  loads_today int default 0,
  dispatcher_name text,
  last_updated timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.drivers enable row level security;
create index on public.drivers (company_id);
create index on public.drivers (user_id);

alter table public.vehicles
  add constraint vehicles_driver_fk
  foreign key (current_driver_id) references public.drivers(id) on delete set null;

-- =========================================================
-- LOADS
-- =========================================================
create table public.loads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  pickup_location text not null,
  dropoff_location text not null,
  commodity text,
  package_type text,
  weight numeric(10,2) default 0,
  quantity int default 0,
  required_vehicle_type public.vehicle_type,
  requires_cdl boolean not null default false,
  requires_hazmat boolean not null default false,
  status public.load_status not null default 'draft',
  assigned_driver_id uuid references public.drivers(id) on delete set null,
  estimated_miles int,
  estimated_duration text,
  pickup_window text,
  delivery_window text,
  dispatcher_note text,
  customer text,
  rate numeric(10,2),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.loads enable row level security;
create index on public.loads (company_id);
create index on public.loads (assigned_driver_id);

alter table public.drivers
  add constraint drivers_current_load_fk
  foreign key (current_load_id) references public.loads(id) on delete set null;

-- =========================================================
-- SHIPMENTS
-- =========================================================
create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  customer_name text,
  commodity text,
  package_type text,
  weight numeric(10,2),
  quantity int,
  pickup_address text,
  dropoff_address text,
  status public.load_status not null default 'assigned',
  eta text,
  special_instructions text,
  proof_of_delivery_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.shipments enable row level security;
create index on public.shipments (company_id);
create index on public.shipments (load_id);

alter table public.drivers
  add constraint drivers_active_shipment_fk
  foreign key (active_shipment_id) references public.shipments(id) on delete set null;

-- =========================================================
-- ROUTES + STEPS
-- =========================================================
create table public.routes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  route_status public.route_status not null default 'planned',
  total_miles int default 0,
  remaining_miles int default 0,
  eta text,
  current_step int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.routes enable row level security;
create index on public.routes (company_id);
create index on public.routes (load_id);

create table public.route_steps (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  step_order int not null,
  instruction text not null,
  distance text,
  duration text,
  street text,
  created_at timestamptz not null default now()
);
alter table public.route_steps enable row level security;
create index on public.route_steps (route_id);

-- =========================================================
-- DRIVER LOCATION + STATUS EVENTS
-- =========================================================
create table public.driver_location_events (
  id bigserial primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  lat double precision not null,
  lng double precision not null,
  speed numeric(5,1),
  heading numeric(5,1),
  recorded_at timestamptz not null default now()
);
alter table public.driver_location_events enable row level security;
create index on public.driver_location_events (driver_id, recorded_at desc);
create index on public.driver_location_events (company_id);

create table public.driver_status_events (
  id bigserial primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  status public.driver_status not null,
  note text,
  recorded_at timestamptz not null default now()
);
alter table public.driver_status_events enable row level security;
create index on public.driver_status_events (driver_id, recorded_at desc);

-- =========================================================
-- LOAD OFFERS
-- =========================================================
create table public.load_offers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  offered_by uuid references auth.users(id) on delete set null,
  response public.offer_response not null default 'pending',
  responded_at timestamptz,
  deny_reason text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.load_offers enable row level security;
create index on public.load_offers (company_id);
create index on public.load_offers (driver_id);
create index on public.load_offers (load_id);

-- =========================================================
-- DISPATCH ASSIGNMENTS
-- =========================================================
create table public.dispatch_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  assigned_by uuid references auth.users(id) on delete set null,
  notes text,
  assigned_at timestamptz not null default now()
);
alter table public.dispatch_assignments enable row level security;
create index on public.dispatch_assignments (company_id);

-- =========================================================
-- ALERTS
-- =========================================================
create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  severity public.alert_severity not null,
  type text not null,
  driver_id uuid references public.drivers(id) on delete set null,
  load_id uuid references public.loads(id) on delete set null,
  message text not null,
  recommended_action text,
  resolved boolean not null default false,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.alerts enable row level security;
create index on public.alerts (company_id, resolved, created_at desc);

-- =========================================================
-- PROOF OF DELIVERY
-- =========================================================
create table public.proof_of_delivery (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  signature_name text,
  photo_url text,
  notes text,
  captured_at timestamptz not null default now()
);
alter table public.proof_of_delivery enable row level security;
create index on public.proof_of_delivery (shipment_id);

-- =========================================================
-- UPDATED_AT TRIGGERS
-- =========================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger trg_profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger trg_vehicles_touch before update on public.vehicles for each row execute function public.touch_updated_at();
create trigger trg_loads_touch before update on public.loads for each row execute function public.touch_updated_at();
create trigger trg_shipments_touch before update on public.shipments for each row execute function public.touch_updated_at();
create trigger trg_routes_touch before update on public.routes for each row execute function public.touch_updated_at();

-- =========================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =========================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========================================================
-- RLS POLICIES
-- =========================================================

-- companies
create policy "members read company" on public.companies for select to authenticated
  using (public.is_company_member(auth.uid(), id));
create policy "any user create company" on public.companies for insert to authenticated
  with check (true);
create policy "owners update company" on public.companies for update to authenticated
  using (public.has_role(auth.uid(), id, 'owner'))
  with check (public.has_role(auth.uid(), id, 'owner'));

-- profiles
create policy "read own or same company profile" on public.profiles for select to authenticated
  using (id = auth.uid() or (company_id is not null and public.is_company_member(auth.uid(), company_id)));
create policy "insert own profile" on public.profiles for insert to authenticated
  with check (id = auth.uid());
create policy "update own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- user_roles
create policy "read own roles or company manager" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.can_manage_company(auth.uid(), company_id));
create policy "owners manage roles" on public.user_roles for insert to authenticated
  with check (public.has_role(auth.uid(), company_id, 'owner') or public.has_role(auth.uid(), company_id, 'admin'));
create policy "owners delete roles" on public.user_roles for delete to authenticated
  using (public.has_role(auth.uid(), company_id, 'owner') or public.has_role(auth.uid(), company_id, 'admin'));

-- Generic helper macro pattern: company-scoped read for all members, write for managers
-- vehicles
create policy "company read vehicles" on public.vehicles for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write vehicles" on public.vehicles for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- drivers
create policy "company read drivers" on public.drivers for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write drivers" on public.drivers for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));
create policy "driver self update" on public.drivers for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- loads
create policy "company read loads" on public.loads for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write loads" on public.loads for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));
create policy "driver update own load status" on public.loads for update to authenticated
  using (assigned_driver_id in (select id from public.drivers where user_id = auth.uid()))
  with check (assigned_driver_id in (select id from public.drivers where user_id = auth.uid()));

-- shipments
create policy "company read shipments" on public.shipments for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write shipments" on public.shipments for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- routes
create policy "company read routes" on public.routes for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write routes" on public.routes for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- route_steps
create policy "company read steps" on public.route_steps for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write steps" on public.route_steps for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- driver_location_events
create policy "company read locations" on public.driver_location_events for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "driver insert own location" on public.driver_location_events for insert to authenticated
  with check (driver_id in (select id from public.drivers where user_id = auth.uid())
              or public.can_manage_company(auth.uid(), company_id));

-- driver_status_events
create policy "company read status events" on public.driver_status_events for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "driver or manager insert status" on public.driver_status_events for insert to authenticated
  with check (driver_id in (select id from public.drivers where user_id = auth.uid())
              or public.can_manage_company(auth.uid(), company_id));

-- load_offers
create policy "company or driver read offers" on public.load_offers for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers create offers" on public.load_offers for insert to authenticated
  with check (public.can_manage_company(auth.uid(), company_id));
create policy "driver respond own offer" on public.load_offers for update to authenticated
  using (driver_id in (select id from public.drivers where user_id = auth.uid())
         or public.can_manage_company(auth.uid(), company_id))
  with check (driver_id in (select id from public.drivers where user_id = auth.uid())
              or public.can_manage_company(auth.uid(), company_id));

-- dispatch_assignments
create policy "company read assignments" on public.dispatch_assignments for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write assignments" on public.dispatch_assignments for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- alerts
create policy "company read alerts" on public.alerts for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "managers write alerts" on public.alerts for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- proof_of_delivery
create policy "company read pod" on public.proof_of_delivery for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "driver or manager insert pod" on public.proof_of_delivery for insert to authenticated
  with check (driver_id in (select id from public.drivers where user_id = auth.uid())
              or public.can_manage_company(auth.uid(), company_id));

-- =========================================================
-- REALTIME
-- =========================================================
alter table public.drivers replica identity full;
alter table public.loads replica identity full;
alter table public.shipments replica identity full;
alter table public.alerts replica identity full;
alter table public.driver_location_events replica identity full;
alter table public.driver_status_events replica identity full;
alter table public.load_offers replica identity full;

alter publication supabase_realtime add table public.drivers;
alter publication supabase_realtime add table public.loads;
alter publication supabase_realtime add table public.shipments;
alter publication supabase_realtime add table public.alerts;
alter publication supabase_realtime add table public.driver_location_events;
alter publication supabase_realtime add table public.driver_status_events;
alter publication supabase_realtime add table public.load_offers;
