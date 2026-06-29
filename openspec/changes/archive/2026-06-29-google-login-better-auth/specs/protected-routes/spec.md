## ADDED Requirements

### Requirement: Route protection guard
The system SHALL protect all routes by default, redirecting unauthenticated users to the `/login` page.

#### Scenario: Unauthenticated user accesses any route
- **WHEN** an unauthenticated user navigates to any route (e.g., `/`, `/dashboard`)
- **THEN** the system redirects the user to `/login`

#### Scenario: Authenticated user accesses protected route
- **WHEN** an authenticated user navigates to any protected route
- **THEN** the system renders the requested page normally

#### Scenario: Authenticated user accesses login page
- **WHEN** an authenticated user navigates to `/login`
- **THEN** the system redirects them to `/` (dashboard)

### Requirement: Login page is public
The system SHALL allow unauthenticated access to the `/login` page without triggering the route guard.

#### Scenario: Unauthenticated user accesses login page
- **WHEN** an unauthenticated user navigates to `/login`
- **THEN** the system renders the login page without redirect
