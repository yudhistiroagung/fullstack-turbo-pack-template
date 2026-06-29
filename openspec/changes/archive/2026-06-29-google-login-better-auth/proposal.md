## Why

The application currently has no authentication mechanism. Users accessing the app have no way to identify themselves, and there is no protected route flow. Implementing Google OAuth login via Better Auth provides a secure, low-friction sign-in experience while laying the foundation for user-specific features down the line.

## What Changes

- Add Better Auth library to both `apps/web` and `apps/api` projects
- Create a `/login` route with a Google sign-in button displayed inside a card component with blur overlay background
- Implement server-side Google OAuth authentication flow via Better Auth in the API
- Add client-side Better Auth integration in the web app to handle sign-in/sign-out
- Add route protection: unauthenticated users are redirected to `/login`
- Transform the current index route (`/`) into a dashboard with a logout button
- Display error feedback via a snackbar/toast on login failure

## Capabilities

### New Capabilities

- `google-auth`: Google OAuth authentication flow using Better Auth — server-side token exchange, session management, and client-side auth hooks for sign-in, sign-out, and session state
- `protected-routes`: Route guard that redirects unauthenticated users to `/login` and allows authenticated users to access protected pages
- `login-page`: Login UI page with Google sign-in button inside a card, with blur overlay background, using shadcn components
- `dashboard-page`: Dashboard page at `/` showing a logout button for authenticated users
- `auth-snackbar`: Error feedback mechanism via snackbar/toast on authentication failure

### Modified Capabilities

<!-- No existing capabilities to modify -->

## Impact

- **apps/web**: New dependencies (`better-auth` client), new route (`/login`), modified root route for auth guard, modified index route for dashboard with logout
- **apps/api**: New dependency (`better-auth` server), new auth handler/routes, session middleware
- **packages/shared-utils**: Potentially shared auth types/config
- **Environment**: New env variables required (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`)
