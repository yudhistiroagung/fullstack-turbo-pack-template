## Context

Currently, every API call in the web app uses the native `fetch` API with boilerplate repeated across three hooks:
- `${config.apiUrl}` prefix on every URL
- `credentials: 'include'` on every request
- `headers: { 'Content-Type': 'application/json' }` on POST/PATCH requests

There is no shared HTTP client abstraction. The app already uses `@/lib/` for cross-cutting concerns (`auth-client.ts`, `query-client.ts`), making it a natural home for an API client.

## Goals / Non-Goals

**Goals:**
- Create a single shared axios instance that all hooks import
- Auto-apply `baseURL`, `withCredentials`, and JSON content-type via interceptors
- Replace fetch in all 3 hooks without changing their external behavior or error handling
- Keep the API client surface minimal — no over-abstraction

**Non-Goals:**
- Response/error interceptor (keep error handling in hooks for now)
- Auth token injection (the existing `credentials: 'include'` cookie-based auth is sufficient)
- Adding axios to the backend (`apps/api`) — this is frontend-only
- Retry logic, request cancellation, or request deduplication

## Decisions

1. **Axios over a wrapper around fetch**
   - Axios provides interceptors as a first-class feature, cleaner base URL config, and `withCredentials` support
   - A custom fetch wrapper would require us to re-implement interceptor-like logic
   - Axios is the most widely adopted HTTP client in the React ecosystem

2. **Request interceptor (not defaults) for content-type**
   - Using a request interceptor allows conditional logic (only set `Content-Type: application/json` for POST/PATCH/PUT)
   - Axios defaults are static and cannot differentiate by method

3. **File location: `src/lib/api-client.ts`**
   - Consistent with existing lib modules (`auth-client.ts`, `query-client.ts`)
   - Easy to discover and import from `@/lib/api-client`

4. **Minimal export: a single `api` instance**
   - No factory functions or configuration needed — the instance is ready to use
   - Callers import `api` and call `api.get()`, `api.post()`, `api.patch()` directly

## Risks / Trade-offs

- **Bundle size**: Axios adds ~13KB gzipped → Acceptable trade-off given the DX improvement and future extensibility (auth tokens, response transformation, etc.)
- **Learning curve**: Team must know axios API instead of fetch → Axios API is near-identical and well-documented
