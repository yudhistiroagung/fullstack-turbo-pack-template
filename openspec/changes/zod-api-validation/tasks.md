## 1. Setup

- [x] 1.1 Install `@hono/zod-validator` package and verify compatibility with existing `zod@^4.4.3`

## 2. Refactor GET /todos handler

- [x] 2.1 Add Zod schema for query params (empty schema for now, future-proofing) to `get-todos-handler.ts`
- [x] 2.2 Remove manual `if (!userId)` check — auth middleware already handles this
- [x] 2.3 Export schema for use in route definition

## 3. Refactor GET /todos/:id handler

- [x] 3.1 Add Zod schema for route param `id` (non-empty string) to `get-todo-by-id-handler.ts`
- [x] 3.2 Remove manual `if (!id)` check — replaced by Zod validation
- [x] 3.3 Export schema for use in route definition

## 4. Refactor POST /todos handler

- [x] 4.1 Move `createTodoSchema` usage from inline `safeParse` to `zValidator('json')` middleware
- [x] 4.2 Replace `c.req.json()` + `safeParse` with `c.req.valid('json')` to get validated data
- [x] 4.3 Remove manual `if (!userId)` check — auth middleware already handles this
- [x] 4.4 Export schema for use in route definition

## 5. Refactor PATCH /todos/:id handler

- [x] 5.1 Add Zod schema for route param `id` (non-empty string) alongside existing body schema
- [x] 5.2 Move body validation from inline `safeParse` to `zValidator('json')` middleware
- [x] 5.3 Replace `c.req.json()` + `safeParse` + `Object.keys(result.data).length === 0` check with `c.req.valid('json')` — Zod handles empty optional objects gracefully; the handler checks if at least one field is present
- [x] 5.4 Remove manual `if (!userId)` and `if (!id)` checks — replaced by middleware
- [x] 5.5 Export schemas for use in route definition

## 6. Update route definitions

- [x] 6.1 Apply `zValidator` middleware to GET /todos route with query schema
- [x] 6.2 Apply `zValidator` middleware to GET /todos/:id route with param schema
- [x] 6.3 Apply `zValidator` middleware to POST /todos route with body schema
- [x] 6.4 Apply `zValidator` middleware to PATCH /todos/:id route with param + body schemas

## 7. Verification

- [x] 7.1 Test POST /todos with valid body returns 201
- [x] 7.2 Test POST /todos with empty name returns 400 with validation error
- [x] 7.3 Test POST /todos with missing name returns 400 with validation error
- [x] 7.4 Test PATCH /todos/:id with valid body returns updated todo
- [x] 7.5 Test PATCH /todos/:id with non-existent ID returns 404
- [x] 7.6 Test GET /todos returns todos for authenticated user
- [x] 7.7 Test GET /todos/:id with valid id returns todo
