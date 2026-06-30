## Why

Every API call across hooks repeats the same boilerplate: `credentials: 'include'`, `headers: { 'Content-Type': 'application/json' }`, and `${config.apiUrl}` base URL. This duplication makes it easy to forget a header or credential, and any global change (e.g., adding an auth token header) would require touching every hook file individually.

## What Changes

- Install `axios` as a dependency in `@repo/web`
- Create a shared axios instance (`@/lib/api-client.ts`) with interceptors that automatically:
  - Prepends `config.apiUrl` as `baseURL`
  - Sets `withCredentials: true`
  - Sets `Content-Type: application/json` for POST/PATCH/PUT requests
- Replace all raw `fetch` calls in `useTodos`, `useCreateTodo`, and `useUpdateTodo` hooks with the shared axios instance
- **No breaking changes** — the hook APIs and response handling remain identical

## Capabilities

### New Capabilities

- `api-client`: Centralized axios instance with request interceptors that auto-apply base URL, credentials, and content-type headers to all outgoing API requests

### Modified Capabilities

<!-- None — existing specs define behavior/contracts, not the HTTP client implementation -->

## Impact

- **Dependencies**: Adds `axios` to `apps/web/package.json`
- **Affected files**:
  - `apps/web/src/lib/api-client.ts` (new)
  - `apps/web/src/hooks/useTodos.ts`
  - `apps/web/src/hooks/useCreateTodo.ts`
  - `apps/web/src/hooks/useUpdateTodo.ts`
