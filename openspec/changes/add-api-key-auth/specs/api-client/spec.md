## ADDED Requirements

### Requirement: API Key Header on Every Request
The shared axios instance SHALL include an `x-api-key` header on every outgoing request via a request interceptor, reading the key from environment configuration.

#### Scenario: GET request includes x-api-key header
- **WHEN** a GET request is made via the shared axios instance
- **THEN** the request includes an `x-api-key` header set to the configured `VITE_API_KEY` value

#### Scenario: POST request includes x-api-key header
- **WHEN** a POST request is made via the shared axios instance
- **THEN** the request includes an `x-api-key` header set to the configured `VITE_API_KEY` value

#### Scenario: PATCH request includes x-api-key header
- **WHEN** a PATCH request is made via the shared axios instance
- **THEN** the request includes an `x-api-key` header set to the configured `VITE_API_KEY` value
