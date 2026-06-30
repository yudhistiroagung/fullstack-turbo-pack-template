## 1. Backend — API Key Middleware

- [x] 1.1 Add `API_KEY` to `apps/api/src/config/index.ts` using `getString('API_KEY')` and export it
- [x] 1.2 Add `API_KEY=` to `apps/api/.env.example`
- [x] 1.3 Create `apps/api/src/middlewares/api-key-middleware.ts` — Hono middleware that checks `x-api-key` header against the configured API key and returns 401 on mismatch or absence
- [x] 1.4 Register `apiKeyMiddleware` in `apps/api/src/middlewares/index.ts` within `preMiddlewares`, before `injectMiddleware`

## 2. Frontend — API Key Header on Requests

- [x] 2.1 Add `apiKey: getString('VITE_API_KEY')` to `apps/web/src/config/index.ts`
- [x] 2.2 Add `VITE_API_KEY=` to `apps/web/.env.example`
- [x] 2.3 Add an axios request interceptor in `apps/web/src/lib/api-client.ts` that sets the `x-api-key` header from `config.apiKey` on every request
