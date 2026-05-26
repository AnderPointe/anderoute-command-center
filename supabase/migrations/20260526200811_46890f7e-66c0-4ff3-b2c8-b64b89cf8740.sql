
ALTER TABLE public.messenger_conversations
  ADD COLUMN IF NOT EXISTS workspace_id uuid,
  ADD COLUMN IF NOT EXISTS channel_id uuid,
  ADD COLUMN IF NOT EXISTS priority text DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS driver_id uuid,
  ADD COLUMN IF NOT EXISTS customer_id uuid,
  ADD COLUMN IF NOT EXISTS facility_id uuid,
  ADD COLUMN IF NOT EXISTS is_archived boolean DEFAULT false;

ALTER TABLE public.messenger_messages
  ADD COLUMN IF NOT EXISTS thread_parent_id uuid REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS priority text DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS is_pinned boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_edited boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_deleted boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

ALTER TABLE public.messenger_messages
  ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(message_body, '') || ' ' || coalesce(body, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS messenger_messages_search_idx ON public.messenger_messages USING gin(search_vector);
CREATE INDEX IF NOT EXISTS messenger_messages_thread_idx ON public.messenger_messages(thread_parent_id);

ALTER TABLE public.messenger_attachments
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS uploaded_by uuid;

ALTER TABLE public.messenger_conversation_members
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS member_role text DEFAULT 'member',
  ADD COLUMN IF NOT EXISTS notification_level text DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS is_muted boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS left_at timestamptz;

CREATE TABLE IF NOT EXISTS public.messenger_workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_workspaces TO authenticated;
GRANT ALL ON public.messenger_workspaces TO service_role;
ALTER TABLE public.messenger_workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view workspaces" ON public.messenger_workspaces FOR SELECT TO authenticated USING (is_company_member(auth.uid(), company_id));
CREATE POLICY "Members create workspaces" ON public.messenger_workspaces FOR INSERT TO authenticated WITH CHECK (is_company_member(auth.uid(), company_id));
CREATE POLICY "Managers update workspaces" ON public.messenger_workspaces FOR UPDATE TO authenticated USING (can_manage_company(auth.uid(), company_id));
CREATE POLICY "Managers delete workspaces" ON public.messenger_workspaces FOR DELETE TO authenticated USING (can_manage_company(auth.uid(), company_id));

CREATE TABLE IF NOT EXISTS public.messenger_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  workspace_id uuid REFERENCES public.messenger_workspaces(id) ON DELETE CASCADE,
  channel_name text NOT NULL,
  channel_key text NOT NULL,
  description text,
  channel_type text DEFAULT 'standard',
  is_private boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, channel_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_channels TO authenticated;
GRANT ALL ON public.messenger_channels TO service_role;
ALTER TABLE public.messenger_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view channels" ON public.messenger_channels FOR SELECT TO authenticated USING (is_company_member(auth.uid(), company_id));
CREATE POLICY "Members create channels" ON public.messenger_channels FOR INSERT TO authenticated WITH CHECK (is_company_member(auth.uid(), company_id));
CREATE POLICY "Managers update channels" ON public.messenger_channels FOR UPDATE TO authenticated USING (can_manage_company(auth.uid(), company_id));
CREATE POLICY "Managers delete channels" ON public.messenger_channels FOR DELETE TO authenticated USING (can_manage_company(auth.uid(), company_id));

CREATE TABLE IF NOT EXISTS public.messenger_message_edits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  old_message_body text,
  new_message_body text,
  edited_by uuid,
  edited_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messenger_message_edits TO authenticated;
GRANT ALL ON public.messenger_message_edits TO service_role;
ALTER TABLE public.messenger_message_edits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view edits" ON public.messenger_message_edits FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.messenger_messages m WHERE m.id = message_id AND is_conversation_participant(auth.uid(), m.conversation_id))
);
CREATE POLICY "Senders insert edits" ON public.messenger_message_edits FOR INSERT TO authenticated WITH CHECK (edited_by = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  user_id uuid,
  reaction text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, reaction)
);
GRANT SELECT, INSERT, DELETE ON public.messenger_reactions TO authenticated;
GRANT ALL ON public.messenger_reactions TO service_role;
ALTER TABLE public.messenger_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view reactions" ON public.messenger_reactions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.messenger_messages m WHERE m.id = message_id AND is_conversation_participant(auth.uid(), m.conversation_id))
);
CREATE POLICY "Users react" ON public.messenger_reactions FOR INSERT TO authenticated WITH CHECK (
  user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.messenger_messages m WHERE m.id = message_id AND is_conversation_participant(auth.uid(), m.conversation_id))
);
CREATE POLICY "Users delete own reactions" ON public.messenger_reactions FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_mentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  mentioned_contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  mentioned_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messenger_mentions TO authenticated;
GRANT ALL ON public.messenger_mentions TO service_role;
ALTER TABLE public.messenger_mentions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view mentions" ON public.messenger_mentions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.messenger_messages m WHERE m.id = message_id AND is_conversation_participant(auth.uid(), m.conversation_id))
);
CREATE POLICY "Participants create mentions" ON public.messenger_mentions FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.messenger_messages m WHERE m.id = message_id AND is_conversation_participant(auth.uid(), m.conversation_id))
);

CREATE TABLE IF NOT EXISTS public.messenger_typing_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  user_id uuid,
  is_typing boolean DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_typing_status TO authenticated;
GRANT ALL ON public.messenger_typing_status TO service_role;
ALTER TABLE public.messenger_typing_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view typing" ON public.messenger_typing_status FOR SELECT TO authenticated USING (
  is_conversation_participant(auth.uid(), conversation_id)
);
CREATE POLICY "Users set own typing" ON public.messenger_typing_status FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own typing" ON public.messenger_typing_status FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users delete own typing" ON public.messenger_typing_status FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_presence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  user_id uuid,
  status text DEFAULT 'offline',
  current_view text,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_presence TO authenticated;
GRANT ALL ON public.messenger_presence TO service_role;
ALTER TABLE public.messenger_presence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view presence" ON public.messenger_presence FOR SELECT TO authenticated USING (is_company_member(auth.uid(), company_id));
CREATE POLICY "Users set own presence" ON public.messenger_presence FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own presence" ON public.messenger_presence FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users delete own presence" ON public.messenger_presence FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_pinned_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  message_id uuid REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  pinned_by uuid,
  pinned_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.messenger_pinned_items TO authenticated;
GRANT ALL ON public.messenger_pinned_items TO service_role;
ALTER TABLE public.messenger_pinned_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants view pinned" ON public.messenger_pinned_items FOR SELECT TO authenticated USING (is_conversation_participant(auth.uid(), conversation_id));
CREATE POLICY "Participants pin items" ON public.messenger_pinned_items FOR INSERT TO authenticated WITH CHECK (
  pinned_by = auth.uid() AND is_conversation_participant(auth.uid(), conversation_id)
);
CREATE POLICY "Pinners unpin items" ON public.messenger_pinned_items FOR DELETE TO authenticated USING (pinned_by = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_saved_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  saved_by uuid NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(message_id, saved_by)
);
GRANT SELECT, INSERT, DELETE ON public.messenger_saved_messages TO authenticated;
GRANT ALL ON public.messenger_saved_messages TO service_role;
ALTER TABLE public.messenger_saved_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own saved" ON public.messenger_saved_messages FOR SELECT TO authenticated USING (saved_by = auth.uid());
CREATE POLICY "Users save messages" ON public.messenger_saved_messages FOR INSERT TO authenticated WITH CHECK (saved_by = auth.uid());
CREATE POLICY "Users unsave messages" ON public.messenger_saved_messages FOR DELETE TO authenticated USING (saved_by = auth.uid());

CREATE TABLE IF NOT EXISTS public.messenger_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  actor_user_id uuid,
  actor_contact_id uuid,
  action_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messenger_audit_log TO authenticated;
GRANT ALL ON public.messenger_audit_log TO service_role;
ALTER TABLE public.messenger_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Managers view audit" ON public.messenger_audit_log FOR SELECT TO authenticated USING (can_manage_company(auth.uid(), company_id));
CREATE POLICY "Members write audit" ON public.messenger_audit_log FOR INSERT TO authenticated WITH CHECK (
  is_company_member(auth.uid(), company_id) AND (actor_user_id IS NULL OR actor_user_id = auth.uid())
);

INSERT INTO storage.buckets (id, name, public) VALUES ('messenger-attachments', 'messenger-attachments', false)
  ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Authenticated read messenger attachments" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload messenger attachments" ON storage.objects;
DROP POLICY IF EXISTS "Owner deletes messenger attachments" ON storage.objects;

CREATE POLICY "Authenticated read messenger attachments" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'messenger-attachments');
CREATE POLICY "Authenticated upload messenger attachments" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'messenger-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Owner deletes messenger attachments" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'messenger-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

ALTER PUBLICATION supabase_realtime ADD TABLE public.messenger_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messenger_typing_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messenger_presence;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messenger_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_read_receipts;
