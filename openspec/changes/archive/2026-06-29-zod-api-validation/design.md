## Context

The API currently has inconsistent validation patterns:
- `create-todo-handler.ts` uses Zod `safeParse` inline for body validation, plus manual `if (!userId)` check
- `update-todo-handler.ts` uses Zod `safeParse` inline for body validation, plus manual `if (!id)`, `if (!userId)`, and `if (Object.keys(result.data).length === 0)` checks
- `get-todo-by-id-handler.ts` uses manual `if (!id)` for route param validation
- `get-todos-handler.ts` has no validation

The project already has Zod (`zod@^4.4.3`) and Hono (`hono@^4.7.4`) as dependencies. Hono provides a `validator` middleware and the `@hono/zod-validator` package provides a clean Zod integration.

## Goals / Non-Goals

**Goals:**
- Replace all inline validation logic (`safeParse` + if-checks, manual `if (!x)` checks) with declarative Zod schemas
- Validate request body, query params, and route params consistently across all handlers
- Use `@hono/zod-validator`'s `zValidator` middleware at the route layer so validation runs before the handler
- Preserve exact error response shapes (400 with `{ error: "message" }`) and status codes

**Non-Goals:**
- Changing business logic (ownership checks, service calls)
- Changing the auth middleware
- Adding pagination/filtering features (only the validation infra)
- Refactoring unrelated parts of the codebase

## Decisions

### Decision 1: Use `@hono/zod-validator` over manual Zod integration

**Choice:** `@hono/zod-validator` package  
**Rationale:** Provides `zValidator()` which integrates with Hono's middleware pipeline, handles error formatting, and is the official Hono ecosystem package.  
**Alternative considered:** Using Hono's built-in `validator()` with manual `ZodSchema.parse()` — more boilerplate and less idiomatic for Zod users.

### Decision 2: Apply `zValidator` at the route definition layer

**Choice:** Attach `zValidator` middleware per-route in `todo-routes.ts`  
**Rationale:** Separates validation concerns from handler logic. Handlers receive already-validated data via `c.req.valid('json')`, `c.req.valid('param')`, `c.req.valid('query')`. Routes define *what* to validate, handlers contain *business logic*.  
**Alternative considered:** Inlining Zod schemas inside handlers — keeps everything in one file but loses the clean separation and middleware pipeline benefits.

### Decision 3: Schema files co-located with handlers

**Choice:** Keep Zod schemas in the same file as handlers (exported for route usage)  
**Rationale:** Handlers are small and focused per domain (todos). Extracting to a separate `schemas/` directory adds indirection without clear benefit at this scale. If the codebase grows, schemas can be extracted later.

### Decision 4: Keep ownership check in the handler, not in validation

**Choice:** Ownership check (`existing.userId !== userId`) stays in the handler as business logic  
**Rationale:** This involves a database lookup and is a business rule, not input validation. Zod validates shape/format of input data only.

## Risks / Trade-offs

- **Risk:** `@hono/zod-validator` might not support Zod v4 (the project currently uses `zod@^4.4.3`). → **Mitigation:** Check compatibility; if not compatible, use Hono's built-in `validator()` middleware with manual `z.parse()` instead. Zod v4's API is backward-compatible for `parse`/`safeParse`.
- **Risk:** Changing validation pattern could introduce subtle behavior differences in error responses. → **Mitigation:** Test all error scenarios explicitly to ensure same status codes and response shapes.
- **Trade-off:** Duplicate `userId` check is removed from handlers since auth middleware already sets user on context. If the auth middleware ever fails silently, handlers won't catch it. → **Mitigation:** Auth middleware already returns 401 if no valid session; this is a trusted boundary.
