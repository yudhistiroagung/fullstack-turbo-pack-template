# shared-todo-schema

## Purpose

Define the canonical Todo data model using Zod schemas in a shared `@repo/shared-models` package, providing a single source of truth for both API and web consumers, with runtime validation at boundary layers and DTO conversion for JSON transport.

## Requirements

### Requirement: Shared Todo Zod schema
The system SHALL provide a Zod schema (`Todo`) in the `@repo/shared-models` package that defines the canonical shape of a Todo document, and export a derived TypeScript type (`Todo`) inferred from that schema via `z.infer`.

#### Scenario: Schema defines required fields
- **WHEN** a consumer inspects `Todo`
- **THEN** it SHALL validate that `_id` is a non-empty string, `name` is a non-empty string, and `status` is one of `"pending"` or `"done"`

#### Scenario: Schema allows optional fields
- **WHEN** a consumer inspects `Todo`
- **THEN** it SHALL accept optional fields `userId` (string), `createdAt` (Date), and `updatedAt` (Date) without making them required

#### Scenario: Derived type is exported
- **WHEN** a consumer imports `type { Todo }` from `@repo/shared-models`
- **THEN** they SHALL receive a TypeScript type inferred from `Todo` via `z.infer`

### Requirement: API repository parses MongoDB documents with Todo
The API repository layer SHALL parse every MongoDB document returned from `find()` and `findOne()` through `Todo.parse()` before returning it to the service/handler layer.

#### Scenario: Repository returns a todo by ID
- **WHEN** `TodoRepository.getTodoById(id)` is called
- **THEN** the returned value SHALL be the result of `Todo.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository returns a list of todos
- **WHEN** `TodoRepository.getTodos(userId)` is called
- **THEN** each document in the returned array SHALL be the result of `Todo.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository creates a todo
- **WHEN** `TodoRepository.createTodo(name, userId)` is called
- **THEN** the returned value SHALL be the result of `Todo.parse(document)` where `document._id` is converted from `ObjectId` to string

#### Scenario: Repository updates a todo
- **WHEN** `TodoRepository.updateTodo(id, fields, userId)` is called
- **THEN** the returned value SHALL be the result of `Todo.parse(document)` where `document._id` is converted from `ObjectId` to string

### Requirement: Web fetch layer parses API responses with TodoDTO
The web application's fetch functions SHALL parse API response bodies through `TodoDTO.parse()` (or `z.array(TodoDTO).parse()` for arrays) and convert to internal `Todo` type using `fromTodoDTO()` before returning them to React Query hooks.

#### Scenario: Fetch todos list
- **WHEN** `fetchTodos()` receives a successful API response from `GET /api/todos`
- **THEN** it SHALL parse `data.todos` through `z.array(TodoDTO).parse()` and map through `fromTodoDTO()` to return typed `Todo[]`

#### Scenario: Fetch single todo
- **WHEN** a fetch function receives a successful API response from `POST /api/todos` or `PATCH /todos/:id`
- **THEN** it SHALL parse the response body through `TodoDTO.parse()` and convert via `fromTodoDTO()` to return typed `Todo`

### Requirement: Todo type import source is unified
All consumers of the `Todo` type across both `apps/api` and `apps/web` SHALL import it from `@repo/shared-models` instead of from local files.

#### Scenario: Web hooks import Todo
- **WHEN** a web hook file needs the `Todo` type
- **THEN** it SHALL import `type { Todo }` from `@repo/shared-models`

#### Scenario: API handler imports Todo
- **WHEN** an API handler or service file needs the `Todo` type
- **THEN** it SHALL import `type { Todo }` from `@repo/shared-models`

### Requirement: DTO conversion for JSON transport
The shared models package SHALL provide `TodoDTO` (string-based dates) and bidirectional mappers `toTodoDTO()` / `fromTodoDTO()` to convert between internal `Todo` (Date fields) and transport `TodoDTO` (ISO string fields).

#### Scenario: Backend converts to DTO before response
- **WHEN** the API returns a `Todo` to the client
- **THEN** it MAY use `toTodoDTO()` to convert Date fields to ISO strings before JSON serialization

#### Scenario: Frontend converts from DTO after response
- **WHEN** the web app receives a `TodoDTO` from the API
- **THEN** it SHALL use `fromTodoDTO()` to convert ISO strings back to Date objects and validate via `Todo.parse()`
