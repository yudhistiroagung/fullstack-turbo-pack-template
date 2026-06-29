## MODIFIED Requirements

### Requirement: Search todos by name
The dashboard page SHALL provide a search input that filters the displayed todo list by todo name using case-insensitive substring matching. The search operates on the authenticated user's own todos only.

#### Scenario: Search with matching results
- **WHEN** the user types a search term that matches part of one or more of their own todo names
- **THEN** the table displays only the user's todos whose names contain the search term (case-insensitive)

#### Scenario: Search with no matching results
- **WHEN** the user types a search term that does not match any of their todo names
- **THEN** the table displays no rows

#### Scenario: Clear search restores full list
- **WHEN** the user clears the search input
- **THEN** the table displays all of the user's todos unfiltered
