## Why

Currently todos are stored globally without user association, meaning all logged-in users see and share the same todo list. Every user who adds a todo sees it mixed with todos from other users. The application already has Google OAuth authentication via Better Auth, so user identity is available — but it is not being used to scope todos.

## What Changes

- Add a `userId` field to the Todo MongoDB documents to associate each todo with its owner
- Add an auth middleware on todo API routes to extract the current user's session and inject the `userId` into the request context
- **BREAKING**: `GET /todos` no longer returns all todos — it returns only the authenticated user's todos
- **BREAKING**: `POST /todos` now requires an authenticated session and stores the `userId` with the todo
- **BREAKING**: `PATCH /todos/:id` now validates that the todo belongs to the authenticated user before updating
- Update the frontend React Query keys to be user-scoped (e.g., `['todos', userId]`) so each user fetches only their own todos

## Capabilities

### New Capabilities

- `todo-user-scoping`: Backend scoping — associate todo documents with the authenticated user via `userId`, filter all queries by user, and validate ownership on mutations

### Modified Capabilities

- `todo-api-create-update`: `POST /todos` now requires authentication and stores `userId`; `PATCH /todos/:id` now validates user ownership
- `todo-mark-done`: Mark-done flow now validates that the todo belongs to the authenticated user
- `todo-search`: The search results are naturally user-scoped since the API only returns the user's own todos
- `todo-add-modal`: The add todo modal flow remains the same from the user's perspective, but the underlying API call now includes the user's session
- `todo-table-dashboard`: The dashboard now displays only the authenticated user's own todos instead of all todos

## Impact

- **apps/api**: Modified todo handlers (`create-todo-handler`, `update-todo-handler`, `get-todos-handler`), modified `TodoRepository` and `TodoService` to accept and filter by `userId`, new auth middleware on `/api/todos` routes, updated `ApiEnv` typing
- **apps/web**: Modified React Query keys in `useTodos` and `useCreateTodo` hooks to include user ID, modified `useUpdateTodo` to use user-scoped query keys
- **Database**: Existing todo documents without `userId` will not be visible to any authenticated user; a migration or cleanup may be needed
