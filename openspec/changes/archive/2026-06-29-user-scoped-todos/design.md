## Context

The project is a Turborepo monorepo with `apps/web` (React + TanStack Router + TanStack Query + shadcn/ui + Tailwind + Vite) and `apps/api` (Hono + Bun + MongoDB). Google OAuth authentication is implemented via Better Auth with session management. Todos are stored in a MongoDB collection but currently have no user association — all authenticated users share the same global todo list.

Better Auth stores user sessions in MongoDB and provides `auth.api.getSession()` to retrieve session data from request headers. This can be used in Hono middleware to inject the authenticated user's ID into the request context.

## Goals / Non-Goals

**Goals:**
- Associate every todo document with the user who created it via a `userId` field
- Filter all todo API responses to only include the authenticated user's todos
- Block access to todos that belong to other users
- Scope frontend React Query caches per user so users never see each other's data
- Preserve existing UI and UX — the change should be transparent to the end user

**Non-Goals:**
- Multi-tenancy or team/shared todos — out of scope
- Admin view of all todos — out of scope
- Database migration script for existing data — existing todos will simply become orphaned (no userId) and invisible

## Decisions

### 1. Auth middleware on todo routes (not per-handler session check)

**Decision**: Add a dedicated Hono middleware (`authMiddleware`) on `/api/todos` routes that calls `auth.api.getSession(c.req.raw.headers)` and injects `userId` into `c.var`.

**Rationale**:
- Centralizes auth logic — all todo handlers get `userId` from context without duplicating session extraction code
- Fails fast — unauthenticated requests are rejected before reaching handlers
- Consistent with existing `injectionMiddleware` pattern for DI
- Makes it trivial to protect additional routes later

**Alternatives considered**:
- Per-handler `getSession()` call: More boilerplate, easier to forget, violates DRY
- Pass `auth` instance to handlers: Extra DI plumbing, creates coupling

### 2. userId as plain string from Better Auth session

**Decision**: Extract `userId` from `session.user.id` (Better Auth's user ID) and store it as a plain string in the todo document's `userId` field. No foreign key or MongoDB reference — just a simple indexable string.

**Rationale**:
- Better Auth creates users in its own `user` collection with generated IDs
- Using plain strings avoids cross-collection joins in MongoDB
- A simple index on `userId` is sufficient for query performance
- No need for Mongoose-style `ref` — we use the native MongoDB driver

### 3. userId passed through all layers (Handler → Service → Repository)

**Decision**: Add `userId: string` parameter to `TodoService.createTodo`, `TodoService.getTodos`, and `TodoRepository` methods. The repository filters/fills `userId` in all queries.

**Rationale**:
- Explicit parameter passing is transparent and type-safe
- No hidden context or thread-local state
- Easy to test each layer in isolation

**Alternatives considered**:
- AsyncLocalStorage / Node.js AsyncLocalStorage: Overengineered for a simple param, adds implicit coupling
- Storing userId in the repository instance: Repository is a singleton injected once; userId changes per-request

### 4. Frontend: per-user React Query keys

**Decision**: Use `['todos', userId]` as the React Query key instead of `['todos']`. Get `userId` from the Better Auth `useSession` hook.

**Rationale**:
- React Query caches are automatically key-scoped — changing user changes the cache
- No stale data from previous user sessions
- `useSession()` already provides the session data reactively

### 5. PATCH /todos/:id ownership validation

**Decision**: The update handler queries the todo first and compares `todo.userId` with the authenticated user's ID. Returns 404 (not 403) if the todo exists but belongs to another user — to avoid leaking existence info.

**Rationale**:
- 404 for unauthorized ownership prevents user enumeration (can't distinguish "doesn't exist" from "not yours")
- Consistent with REST best practices for resource ownership

## Risks / Trade-offs

- **Orphaned existing todos**: Todos created before this change have no `userId` and become invisible → Mitigation: manually clean up existing data or run a one-off migration script (documented in tasks)
- **Better Auth session dependency**: If session retrieval is slow, every todo request adds latency → Mitigation: Better Auth caches sessions; `getSession` is a lightweight DB lookup
- **No index on userId initially**: If user has many todos, queries could be slow → Mitigation: add MongoDB index on `userId` during implementation
