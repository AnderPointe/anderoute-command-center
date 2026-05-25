
ALTER TABLE public.drivers ADD COLUMN IF NOT EXISTS photo_url text;
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS hauling_description text;
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS cargo_type text;
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS route_progress numeric(5,2);
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS capacity_percent numeric(5,2);
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS volume numeric(10,2);
ALTER TABLE public.shipments ADD COLUMN IF NOT EXISTS eta_minutes integer;
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS fuel_level numeric(5,2);
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS telemetry_status text;
