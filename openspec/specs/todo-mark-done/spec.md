# Todo Mark Done

## Purpose

Each todo row in the table provides a "Done" button that marks the todo as completed via `PATCH /todos/:id` with immediate UI feedback.

## Requirements

### Requirement: Mark todo as done

Each todo row in the table SHALL have a "Done" button. Clicking the "Done" button SHALL update the todo's status to "done" via a `PATCH /todos/:id` request and immediately update the UI.

#### Scenario: Mark a pending todo as done

- **WHEN** the user clicks the "Done" button on a todo row with "pending" status
- **THEN** the app sends a `PATCH /todos/:id` request with `{ "status": "done" }`
- **AND** the todo is immediately shown with a "done" visual indicator in the table
- **AND** the "Done" button becomes disabled or hidden for that row

#### Scenario: Done button on already completed todo

- **WHEN** a todo already has "done" status
- **THEN** the "Done" button SHALL be disabled or hidden
- **AND** the row displays a visual indicator that the todo is completed (e.g., strikethrough text or muted styling)
