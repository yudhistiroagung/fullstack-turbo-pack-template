## ADDED Requirements

### Requirement: Login page UI
The system SHALL display a login page at `/login` with a card component containing a Google sign-in button, overlaid on a blurry background.

#### Scenario: User navigates to login page
- **WHEN** user navigates to `/login`
- **THEN** the system displays a centered card with a "Login with Google" button on a white background with a blur overlay effect

#### Scenario: Login page visual structure
- **WHEN** the login page is rendered
- **THEN** the UI SHALL consist of:
  - A full-screen white background
  - A blurred overlay layer
  - A centered Card component (shadcn) containing:
    - An application title or logo
    - A "Login with Google" Button component
  - The button SHALL include a Google icon for visual recognition

### Requirement: Login button interaction
The system SHALL trigger the Google OAuth flow when the user clicks the login button.

#### Scenario: User clicks login button
- **WHEN** the "Login with Google" button is clicked
- **THEN** the system initiates the Better Auth Google OAuth sign-in flow

#### Scenario: Login button loading state
- **WHEN** the OAuth flow is in progress (redirecting to Google)
- **THEN** the login button SHALL display a loading/disabled state to prevent double-clicks
