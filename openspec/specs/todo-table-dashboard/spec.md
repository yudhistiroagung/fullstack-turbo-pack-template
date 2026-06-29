# Todo Table Dashboard

## Purpose

The dashboard page at `/` provides a todo management interface displaying todos in a table with actions, while retaining the existing logout functionality.

## Requirements

### Requirement: Dashboard displays todo table

The dashboard page at `/` SHALL display only the authenticated user's own todos in a table with columns for name and actions. The "Add Todo" button SHALL be positioned in the top-right corner of the page.

#### Scenario: Dashboard with existing todos

- **WHEN** an authenticated user opens the dashboard page and they have todos in the database
- **THEN** the app displays a table with each of the user's own todos showing the name and a "Done" action button in the actions column
- **AND** an "Add Todo" button is visible in the top-right corner

#### Scenario: Dashboard with no todos

- **WHEN** an authenticated user opens the dashboard page and they have no todos in the database
- **THEN** the app displays the text "no todo yet" centered on the page
- **AND** an "Add Todo" button is displayed centered below the text

#### Scenario: Dashboard shows only user's own todos

- **WHEN** an authenticated user opens the dashboard page and other users have todos in the database
- **THEN** the app SHALL NOT display any todos belonging to other users

### Requirement: Dashboard retains existing functionality

The dashboard page SHALL retain the existing logout button and user greeting from the current implementation.

#### Scenario: Logout button remains available

- **WHEN** an authenticated user is on the dashboard page
- **THEN** a logout button is visible on the page
- **AND** clicking it signs the user out and redirects to `/login`
