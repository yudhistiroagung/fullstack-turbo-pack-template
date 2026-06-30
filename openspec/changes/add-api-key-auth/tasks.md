## 1. Backend — API Key Middleware

- [ ] 1.1 Add `API_KEY` to `apps/api/src/config/index.ts` using `getString('API_KEY')` and export it
- [ ] 1.2 Add `API_KEY=` to `apps/api/.env.example`
- [ ] 1.3 Create `apps/api/src/middlewares/api-key-middleware.ts` — Hono middleware that checks `x-api-key` header against the configured API key and returns 401 on mismatch or absence
- [ ] 1.4 Register `apiKeyMiddleware` in `apps/api/src/middlewares/index.ts` within `preMiddlewares`, before `injectMiddleware`

## 2. Frontend — API Key Header on Requests

- [ ] 2.1 Add `apiKey: getString('VITE_API_KEY')` to `apps/web/src/config/index.ts`
- [ ] 2.2 Add `VITE_API_KEY=` to `apps/web/.env.example`
- [ ] 2.3 Add an axios request interceptor in `apps/web/src/lib/api-client.ts` that sets the `x-api-key` header from `config.apiKey` on every request
