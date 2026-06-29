# Google Auth

## Purpose
TBD

## Requirements

### Requirement: Google OAuth sign-in flow
The system SHALL allow users to authenticate using their Google account via OAuth 2.0. The authentication flow SHALL be handled server-side by Better Auth with the Google provider.

#### Scenario: User initiates Google sign-in
- **WHEN** user clicks the "Login with Google" button on the login page
- **THEN** the system redirects the user to Google's OAuth consent screen

#### Scenario: Successful Google OAuth callback
- **WHEN** Google redirects back to the application after user grants consent
- **THEN** the system creates a session and redirects the user to the dashboard page `/`

#### Scenario: Failed Google OAuth callback
- **WHEN** Google OAuth flow fails (user denies consent, network error, etc.)
- **THEN** the system redirects the user to `/login` and displays an error snackbar message

### Requirement: Session management
The system SHALL manage user sessions via Better Auth, storing session data in the existing MongoDB database.

#### Scenario: Authenticated user accesses protected route
- **WHEN** an authenticated user navigates to any route
- **THEN** the system allows access and renders the requested page

#### Scenario: Session expiration
- **WHEN** a user's session expires
- **THEN** subsequent requests to protected routes redirect to `/login`

### Requirement: User logout
The system SHALL allow authenticated users to sign out, terminating their session.

#### Scenario: User logs out from dashboard
- **WHEN** user clicks the "Logout" button on the dashboard
- **THEN** the system terminates the session and redirects the user to `/login`

#### Scenario: Logout with no active session
- **WHEN** logout is triggered with no active session
- **THEN** the system redirects the user to `/login` without errors
