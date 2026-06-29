## Context

The application is a Turborepo monorepo with `apps/web` (React + TanStack Router + TanStack Query + shadcn/ui + Tailwind + Vite) and `apps/api` (Hono + Bun + MongoDB). The API already has `GET /todos` and `GET /todos/:id` endpoints backed by `TodoService` → `TodoRepository` → MongoDB. The dashboard page at `/` currently shows only a welcome message and logout button.

This design adds full CRUD support for todos and transforms the dashboard into a functional todo management page.

## Goals / Non-Goals

**Goals:**
- Show todos in a table on the dashboard page (`/`)
- Allow users to add new todos via a modal form
- Allow users to mark todos as done with an action button
- Allow users to search todos by name (client-side filtering)
- Add backend endpoints for creating and updating todos
- Use react-hook-form with zod for form validation
- Use shadcn/ui components for consistent UI

**Non-Goals:**
- Todo editing/renaming — out of scope
- Todo deletion — out of scope
- Pagination — out of scope (assume manageable todo list size)
- Sorting by columns — out of scope
- Real-time updates — out of scope

## Decisions

### 1. Client-side search over server-side search

**Decision**: Implement todo search as client-side filtering on the already-fetched list.

**Rationale**:
- Todo lists are expected to be small (not thousands of items), making client-side filtering fast and simple
- Avoids adding query parameter parsing and database query changes to the API for a first iteration
- TanStack Query already caches the todo list; filtering is a derived view
- If performance becomes an issue later, server-side search can be added as an enhancement

### 2. Modal with react-hook-form + zod

**Decision**: Use react-hook-form with `@hookform/resolvers` for zod schema integration inside a shadcn/ui Dialog component.

**Rationale**:
- react-hook-form is the most popular React form library — lightweight, performant (uncontrolled inputs), and has first-class zod integration
- zod provides type-safe schema validation that works seamlessly with TypeScript
- shadcn/ui Dialog provides a clean, accessible modal component consistent with the design system
- Keeps form state local to the modal — no need for global form state

### 3. "Done" action via optimistic update

**Decision**: When the user clicks "Done" on a todo, use TanStack Query's `useMutation` with optimistic update to immediately reflect the change in the UI, then sync with the server.

**Rationale**:
- Optimistic updates provide instant feedback, avoiding the feel of latency
- TanStack Query handles rollback automatically if the server request fails
- The API returns the updated todo, so the cache stays consistent

### 4. shadcn/ui Table over custom table

**Decision**: Use shadcn/ui's Table component (based on native `<table>`) for the todo list display.

**Rationale**:
- Consistent with the existing shadcn/ui design system already used in the project
- Provides proper accessibility (semantic HTML table)
- Already styled with Tailwind, no additional CSS needed
- Simple to compose with other shadcn components (Button, Badge for status)

### 5. Backend: extend existing TodoService/TodoRepository pattern

**Decision**: Add `createTodo` and `updateTodo` methods to the existing `TodoService` and `TodoRepository` classes rather than creating new services.

**Rationale**:
- Follows the established service/repository pattern already in the codebase
- Keeps all todo-related logic colocated for maintainability
- No need for a new abstraction layer for two simple operations
- MongoDB collection injection is already wired up in the DI middleware

### 6. No shared validation schemas (for now)

**Decision**: Define zod schemas in the API for request validation and in the web app for form validation independently.

**Rationale**:
- The `packages/shared-utils` package is minimal and adding zod as a dependency there couples both apps unnecessarily
- The API validates server-side for security (never trust the client)
- The web app validates client-side for UX (immediate feedback)
- If schemas diverge significantly, a shared package can be introduced later

## Risks / Trade-offs

- **Client-side search doesn't scale**: If a user has thousands of todos, filtering on the client could become slow → Mitigation: add server-side search query param to `GET /todos` if needed; the API change is minimal
- **No optimistic add**: New todos wait for the server response before appearing in the list → Mitigation: acceptable for low-latency local dev; can add optimistic create later
- **MongoDB schema**: Assumes a `Todo` document with `name: string` and `status: "pending" | "done"` fields. If the existing collection has a different shape, migration is needed → Mitigation: check existing schema; MongoDB is schemaless so adding fields is non-breaking
