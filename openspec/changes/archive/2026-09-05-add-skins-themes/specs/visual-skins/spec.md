## Purpose

This capability lets the application present a consistent visual theme across the app shell and bingo cards so users can switch between distinct looks without changing gameplay behavior.

## ADDED Requirements

### Requirement: Skin catalog is available to the application
The system MUST expose a predefined catalog of visual skins, each with a stable identifier and the visual properties required for the header and card states.

#### Scenario: Default catalog is available
- **WHEN** the application loads
- **THEN** the system MUST make at least one default skin available for selection.

### Requirement: Active skin can be selected
The system MUST allow the active skin to be changed through a single entry point in application state.

#### Scenario: Active skin changes
- **WHEN** the active skin is changed to a different valid skin
- **THEN** the application MUST use the newly selected skin for subsequent rendering.

### Requirement: Active skin is applied to the app shell
The system MUST apply the active skin to the main app shell so the header and surrounding chrome reflect the selected theme.

#### Scenario: Header reflects active skin
- **WHEN** a user has an active skin selected
- **THEN** the header rendered by the main layout MUST reflect that skin's styling.

### Requirement: Active skin is applied to bingo cards
The system MUST apply the active skin to bingo card visuals so card borders, headers, and marked cells follow the selected theme.

#### Scenario: Card visuals reflect active skin
- **WHEN** a bingo card is displayed with an active skin selected
- **THEN** the card MUST render with the theme-appropriate colors for borders, header, and marked cells.

### Requirement: Invalid skin selection is handled safely
The system MUST reject unsupported skin identifiers without breaking the application.

#### Scenario: Unsupported skin is rejected
- **WHEN** an unsupported skin identifier is requested
- **THEN** the system MUST keep the previous valid skin active or fall back to a default skin.
