## 1. API: Create and Update Todo Endpoints

- [ ] 1.1 Add `createTodo(name: string)` and `updateTodo(id: string, fields: Partial<Todo>)` methods to `TodoRepository`
- [ ] 1.2 Add `createTodo(name: string)` and `updateTodo(id: string, fields: Partial<Todo>)` methods to `TodoService`
- [ ] 1.3 Create `create-todo-handler.ts` with zod validation for `POST /todos`
- [ ] 1.4 Create `update-todo-handler.ts` with zod validation for `PATCH /todos/:id`
- [ ] 1.5 Register new handlers in `handlers/todo/index.ts` and routes in `todo-routes.ts`

## 2. Web: Install Dependencies and Add shadcn Components

- [ ] 2.1 Install `react-hook-form`, `@hookform/resolvers`, and `zod` in `apps/web`
- [ ] 2.2 Add shadcn/ui components: `input`, `table`, `dialog`, `label` via shadcn CLI

## 3. Web: API Client Hooks

- [ ] 3.1 Add `useTodos` hook using `@tanstack/react-query` `useQuery` to fetch `GET /todos`
- [ ] 3.2 Add `useCreateTodo` hook using `useMutation` for `POST /todos` with cache invalidation
- [ ] 3.3 Add `useUpdateTodo` hook using `useMutation` for `PATCH /todos/:id` with optimistic update

## 4. Web: Todo Table Dashboard

- [ ] 4.1 Create `TodoTable` component displaying todos in a shadcn Table (columns: Name, Actions) with empty state message and centered "Add Todo" button
- [ ] 4.2 Update `routes/index.tsx` to render `TodoTable` in the dashboard layout, keeping logout button and user greeting

## 5. Web: Todo Search

- [ ] 5.1 Add search input component above the todo table
- [ ] 5.2 Implement client-side filtering with case-insensitive substring matching on todo name

## 6. Web: Add Todo Modal

- [ ] 6.1 Create zod schema for todo name validation (non-empty string)
- [ ] 6.2 Create `AddTodoModal` component with react-hook-form form, shadcn Dialog, Input, and Label
- [ ] 6.3 Wire "Add Todo" button in top-right corner (and empty state center button) to open the modal

## 7. Web: Mark Todo as Done

- [ ] 7.1 Add "Done" button to each todo row in `TodoTable`
- [ ] 7.2 Wire "Done" button to `useUpdateTodo` mutation with optimistic update
- [ ] 7.3 Apply visual indicator (strikethrough or muted) for todos with status "done"
- [ ] 7.4 Disable or hide "Done" button when todo is already completed
