## ADDED Requirements

### Requirement: API Key Environment Variable on Server
The API server SHALL read an `API_KEY` environment variable at startup and make it available for middleware validation.

#### Scenario: API_KEY is set
- **WHEN** the server starts with `API_KEY` configured
- **THEN** the value is accessible to the api-key middleware

#### Scenario: API_KEY is missing
- **WHEN** the server starts without `API_KEY` configured
- **THEN** the server SHALL exit with an error indicating the missing configuration

### Requirement: API Key Middleware Registration
The system SHALL register an api-key middleware that runs on every incoming request, placed after `preMiddlewares` (CORS, injection) but before the auth middleware.

#### Scenario: Middleware is registered
- **WHEN** the server starts
- **THEN** the api-key middleware is applied to all routes

### Requirement: API Key Middleware Validates Header
The api-key middleware SHALL check for an `x-api-key` header on every incoming request and compare it against the configured `API_KEY`.

#### Scenario: Valid API key provided
- **WHEN** a request includes an `x-api-key` header matching the configured `API_KEY`
- **THEN** the request proceeds to the next middleware or route handler

#### Scenario: Invalid API key provided
- **WHEN** a request includes an `x-api-key` header that does NOT match the configured `API_KEY`
- **THEN** the server responds with HTTP 401 and a JSON body `{ "error": "Invalid or missing API key" }`

#### Scenario: Missing API key header
- **WHEN** a request does NOT include an `x-api-key` header
- **THEN** the server responds with HTTP 401 and a JSON body `{ "error": "Invalid or missing API key" }`

### Requirement: API Key Environment Variable on Frontend
The web client SHALL read a `VITE_API_KEY` environment variable from its configuration module.

#### Scenario: VITE_API_KEY is configured
- **WHEN** the web app builds or starts with `VITE_API_KEY` set
- **THEN** the value is accessible via `config.apiKey`
