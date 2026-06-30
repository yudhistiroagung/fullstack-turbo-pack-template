# api-client

## Purpose

Provides a shared, pre-configured axios HTTP client instance for making API requests to the backend. Centralizes base URL, credentials, and content-type header configuration to reduce boilerplate across hooks.

## Requirements

### Requirement: Shared Axios Instance with Base URL
The system SHALL provide a shared axios instance configured with `baseURL` set to the app's API URL from environment configuration.

#### Scenario: Base URL is prepended automatically
- **WHEN** a caller makes a request like `api.get('/todos')`
- **THEN** the request is sent to `{config.apiUrl}/todos`

### Requirement: Automatic Credentials
The system SHALL configure the shared axios instance to send credentials (cookies) with every request.

#### Scenario: Credentials included on GET request
- **WHEN** a GET request is made via the shared axios instance
- **THEN** the request includes `withCredentials: true`

#### Scenario: Credentials included on POST request
- **WHEN** a POST request is made via the shared axios instance
- **THEN** the request includes `withCredentials: true`

### Requirement: Automatic JSON Content-Type
The system SHALL automatically set the `Content-Type` header to `application/json` for all mutation requests (POST, PATCH, PUT) via a request interceptor.

#### Scenario: Content-Type set on POST request
- **WHEN** a POST request is made via the shared axios instance
- **THEN** the `Content-Type` header is set to `application/json`

#### Scenario: Content-Type NOT set on GET request
- **WHEN** a GET request is made via the shared axios instance
- **THEN** the `Content-Type` header is NOT automatically added

### Requirement: Hooks Use Shared Instance
All existing API hooks SHALL use the shared axios instance instead of raw `fetch`.

#### Scenario: useTodos uses axios
- **WHEN** `useTodos` fetches todos
- **THEN** it calls `api.get('/api/todos')` instead of `fetch()`

#### Scenario: useCreateTodo uses axios
- **WHEN** `useCreateTodo` creates a todo
- **THEN** it calls `api.post('/api/todos', { name })` instead of `fetch()`

#### Scenario: useUpdateTodo uses axios
- **WHEN** `useUpdateTodo` updates a todo
- **THEN** it calls `api.patch('/api/todos/{id}', fields)` instead of `fetch()`
