## Context

The project is a Turborepo monorepo with `apps/web` (React + TanStack Router + TanStack Query + shadcn/ui + Tailwind + Vite) and `apps/api` (Hono + Bun + MongoDB). There is currently no authentication at all — no login page, no session management, no route guards. The index route is a simple demo page.

The user wants Google OAuth login via Better Auth, a modern TypeScript-first authentication library that supports both server and client SDKs. Better Auth provides built-in Google provider support and integrates with Hono middleware.

## Goals / Non-Goals

**Goals:**
- Allow users to sign in with Google OAuth via Better Auth
- Protect routes: unauthenticated users are redirected to `/login`
- Provide a login page with Google sign-in button in a card with blur overlay
- Transform the index route `/` into a dashboard with a logout button
- Show error feedback via snackbar on authentication failure

**Non-Goals:**
- Other OAuth providers (GitHub, Twitter, etc.) — out of scope
- Email/password authentication — out of scope
- User registration/profile management UI — out of scope
- Role-based access control — out of scope
- Database migration or new MongoDB collections for users — Better Auth handles this

## Decisions

### 1. Better Auth over NextAuth/Auth.js or Clerk

**Decision**: Use Better Auth (`better-auth`).

**Rationale**:
- Better Auth is framework-agnostic and works with Hono (our API framework), while NextAuth/Auth.js is Next.js-centric
- Better Auth has first-class Hono middleware support
- It includes a client SDK for React with hooks (`useSession`, `signIn`, `signOut`)
- It handles database adapter automatically and supports MongoDB via its built-in adapters
- It's a single package rather than a multi-package ecosystem, reducing dependency overhead
- Clerk is a hosted service with vendor lock-in; Better Auth is self-hosted and open-source

### 2. Protected Routes via TanStack Router beforeLoad

**Decision**: Implement auth guard in the root route's `beforeLoad` using TanStack Router's built-in redirect mechanism.

**Rationale**:
- TanStack Router has first-class support for route guards via `beforeLoad`
- `beforeLoad` runs before the route component renders, preventing flash of protected content
- Uses `router.redirect` for server-style redirects, not client-side `window.location`
- Keeps auth logic colocated with routing

### 3. Snackbar/Toast via Sonner

**Decision**: Use `sonner` (by the shadcn/ui ecosystem) for toast/snackbar notifications on login errors.

**Rationale**:
- Sonner is the de facto toast library in the shadcn/ui ecosystem
- Lightweight, React-first, works well with TanStack Router
- Provides built-in error toast styling

### 4. Session Management on Client via Better Auth React Hooks

**Decision**: Use Better Auth's React client SDK for session state management.

**Rationale**:
- `useSession` hook provides reactive session state
- `signIn.social` handles the full OAuth redirect flow
- `signOut` handles session termination
- No need for custom React context — Better Auth client provides this

### 5. API Route Structure

**Decision**: Mount Better Auth handler at `/api/auth/*` on the Hono server, which Better Auth client will call.

**Rationale**:
- Better Auth expects a catch-all handler for its auth endpoints
- Hono's `app.all()` or `app.route()` can mount the Better Auth handler
- Works with the monorepo structure where web app proxies API requests

## Risks / Trade-offs

- **Better Auth is relatively new**: The library may have breaking changes or missing features → Mitigation: pin a specific version, review changelog before upgrades
- **Single OAuth provider**: Only Google is supported now, but Better Auth makes adding more providers trivial later
- **MongoDB dependency**: Better Auth stores sessions in the existing MongoDB; if MongoDB is down, auth fails → Mitigation: MongoDB is already a dependency of the app, no new infrastructure
