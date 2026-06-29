# Dashboard Page

## Purpose
TBD

## Requirements

### Requirement: Dashboard page after login
The system SHALL display a dashboard at `/` for authenticated users with a logout button.

#### Scenario: Authenticated user lands on dashboard
- **WHEN** an authenticated user navigates to `/`
- **THEN** the system displays the dashboard page with a "Logout" button

### Requirement: Logout button functionality
The system SHALL terminate the user session when the logout button is clicked.

#### Scenario: User clicks logout
- **WHEN** the "Logout" button on the dashboard is clicked
- **THEN** the system signs the user out and redirects to `/login`

### Requirement: Dashboard greeting
The system SHALL display a greeting or user identifier on the dashboard to indicate the logged-in state.

#### Scenario: Dashboard shows user information
- **WHEN** an authenticated user views the dashboard
- **THEN** the dashboard displays the user's name or email from their Google profile
