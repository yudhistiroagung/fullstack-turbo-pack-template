# Todo API Create and Update

## Purpose

Backend API endpoints for creating a new todo via `POST /todos` and updating an existing todo via `PATCH /todos/:id`.

## Requirements

### Requirement: Create a new todo

The API SHALL provide a `POST /todos` endpoint that accepts a JSON body with a todo name and creates a new todo document in MongoDB, associated with the authenticated user. This endpoint REQUIRES a valid Better Auth session. Input validation SHALL be performed by Zod schema middleware before the handler executes.

#### Scenario: Create todo successfully

- **WHEN** an authenticated user sends a `POST` request to `/todos` with JSON body `{ "name": "Buy groceries" }`
- **THEN** the API creates a new todo document with `name: "Buy groceries"`, `status: "pending"`, and `userId` set to the authenticated user's ID in MongoDB
- **AND** returns the created todo as JSON with status 201

#### Scenario: Create todo without authentication

- **WHEN** a `POST` request is sent to `/todos` without a valid session
- **THEN** the API returns a 401 Unauthorized response

#### Scenario: Create todo with empty name

- **WHEN** an authenticated user sends a `POST` request to `/todos` with JSON body `{ "name": "" }`
- **THEN** the API returns a 400 error with a validation error message

#### Scenario: Create todo with missing name

- **WHEN** an authenticated user sends a `POST` request to `/todos` with JSON body `{}`
- **THEN** the API returns a 400 error with a validation error message

### Requirement: Update a todo

The API SHALL provide a `PATCH /todos/:id` endpoint that accepts a JSON body with fields to update on an existing todo document. The todo MUST belong to the authenticated user. This endpoint REQUIRES a valid Better Auth session. Input validation (body and route params) SHALL be performed by Zod schema middleware before the handler executes.

#### Scenario: Mark todo as done

- **WHEN** an authenticated user sends a `PATCH` request to `/todos/:id` with JSON body `{ "status": "done" }` for a todo they own
- **THEN** the API updates the todo document's status to "done" in MongoDB
- **AND** returns the updated todo as JSON

#### Scenario: Update todo belonging to another user

- **WHEN** an authenticated user sends a `PATCH` request to `/todos/:id` for a todo owned by a different user
- **THEN** the API returns a 404 Not Found response (without revealing the todo's existence)

#### Scenario: Update non-existent todo

- **WHEN** an authenticated user sends a `PATCH` request to `/todos/:id` with a non-existent ID
- **THEN** the API returns a 404 error

#### Scenario: Update todo without authentication

- **WHEN** a `PATCH` request is sent to `/todos/:id` without a valid session
- **THEN** the API returns a 401 Unauthorized response
