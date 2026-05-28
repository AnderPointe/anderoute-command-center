## Cursor Cloud specific instructions

- This is a single Bun/Vite/TanStack Start app; standard scripts live in `package.json`.
- The dev server uses port `8080` in this environment when run with `bun run dev --host 0.0.0.0`.
- Most dashboard, messenger, and driver-demo flows use mock data and can be tested without external services.
- Supabase-backed theme/admin flows need the Supabase env vars from `.env`; Google Maps panels need `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` for real map rendering, otherwise map UI falls back to an unavailable overlay.
- `bun run lint` is wired up, but the current repository has pre-existing Prettier and `no-explicit-any` findings; treat that output as codebase lint debt, not a dependency setup issue.
