# Todo Search

## ADDED Requirements

### Requirement: Search todos by name

The dashboard page SHALL provide a search input that filters the displayed todo list by todo name using case-insensitive substring matching.

#### Scenario: Search with matching results

- **WHEN** the user types a search term that matches part of one or more todo names
- **THEN** the table displays only todos whose names contain the search term (case-insensitive)

#### Scenario: Search with no matching results

- **WHEN** the user types a search term that does not match any todo name
- **THEN** the table displays no rows

#### Scenario: Clear search restores full list

- **WHEN** the user clears the search input
- **THEN** the table displays all todos unfiltered
