# Auth Snackbar

## Purpose
TBD

## Requirements

### Requirement: Error feedback on authentication failure
The system SHALL display a snackbar/toast notification when authentication fails.

#### Scenario: OAuth flow fails
- **WHEN** the Google OAuth sign-in fails for any reason (user denies, network error, server error)
- **THEN** the system displays a toast notification with an error message and the user remains on the login page

#### Scenario: Toast auto-dismissal
- **WHEN** an error toast is displayed
- **THEN** the toast SHALL auto-dismiss after a reasonable duration or allow the user to manually dismiss it

### Requirement: Toast notification component
The system SHALL use the Sonner toast library for rendering snackbar notifications.

#### Scenario: Toast rendered with error styling
- **WHEN** an auth error toast is displayed
- **THEN** the toast SHALL be styled with error/destructive styling (red/danger variant)
