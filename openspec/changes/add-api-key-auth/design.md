## Context

The current FE-to-BE communication uses an axios instance with credentials but no API key validation. The backend (Hono/Bun) already has a middleware pipeline (`preMiddlewares` → `authMiddleware` → routes). The frontend reads config from `import.meta.env` via a typed config module.

## Goals / Non-Goals

**Goals:**
- Shared secret (`API_KEY`) configured as an environment variable on both apps
- Backend middleware rejects requests missing a valid `x-api-key` header
- Frontend axios interceptor attaches the `x-api-key` header to every outgoing request
- Behavior is consistent across all API routes

**Non-Goals:**
- Per-route or per-user API key isolation
- API key rotation or expiry
- Rate limiting or throttling

## Decisions

1. **Header name: `x-api-key`** — standard convention for API key headers, lowercase in Hono (headers are normalized).

2. **Shared env variable: `API_KEY`** — both apps read from the same key name. On the web it will be `VITE_API_KEY` (Vite prefix), on the API it's `API_KEY` (plain env). This avoids confusing naming.

3. **Middleware placement: after `preMiddlewares`** — the api-key middleware runs after CORS and injection middlewares but before authentication, so invalid requests are rejected early without hitting auth or route handlers.

4. **Error response: 401 with JSON body** — returns `{ error: "Invalid or missing API key" }` with a 401 status, consistent with standard HTTP semantics.

5. **Axios interceptor approach on FE** — adding a request interceptor (similar to the existing `Content-Type` interceptor) keeps the change minimal and centralized in `api-client.ts`.

## Risks / Trade-offs

- **Shared secret exposure**: The `VITE_API_KEY` value is embedded in the client bundle (visible in browser devtools). This provides only a basic trust layer, not strong security. Mitigation: document this limitation; the API key prevents casual unauthorized access but is not a substitute for user authentication.
- **Configuration drift**: If the API key differs between environments, requests will fail. Mitigation: both apps read from their respective env, and deployment scripts should ensure they match.
