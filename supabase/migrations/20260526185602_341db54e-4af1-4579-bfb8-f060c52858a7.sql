
-- Enums
DO $$ BEGIN
  CREATE TYPE public.messenger_contact_type AS ENUM ('driver','courier','carrier','broker','customer','warehouse','dispatcher','other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.messenger_conversation_category AS ENUM ('pinned','active_loads','dispatch','invoices','completed','general');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Contacts directory
CREATE TABLE IF NOT EXISTS public.messenger_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid,
  display_name text NOT NULL,
  contact_type public.messenger_contact_type NOT NULL DEFAULT 'other',
  company_name text,
  avatar_url text,
  phone text,
  email text,
  is_online boolean NOT NULL DEFAULT false,
  last_seen_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_messenger_contacts_company ON public.messenger_contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_messenger_contacts_type ON public.messenger_contacts(company_id, contact_type);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_contacts TO authenticated;
GRANT ALL ON public.messenger_contacts TO service_role;
ALTER TABLE public.messenger_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view contacts" ON public.messenger_contacts
  FOR SELECT TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "Members insert contacts" ON public.messenger_contacts
  FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "Members update contacts" ON public.messenger_contacts
  FOR UPDATE TO authenticated USING (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "Managers delete contacts" ON public.messenger_contacts
  FOR DELETE TO authenticated USING (public.can_manage_company(auth.uid(), company_id));

-- Conversations
CREATE TABLE IF NOT EXISTS public.messenger_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title text,
  category public.messenger_conversation_category NOT NULL DEFAULT 'general',
  is_pinned boolean NOT NULL DEFAULT false,
  load_id uuid,
  order_ref text,
  created_by uuid,
  last_message_at timestamptz,
  last_message_preview text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_messenger_conversations_company ON public.messenger_conversations(company_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messenger_conversations_category ON public.messenger_conversations(company_id, category);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_conversations TO authenticated;
GRANT ALL ON public.messenger_conversations TO service_role;
ALTER TABLE public.messenger_conversations ENABLE ROW LEVEL SECURITY;

-- Participants (defined first so conversation policies can reference it)
CREATE TABLE IF NOT EXISTS public.messenger_conversation_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  user_id uuid,
  contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  is_muted boolean NOT NULL DEFAULT false,
  UNIQUE (conversation_id, user_id),
  UNIQUE (conversation_id, contact_id)
);
CREATE INDEX IF NOT EXISTS idx_mcp_conv ON public.messenger_conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_mcp_user ON public.messenger_conversation_participants(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_conversation_participants TO authenticated;
GRANT ALL ON public.messenger_conversation_participants TO service_role;
ALTER TABLE public.messenger_conversation_participants ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user a participant of a conversation?
CREATE OR REPLACE FUNCTION public.is_conversation_participant(_user_id uuid, _conversation_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.messenger_conversation_participants
    WHERE conversation_id = _conversation_id AND user_id = _user_id
  );
$$;

-- Conversation policies
CREATE POLICY "Members view conversations" ON public.messenger_conversations
  FOR SELECT TO authenticated USING (
    public.is_company_member(auth.uid(), company_id)
    AND (
      public.is_conversation_participant(auth.uid(), id)
      OR public.can_manage_company(auth.uid(), company_id)
    )
  );
CREATE POLICY "Members create conversations" ON public.messenger_conversations
  FOR INSERT TO authenticated WITH CHECK (public.is_company_member(auth.uid(), company_id));
CREATE POLICY "Members update conversations" ON public.messenger_conversations
  FOR UPDATE TO authenticated USING (
    public.is_company_member(auth.uid(), company_id)
    AND (
      public.is_conversation_participant(auth.uid(), id)
      OR public.can_manage_company(auth.uid(), company_id)
    )
  );
CREATE POLICY "Managers delete conversations" ON public.messenger_conversations
  FOR DELETE TO authenticated USING (public.can_manage_company(auth.uid(), company_id));

-- Participant policies
CREATE POLICY "Participants view participants" ON public.messenger_conversation_participants
  FOR SELECT TO authenticated USING (
    public.is_conversation_participant(auth.uid(), conversation_id)
    OR EXISTS (
      SELECT 1 FROM public.messenger_conversations c
      WHERE c.id = conversation_id AND public.can_manage_company(auth.uid(), c.company_id)
    )
  );
CREATE POLICY "Members add participants" ON public.messenger_conversation_participants
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.messenger_conversations c
      WHERE c.id = conversation_id AND public.is_company_member(auth.uid(), c.company_id)
    )
  );
CREATE POLICY "Members update own participant" ON public.messenger_conversation_participants
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Managers remove participants" ON public.messenger_conversation_participants
  FOR DELETE TO authenticated USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.messenger_conversations c
      WHERE c.id = conversation_id AND public.can_manage_company(auth.uid(), c.company_id)
    )
  );

-- Messages
CREATE TABLE IF NOT EXISTS public.messenger_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.messenger_conversations(id) ON DELETE CASCADE,
  sender_user_id uuid,
  sender_contact_id uuid REFERENCES public.messenger_contacts(id) ON DELETE SET NULL,
  body text,
  reply_to_id uuid REFERENCES public.messenger_messages(id) ON DELETE SET NULL,
  is_system boolean NOT NULL DEFAULT false,
  edited_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_messenger_messages_conv ON public.messenger_messages(conversation_id, created_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_messages TO authenticated;
GRANT ALL ON public.messenger_messages TO service_role;
ALTER TABLE public.messenger_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants view messages" ON public.messenger_messages
  FOR SELECT TO authenticated USING (public.is_conversation_participant(auth.uid(), conversation_id));
CREATE POLICY "Participants send messages" ON public.messenger_messages
  FOR INSERT TO authenticated WITH CHECK (
    public.is_conversation_participant(auth.uid(), conversation_id)
    AND (sender_user_id IS NULL OR sender_user_id = auth.uid())
  );
CREATE POLICY "Senders edit own messages" ON public.messenger_messages
  FOR UPDATE TO authenticated USING (sender_user_id = auth.uid());
CREATE POLICY "Senders delete own messages" ON public.messenger_messages
  FOR DELETE TO authenticated USING (sender_user_id = auth.uid());

-- Attachments
CREATE TABLE IF NOT EXISTS public.messenger_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  storage_bucket text NOT NULL DEFAULT 'messenger-attachments',
  storage_path text NOT NULL,
  file_name text NOT NULL,
  mime_type text,
  file_size_bytes bigint,
  width int,
  height int,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_messenger_attachments_message ON public.messenger_attachments(message_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messenger_attachments TO authenticated;
GRANT ALL ON public.messenger_attachments TO service_role;
ALTER TABLE public.messenger_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants view attachments" ON public.messenger_attachments
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.messenger_messages m
      WHERE m.id = message_id AND public.is_conversation_participant(auth.uid(), m.conversation_id)
    )
  );
CREATE POLICY "Participants add attachments" ON public.messenger_attachments
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.messenger_messages m
      WHERE m.id = message_id AND m.sender_user_id = auth.uid()
    )
  );
CREATE POLICY "Senders delete own attachments" ON public.messenger_attachments
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.messenger_messages m
      WHERE m.id = message_id AND m.sender_user_id = auth.uid()
    )
  );

-- Read receipts
CREATE TABLE IF NOT EXISTS public.message_read_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES public.messenger_messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (message_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_message_read_receipts_user ON public.message_read_receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_message_read_receipts_message ON public.message_read_receipts(message_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.message_read_receipts TO authenticated;
GRANT ALL ON public.message_read_receipts TO service_role;
ALTER TABLE public.message_read_receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view receipts in their conversations" ON public.message_read_receipts
  FOR SELECT TO authenticated USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.messenger_messages m
      WHERE m.id = message_id AND public.is_conversation_participant(auth.uid(), m.conversation_id)
    )
  );
CREATE POLICY "Users mark own receipts" ON public.message_read_receipts
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users delete own receipts" ON public.message_read_receipts
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- updated_at triggers
DROP TRIGGER IF EXISTS trg_messenger_contacts_updated ON public.messenger_contacts;
CREATE TRIGGER trg_messenger_contacts_updated BEFORE UPDATE ON public.messenger_contacts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_messenger_conversations_updated ON public.messenger_conversations;
CREATE TRIGGER trg_messenger_conversations_updated BEFORE UPDATE ON public.messenger_conversations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
