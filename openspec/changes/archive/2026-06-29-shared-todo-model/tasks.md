## 1. Create shared-models package

- [x] 1.1 Create directory `packages/shared-models/src/` with `package.json` set to `"name": "@repo/shared-models"`, `"main": "./src/index.ts"`, `"private": true`, with `zod@^4` as dependency
- [x] 1.2 Add `tsconfig.json` to `packages/shared-models/` extending the repo's base TypeScript config
- [x] 1.3 Add `"@repo/shared-models": "workspace:*"` to `apps/api/package.json` and `apps/web/package.json` under `dependencies`
- [x] 1.4 Update `turbo.json` pipeline so `@repo/shared-models#build` completes before `apps/api#build` and `apps/web#build`
- [x] 1.5 Run `pnpm install` from repo root to link workspace dependency

## 2. Define Todo Zod schema and types

- [x] 2.1 Create `packages/shared-models/src/todo-schema.ts` with `TodoSchema` Zod object: `_id` (z.string().min(1)), `name` (z.string().min(1)), `status` (z.enum(["pending", "done"])), `userId` (z.string().optional()), `createdAt` (z.string().optional()), `updatedAt` (z.string().optional())
- [x] 2.2 Export `type Todo = z.infer<typeof TodoSchema>` from the same file
- [x] 2.3 Export `TodoSchema` and `Todo` from `packages/shared-models/src/index.ts`

## 3. API: Parse in repository layer

- [x] 3.1 Import `TodoSchema` and `Todo` in `apps/api/src/repositories/todo-repository.ts`
- [x] 3.2 Add a private helper `parseDoc(doc)` that converts `_id` from ObjectId to string, then returns `TodoSchema.parse(doc)`
- [x] 3.3 Wrap return values of `getTodos()`, `getTodoById()`, `createTodo()`, `updateTodo()` with `parseDoc()`
- [x] 3.4 Update return types of all repository methods to `Promise<Todo>` / `Promise<Todo[]>` using the shared `Todo` type

## 4. Web: Parse in fetch layer

- [x] 4.1 Import `TodoSchema` and `Todo` from `@repo/shared-models` in `apps/web/src/hooks/useTodos.ts`
- [x] 4.2 In `fetchTodos()`, parse `data.todos` through `z.array(TodoSchema).parse()`
- [x] 4.3 In `apps/web/src/hooks/useCreateTodo.ts`, parse the response JSON through `TodoSchema.parse()`
- [x] 4.4 In `apps/web/src/hooks/useUpdateTodo.ts`, parse the response JSON through `TodoSchema.parse()`

## 5. Unify Todo imports

- [x] 5.1 Remove the inline `export interface Todo { ... }` from `apps/web/src/hooks/useTodos.ts`
- [x] 5.2 Update `useCreateTodo.ts` import: change `import type { Todo } from './useTodos'` to `import type { Todo } from '@repo/shared-models'`
- [x] 5.3 Update `useUpdateTodo.ts` import: change `import type { Todo } from './useTodos'` to `import type { Todo } from '@repo/shared-models'`
- [x] 5.4 Update `TodoTable.tsx` if it imports `Todo` type directly — use `@repo/shared-models`
- [x] 5.5 Check `apps/api/src/services/todo-service.ts` and `apps/api/src/handlers/todo/` for any inline `Todo` type or `any` return types — update to use shared `Todo`

## 6. Verification

- [x] 6.1 Run `pnpm install` and verify no import errors
- [x] 6.2 Run TypeScript check on both apps: `pnpm --filter apps/api typecheck` and `pnpm --filter apps/web typecheck`
- [ ] 6.3 Manual test: create a todo, verify it appears in table, mark as done, verify update — no regression
