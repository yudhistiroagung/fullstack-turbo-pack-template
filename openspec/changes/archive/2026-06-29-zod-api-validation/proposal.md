## Why

API handlers currently mix manual `if` checks for route params and ad-hoc Zod `safeParse` calls for request bodies, creating inconsistent validation patterns across the codebase. Some handlers validate with `if`, others use Zod inline, and query params are not validated at all. This leads to duplicated logic and harder-to-maintain handlers.

## What Changes

- Add `@hono/zod-validator` middleware package to the API dependencies
- Replace inline `safeParse` + if-check patterns with `zValidator` middleware in all todo route handlers
- Add Zod schema validation for route params (`:id`) in `get-todo-by-id-handler` and `update-todo-handler`
- Add Zod schema validation for query params in `get-todo-handler` (future-proofing for pagination/filtering)
- Remove manual `if (!userId)`, `if (!id)`, `if (!result.success)` checks — validation errors handled by middleware
- Keep ownership check logic (`existing.userId !== userId`) separate from validation, as it's business logic not input validation

## Capabilities

### New Capabilities

- `zod-api-validation`: Consistent Zod-based input validation across all API endpoints using Hono's `zValidator` middleware for request body, query params, and route params

### Modified Capabilities

- `todo-api-create-update`: Validation logic in create/update handlers moves from inline `safeParse` to `zValidator` middleware; behavior (error responses, status codes) remains the same

## Impact

- **Code**: All todo handler files (`create-todo-handler.ts`, `update-todo-handler.ts`, `get-todo-by-id-handler.ts`, `get-todos-handler.ts`), todo routes file
- **Dependencies**: New dependency `@hono/zod-validator` (or use `hono`'s built-in `validator` + manual Zod integration)
- **Breaking**: None — response shapes and status codes preserved
