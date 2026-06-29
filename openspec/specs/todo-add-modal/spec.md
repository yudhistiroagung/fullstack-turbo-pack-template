# Todo Add Modal

## Purpose

The dashboard page provides an "Add Todo" button that opens a modal dialog with a validated form for creating new todos.

## Requirements

### Requirement: Add todo via modal form

The dashboard page SHALL provide an "Add Todo" button. When clicked, a modal dialog SHALL open containing a form with a todo name field and a submit button. The form SHALL be validated before submission. The created todo is automatically associated with the authenticated user.

#### Scenario: Open add todo modal

- **WHEN** the user clicks the "Add Todo" button (either in the top-right or in the empty state)
- **THEN** a modal dialog opens with a text input labeled "Todo Name" and a "Submit" button

#### Scenario: Submit valid todo

- **WHEN** the user enters a valid todo name and clicks "Submit"
- **THEN** the app sends a `POST /todos` request with the todo name (authenticated session cookie included)
- **AND** the API creates the todo associated with the authenticated user
- **AND** the modal closes
- **AND** the todo list refreshes to include the new todo

#### Scenario: Submit empty todo name

- **WHEN** the user clicks "Submit" with an empty todo name field
- **THEN** a validation error message is displayed
- **AND** the form is not submitted

#### Scenario: Close modal without submitting

- **WHEN** the user opens the add todo modal and clicks outside the modal or presses Escape
- **THEN** the modal closes without creating a todo
