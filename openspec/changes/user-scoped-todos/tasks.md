## 1. API: Auth Middleware for Todo Routes

- [x] 1.1 Add `userId` to `ApiEnv` Variables type in `apps/api/src/types.ts`
- [x] 1.2 Create `authMiddleware` that extracts Better Auth session from request headers via `auth.api.getSession()` and sets `c.var.userId`
- [x] 1.3 Export the `auth` instance from `auth-middleware.ts` so the auth middleware can reference it (or pass it via Hono context)
- [x] 1.4 Apply `authMiddleware` to the `/api/todos` route group so all todo endpoints require authentication

## 2. API: Repository and Service Layer

- [x] 2.1 Update `TodoRepository.getTodos()` to accept `userId: string` parameter and filter by `{ userId }`
- [x] 2.2 Update `TodoRepository.createTodo()` to accept `userId: string` parameter and include it in the inserted document
- [x] 2.3 Update `TodoService.getTodos()` to pass `userId` through to the repository
- [x] 2.4 Update `TodoService.createTodo()` to pass `userId` through to the repository
- [x] 2.5 Add MongoDB index on `userId` field in the `todos` collection

## 3. API: Handler Updates

- [x] 3.1 Update `getTodoHandler` to read `userId` from context and pass it to `todoService.getTodos(userId)`
- [x] 3.2 Update `createTodoHandler` to read `userId` from context and pass it to `todoService.createTodo(name, userId)`
- [x] 3.3 Update `updateTodoHandler` to read `userId` from context and inject into `updateTodo` filter to validate ownership (return 404 if todo doesn't belong to user)

## 4. Web: Frontend Hooks and Components

- [x] 4.1 Update `useTodos` hook to accept `userId` and use `['todos', userId]` as query key; read `userId` from Better Auth `useSession()`
- [x] 4.2 Update `useCreateTodo` hook to invalidate `['todos', userId]` instead of `['todos']`
- [x] 4.3 Update `useUpdateTodo` hook to use user-scoped query keys in optimistic updates and invalidation
- [x] 4.4 Verify `TodoTable` component works correctly with user-scoped data (no changes expected, but verify)

## 5. Testing and Cleanup

- [ ] 5.1 Test: Login as User A, create todos, verify only User A sees them
- [ ] 5.2 Test: Login as User B, verify User B sees their own todos and not User A's
- [ ] 5.3 Test: User B tries to PATCH User A's todo ID, verify 404 is returned
- [ ] 5.4 Clean up any existing un-scoped todo data as needed
