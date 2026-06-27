## 1. Setup Dependencies

- [ ] 1.1 Install `better-auth` in `apps/api` (server SDK)
- [ ] 1.2 Install `better-auth` client SDK and `sonner` in `apps/web`
- [ ] 1.3 Add env variables to `apps/api/.env.example`: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- [ ] 1.4 Add env variable to `apps/web/.env.example`: `VITE_BETTER_AUTH_URL`

## 2. API: Better Auth Server Setup

- [ ] 2.1 Create Better Auth server instance with Google provider in `apps/api/src/lib/auth.ts`
- [ ] 2.2 Mount Better Auth handler on Hono app (catch-all route `/api/auth/*`)
- [ ] 2.3 Configure session management with MongoDB adapter via Better Auth
- [ ] 2.4 Export auth instance type and utilities for middleware use

## 3. Web: Better Auth Client Setup

- [ ] 3.1 Create Better Auth client instance in `apps/web/src/lib/auth-client.ts`
- [ ] 3.2 Configure client with server URL from env variable

## 4. Web: Protected Routes

- [ ] 4.1 Implement auth guard in root route `beforeLoad` — redirect unauthenticated users to `/login`
- [ ] 4.2 Add redirect for authenticated users on `/login` page to `/`

## 5. Web: Login Page UI

- [ ] 5.1 Create `/login` route file `apps/web/src/routes/login.tsx`
- [ ] 5.2 Build login card UI using Card shadcn component with blur overlay background
- [ ] 5.3 Add Google sign-in button that triggers `signIn.social` from Better Auth client
- [ ] 5.4 Add loading/disabled state to button during OAuth redirect

## 6. Web: Dashboard Page

- [ ] 6.1 Update index route `apps/web/src/routes/index.tsx` to show user greeting
- [ ] 6.2 Add logout button that calls Better Auth `signOut` and redirects to `/login`

## 7. Web: Error Handling (Snackbar)

- [ ] 7.1 Install and configure `sonner` Toaster component in root layout
- [ ] 7.2 Show error toast on OAuth callback failure (e.g., in auth error callback or URL error params)
