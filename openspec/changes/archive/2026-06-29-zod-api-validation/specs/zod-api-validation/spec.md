## ADDED Requirements

### Requirement: All API inputs validated with Zod schemas

The API SHALL validate all request inputs (body, query params, route params) using Zod schemas applied via middleware, before reaching the handler function.

#### Scenario: Invalid body returns 400

- **WHEN** a request is sent to an endpoint with a body that fails Zod validation
- **THEN** the API returns a 400 status with `{ "error": "<validation message>" }`

#### Scenario: Invalid query param returns 400

- **WHEN** a request is sent to an endpoint with query parameters that fail Zod validation
- **THEN** the API returns a 400 status with `{ "error": "<validation message>" }`

#### Scenario: Invalid route param returns 400

- **WHEN** a request is sent to an endpoint with a route parameter that fails Zod validation
- **THEN** the API returns a 400 status with `{ "error": "<validation message>" }`

#### Scenario: Valid inputs reach handler

- **WHEN** a request is sent with all inputs passing Zod validation
- **THEN** the handler receives the validated data and processes the request normally

### Requirement: GET /todos validates query parameters with Zod

The GET /todos endpoint SHALL validate optional query parameters using a Zod schema.

#### Scenario: No query params (default)

- **WHEN** a `GET` request is sent to `/todos` with no query parameters
- **THEN** the handler receives empty validated data and returns all todos for the authenticated user

### Requirement: GET /todos/:id validates route param with Zod

The GET /todos/:id endpoint SHALL validate the `id` route parameter using a Zod schema.

#### Scenario: Missing id returns 400

- **WHEN** a `GET` request is sent to `/todos/` (no id) that does not match the route
- **THEN** the API returns a 404 or 400 as appropriate from Hono routing

#### Scenario: Valid id reaches handler

- **WHEN** a `GET` request is sent to `/todos/<valid_id>` where id passes Zod validation
- **THEN** the handler receives the validated id and returns the todo
