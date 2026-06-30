## ADDED Requirements

### Requirement: Shared Todo Zod schema
The system SHALL provide a Zod schema (`TodoSchema`) in the `@repo/shared-models` package that defines the canonical shape of a Todo document, and export a derived TypeScript type (`Todo`) inferred from that schema.

#### Scenario: Schema defines required fields
- **WHEN** a consumer inspects `TodoSchema`
- **THEN** it SHALL validate that `_id` is a non-empty string, `name` is a non-empty string, and `status` is one of `"pending"` or `"done"`

#### Scenario: Schema allows optional fields
- **WHEN** a consumer inspects `TodoSchema`
- **THEN** it SHALL accept optional fields `userId` (string), `createdAt` (string), and `updatedAt` (string) without making them required

#### Scenario: Derived type is exported
- **WHEN** a consumer imports `type { Todo }` from `@repo/shared-models`
- **THEN** they SHALL receive a TypeScript type inferred from `TodoSchema` via `z.infer`

### Requirement: API repository parses MongoDB documents with TodoSchema
The API repository layer SHALL parse every MongoDB document returned from `find()` and `findOne()` through `TodoSchema.parse()` before returning it to the service/handler layer.

#### Scenario: Repository returns a todo by ID
- **WHEN** `TodoRepository.getTodoById(id)` is called
- **THEN** the returned value SHALL be the result of `TodoSchema.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository returns a list of todos
- **WHEN** `TodoRepository.getTodos(userId)` is called
- **THEN** each document in the returned array SHALL be the result of `TodoSchema.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository creates a todo
- **WHEN** `TodoRepository.createTodo(name, userId)` is called
- **THEN** the returned value SHALL be the result of `TodoSchema.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository updates a todo
- **WHEN** `TodoRepository.updateTodo(id, fields, userId)` is called
- **THEN** the returned value SHALL be the result of `TodoSchema.parse(document)` where `document._id` is converted from `ObjectId` to string

### Requirement: Web fetch layer parses API responses with TodoSchema
The web application's fetch functions SHALL parse API response bodies through `TodoSchema.parse()` (or `TodoSchema.array().parse()` for arrays) before returning them to React Query hooks.

#### Scenario: Fetch todos list
- **WHEN** `fetchTodos()` receives a successful API response from `GET /api/todos`
- **THEN** it SHALL parse `data.todos` through `z.array(TodoSchema).parse()` and return the typed result

#### Scenario: Fetch single todo
- **WHEN** a fetch function receives a successful API response from `POST /api/todos` or `PATCH /todos/:id`
- **THEN** it SHALL parse the response body through `TodoSchema.parse()` and return the typed result

### Requirement: Todo type import source is unified
All consumers of the `Todo` type across both `apps/api` and `apps/web` SHALL import it from `@repo/shared-models` instead of from local files.

#### Scenario: Web hooks import Todo
- **WHEN** a web hook file needs the `Todo` type
- **THEN** it SHALL import `type { Todo }` from `@repo/shared-models`

#### Scenario: API handler imports Todo
- **WHEN** an API handler or service file needs the `Todo` type
- **THEN** it SHALL import `type { Todo }` from `@repo/shared-models`
