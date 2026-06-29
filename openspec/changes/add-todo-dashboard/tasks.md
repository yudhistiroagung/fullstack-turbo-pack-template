## 1. API: Create and Update Todo Endpoints

- [x] 1.1 Add `createTodo(name: string)` and `updateTodo(id: string, fields: Partial<Todo>)` methods to `TodoRepository`
- [x] 1.2 Add `createTodo(name: string)` and `updateTodo(id: string, fields: Partial<Todo>)` methods to `TodoService`
- [x] 1.3 Create `create-todo-handler.ts` with zod validation for `POST /todos`
- [x] 1.4 Create `update-todo-handler.ts` with zod validation for `PATCH /todos/:id`
- [x] 1.5 Register new handlers in `handlers/todo/index.ts` and routes in `todo-routes.ts`

## 2. Web: Install Dependencies and Add shadcn Components

- [x] 2.1 Install `react-hook-form`, `@hookform/resolvers`, and `zod` in `apps/web`
- [x] 2.2 Add shadcn/ui components: `input`, `table`, `dialog`, `label` via shadcn CLI

## 3. Web: API Client Hooks

- [x] 3.1 Add `useTodos` hook using `@tanstack/react-query` `useQuery` to fetch `GET /todos`
- [x] 3.2 Add `useCreateTodo` hook using `useMutation` for `POST /todos` with cache invalidation
- [x] 3.3 Add `useUpdateTodo` hook using `useMutation` for `PATCH /todos/:id` with optimistic update

## 4. Web: Todo Table Dashboard

- [x] 4.1 Create `TodoTable` component displaying todos in a shadcn Table (columns: Name, Actions) with empty state message and centered "Add Todo" button
- [x] 4.2 Update `routes/index.tsx` to render `TodoTable` in the dashboard layout, keeping logout button and user greeting

## 5. Web: Todo Search

- [x] 5.1 Add search input component above the todo table
- [x] 5.2 Implement client-side filtering with case-insensitive substring matching on todo name

## 6. Web: Add Todo Modal

- [x] 6.1 Create zod schema for todo name validation (non-empty string)
- [x] 6.2 Create `AddTodoModal` component with react-hook-form form, shadcn Dialog, Input, and Label
- [x] 6.3 Wire "Add Todo" button in top-right corner (and empty state center button) to open the modal

## 7. Web: Mark Todo as Done

- [x] 7.1 Add "Done" button to each todo row in `TodoTable`
- [x] 7.2 Wire "Done" button to `useUpdateTodo` mutation with optimistic update
- [x] 7.3 Apply visual indicator (strikethrough or muted) for todos with status "done"
- [x] 7.4 Disable or hide "Done" button when todo is already completed
