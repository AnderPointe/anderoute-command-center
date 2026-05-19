# AI API Plan — Anderoute CoPilot

## Provider chain

```text
OpenAIRealtime  ──fail──▶  OpenAIResponses  ──fail──▶  LocalRules
  (when wired)              (when wired)                (always on)
```

`MockAIProvider` sits at the head in preview / E2E. `FallbackProvider`
wraps any chain — it never throws, so the driver UI is always responsive.

## Server-fn boundary

The OPENAI key never reaches the browser. All real calls are proxied
through a TanStack `createServerFn` that:

1. Reads `LOVABLE_API_KEY` (preferred) or `OPENAI_API_KEY` from
   `process.env` inside `.handler()` — never at module scope.
2. POSTs to `https://ai.gateway.lovable.dev/v1/chat/completions` (or
   OpenAI Responses) with the system prompt + tool registry.
3. Streams deltas back via `async function*` so the driver UI can render
   incrementally without buffering whole responses.

For voice (Realtime), the server fn mints a short-lived ephemeral session
token (no long-lived key) and the browser opens a WebRTC session directly.
Audio stays in the browser; transcripts + tool calls return through the
normal observability pipeline.

## Tool calling

`src/ai/aiToolRegistry.ts` declares 14 tools. `allowedTools(role, mode)`
returns the subset the model may call this turn:

- `driver` + `driver_moving` → no POD start (too heavy)
- any role + `emergency` → only `contact_dispatch`, `create_alert`, `report_delay`
- `dispatcher` / `admin` → no `update_driver_status` or `start_proof_of_delivery`

## Prompt modes

`buildSystemPrompt(role, mode)` stacks:

1. Base safety prompt (~120 tokens).
2. Role guard (driver vs dispatcher vs admin scope).
3. Mode addendum (length + tone for moving / parked / offline / emergency).

## Cost controls

- `AIRequest.maxTokens` is enforced server-side (default 256 for moving driver,
  512 for parked, 1024 for dispatcher).
- Cost dashboard table (`ai_cost_events`) — to be added in monitoring pass.
- Per-driver daily ceiling enforced by server fn before relaying.

## Safety guardrails (non-negotiable)

- Never give unsafe driving advice.
- Confirm destructive actions (cancel load, override dispatch).
- Never reveal other drivers' private data to a driver.
- Never expose secret keys.
- Always flag stale data.
- Never override navigation SDK warnings.
