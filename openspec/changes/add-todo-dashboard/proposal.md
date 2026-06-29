## Why

The dashboard page (`/`) currently only shows a welcome message and logout button. Users need a functional todo management experience directly on the dashboard — the primary landing page after login — to manage their tasks efficiently with table view, search, add, and mark-done capabilities.

## What Changes

- Transform the dashboard index route (`/`) into a todo management page with a table listing all todos
- Add a search input to filter todos by name (client-side filtering)
- Add an "Add Todo" button in the top-right corner that opens a modal form
- Add a "Done" action button on each todo row to mark it as completed
- Create new API endpoints: `POST /todos` (create todo) and `PATCH /todos/:id` (update todo, e.g., mark as done)
- Add `search` query parameter support to existing `GET /todos` endpoint (optional server-side search)
- Install `react-hook-form` and `zod` dependencies in `apps/web` for form handling and validation
- Add shadcn/ui components: Input, Table, Dialog, and Label

## Capabilities

### New Capabilities

- `todo-table-dashboard`: Dashboard page (`/`) showing a table of todos with empty state ("no todo yet") when no data exists, and an "Add Todo" button in the top-right
- `todo-search`: Search input that filters the todo table by todo name (case-insensitive contains match) on the client side
- `todo-add-modal`: Modal dialog triggered by "Add Todo" button with a form field for todo name, validated with zod schema via react-hook-form, submitting to `POST /todos`
- `todo-mark-done`: "Done" action button on each todo row that sends a `PATCH /todos/:id` request to mark the todo as completed
- `todo-api-create-update`: Backend API endpoints for creating a todo (`POST /todos`) and updating a todo (`PATCH /todos/:id`) with name and status fields

### Modified Capabilities

<!-- No existing capabilities to modify -->

## Impact

- **apps/web**: New dependencies (`react-hook-form`, `zod`, `@hookform/resolvers`), modified route `routes/index.tsx`, new components for todo table, search, add modal, new UI components (Input, Table, Dialog, Label)
- **apps/api**: New handlers `create-todo-handler.ts` and `update-todo-handler.ts`, new routes in `todo-routes.ts`, updated `todo-service.ts` and `todo-repository.ts` with create/update methods
- **packages/shared-utils**: Potentially shared zod schemas for todo validation
