# Todo User Scoping

## Purpose
TBD

## Requirements

### Requirement: Todo documents include userId
Every todo document in the MongoDB `todos` collection SHALL include a `userId` field containing the Better Auth user ID of the todo's owner. The `userId` field SHALL be stored as a string.

#### Scenario: Create todo with userId
- **WHEN** an authenticated user creates a todo via `POST /todos`
- **THEN** the resulting document SHALL contain a `userId` field with the authenticated user's Better Auth ID

### Requirement: GET /todos filters by authenticated user
The `GET /todos` endpoint SHALL return only the todos belonging to the authenticated user, identified by their Better Auth session. Unauthenticated requests SHALL be rejected with 401.

#### Scenario: Authenticated user fetches their todos
- **WHEN** an authenticated user sends a `GET /todos` request
- **THEN** the API returns only the todo documents where `userId` matches the authenticated user's ID

#### Scenario: Unauthenticated request to GET /todos
- **WHEN** a request to `GET /todos` is made without a valid session
- **THEN** the API returns a 401 Unauthorized response

### Requirement: Auth middleware protects todo routes
All `/api/todos` routes SHALL be protected by an authentication middleware that validates the Better Auth session, extracts the `userId`, and injects it into the Hono context. Routes not requiring authentication SHALL be explicitly excluded.

#### Scenario: Valid session on todo route
- **WHEN** a request with a valid Better Auth session cookie is sent to any `/api/todos` route
- **THEN** the middleware extracts the `userId` and makes it available via `c.var.userId`

#### Scenario: Invalid or missing session on todo route
- **WHEN** a request without a valid session is sent to any `/api/todos` route
- **THEN** the middleware returns a 401 Unauthorized response before the handler executes

### Requirement: MongoDB index on userId
The `todos` MongoDB collection SHALL have an index on the `userId` field to ensure query performance when filtering by user.

#### Scenario: Query performance with many todos per user
- **WHEN** a user has a large number of todos
- **THEN** `GET /todos` queries filtered by `userId` SHALL use the index for efficient retrieval
