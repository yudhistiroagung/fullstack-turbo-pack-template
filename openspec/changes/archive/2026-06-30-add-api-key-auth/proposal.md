## Why

The frontend and backend currently communicate without API key authentication, leaving the API open to unauthorized external requests. Adding an API key check on every request ensures only trusted clients (the frontend app) can access the backend.

## What Changes

- Add `API_KEY` environment variable to both the API server and the web client
- Create a new **api-key-middleware** on the backend that validates a shared API key header (`x-api-key`) on every incoming request
- Modify the **api-client** on the frontend to attach the API key header to every outgoing request via an axios interceptor

## Capabilities

### New Capabilities
- `api-key-auth`: Shared API key validation on every FE-to-BE request — covers the env variable, the backend middleware that rejects invalid/missing keys, and the frontend axios interceptor that attaches the key to all requests

### Modified Capabilities
- `api-client`: The shared axios instance must be updated to include the `x-api-key` header on every request, reading the key from environment configuration

## Impact

- **apps/api** — new middleware file, env config addition, middleware registration in `middlewares/index.ts`
- **apps/web** — axios interceptor in `api-client.ts`, env config addition, `.env.example` updates on both apps
