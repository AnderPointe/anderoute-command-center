-- Phase 5 — Push notifications + in-vehicle session tracking

-- =====================================================
-- driver_push_tokens
-- =====================================================
CREATE TABLE public.driver_push_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  company_id UUID NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('expo','fcm','apns','webpush','mock')),
  token TEXT NOT NULL,
  device_id TEXT,
  device_model TEXT,
  platform TEXT CHECK (platform IN ('ios','android','web','unknown')),
  app_version TEXT,
  locale TEXT,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, token)
);

CREATE INDEX idx_driver_push_tokens_driver ON public.driver_push_tokens(driver_id);
CREATE INDEX idx_driver_push_tokens_company ON public.driver_push_tokens(company_id);
CREATE INDEX idx_driver_push_tokens_active ON public.driver_push_tokens(driver_id) WHERE revoked_at IS NULL;

ALTER TABLE public.driver_push_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Driver can view own push tokens"
  ON public.driver_push_tokens FOR SELECT
  USING (auth.uid() = driver_id);

CREATE POLICY "Driver can insert own push tokens"
  ON public.driver_push_tokens FOR INSERT
  WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Driver can update own push tokens"
  ON public.driver_push_tokens FOR UPDATE
  USING (auth.uid() = driver_id);

CREATE POLICY "Driver can delete own push tokens"
  ON public.driver_push_tokens FOR DELETE
  USING (auth.uid() = driver_id);

CREATE POLICY "Company managers can view push tokens"
  ON public.driver_push_tokens FOR SELECT
  USING (public.can_manage_company(auth.uid(), company_id));

CREATE TRIGGER trg_driver_push_tokens_updated_at
  BEFORE UPDATE ON public.driver_push_tokens
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =====================================================
-- notification_events
-- =====================================================
CREATE TABLE public.notification_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  company_id UUID NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('load_offer','dispatch_voice','route_hazard','eta_arrival','system')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  provider TEXT CHECK (provider IN ('expo','fcm','apns','webpush','mock')),
  push_token_id UUID REFERENCES public.driver_push_tokens(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','sent','delivered','failed','opened')),
  error TEXT,
  related_load_id UUID,
  related_intelligence_id UUID,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notification_events_driver ON public.notification_events(driver_id, created_at DESC);
CREATE INDEX idx_notification_events_company ON public.notification_events(company_id, created_at DESC);
CREATE INDEX idx_notification_events_status ON public.notification_events(status) WHERE status IN ('queued','failed');

ALTER TABLE public.notification_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Driver can view own notifications"
  ON public.notification_events FOR SELECT
  USING (auth.uid() = driver_id);

CREATE POLICY "Driver can update own notifications"
  ON public.notification_events FOR UPDATE
  USING (auth.uid() = driver_id);

CREATE POLICY "Company managers can view notifications"
  ON public.notification_events FOR SELECT
  USING (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company managers can insert notifications"
  ON public.notification_events FOR INSERT
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE TRIGGER trg_notification_events_updated_at
  BEFORE UPDATE ON public.notification_events
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_events;
ALTER TABLE public.notification_events REPLICA IDENTITY FULL;

-- =====================================================
-- in_vehicle_sessions
-- =====================================================
CREATE TABLE public.in_vehicle_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  company_id UUID NOT NULL,
  surface TEXT NOT NULL CHECK (surface IN ('carplay','android_auto','web_sim')),
  session_id TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  disconnected_at TIMESTAMPTZ,
  vehicle_make TEXT,
  vehicle_model TEXT,
  app_template TEXT,
  last_event_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_in_vehicle_sessions_driver ON public.in_vehicle_sessions(driver_id, connected_at DESC);
CREATE INDEX idx_in_vehicle_sessions_company ON public.in_vehicle_sessions(company_id, connected_at DESC);
CREATE INDEX idx_in_vehicle_sessions_active ON public.in_vehicle_sessions(driver_id) WHERE disconnected_at IS NULL;

ALTER TABLE public.in_vehicle_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Driver can view own in-vehicle sessions"
  ON public.in_vehicle_sessions FOR SELECT
  USING (auth.uid() = driver_id);

CREATE POLICY "Driver can insert own in-vehicle sessions"
  ON public.in_vehicle_sessions FOR INSERT
  WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Driver can update own in-vehicle sessions"
  ON public.in_vehicle_sessions FOR UPDATE
  USING (auth.uid() = driver_id);

CREATE POLICY "Company managers can view in-vehicle sessions"
  ON public.in_vehicle_sessions FOR SELECT
  USING (public.can_manage_company(auth.uid(), company_id));

CREATE TRIGGER trg_in_vehicle_sessions_updated_at
  BEFORE UPDATE ON public.in_vehicle_sessions
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.in_vehicle_sessions;
ALTER TABLE public.in_vehicle_sessions REPLICA IDENTITY FULL;