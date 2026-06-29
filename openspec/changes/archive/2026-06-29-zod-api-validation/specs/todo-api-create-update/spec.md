## MODIFIED Requirements

### Requirement: Create a new todo

The API SHALL provide a `POST /todos` endpoint that accepts a JSON body with a todo name and creates a new todo document in MongoDB. Input validation SHALL be performed by Zod schema middleware before the handler executes.

#### Scenario: Create todo successfully

- **WHEN** a `POST` request is sent to `/todos` with JSON body `{ "name": "Buy groceries" }`
- **THEN** the API creates a new todo document with `name: "Buy groceries"` and `status: "pending"` in MongoDB
- **AND** returns the created todo as JSON with status 201

#### Scenario: Create todo with empty name

- **WHEN** a `POST` request is sent to `/todos` with JSON body `{ "name": "" }`
- **THEN** the API returns a 400 error with a validation error message

#### Scenario: Create todo with missing name

- **WHEN** a `POST` request is sent to `/todos` with JSON body `{}`
- **THEN** the API returns a 400 error with a validation error message

### Requirement: Update a todo

The API SHALL provide a `PATCH /todos/:id` endpoint that accepts a JSON body with fields to update on an existing todo document. Input validation (body and route params) SHALL be performed by Zod schema middleware before the handler executes.

#### Scenario: Mark todo as done

- **WHEN** a `PATCH` request is sent to `/todos/:id` with JSON body `{ "status": "done" }`
- **THEN** the API updates the todo document's status to "done" in MongoDB
- **AND** returns the updated todo as JSON

#### Scenario: Update non-existent todo

- **WHEN** a `PATCH` request is sent to `/todos/:id` with a non-existent ID
- **THEN** the API returns a 404 error
