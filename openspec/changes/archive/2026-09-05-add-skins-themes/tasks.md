## 1. Foundation

- [x] 1.1 Create shared skin model/types and default skin catalog, then verify the files are present and type-safe.
- [x] 1.2 Extend the Pinia skin state with default selection and a setter action, then verify the store exposes the active skin and update method.

## 2. App Shell Integration

- [x] 2.1 Apply the active skin to the app root via a data attribute or CSS variables, then verify the root element receives the expected attribute/value.
- [x] 2.2 Replace the static layout header with a skin-driven header component strategy, then verify the correct header variant renders for the active skin.

## 3. Card Visuals

- [x] 3.1 Refactor bingo card components to consume theme tokens from the shared skin model, then verify the card styles respond to the active skin.
- [x] 3.2 Ensure marked/selected cells and header states use the skin colors, then verify the visual state changes are reflected in the rendered component.

## 4. Tests

- [x] 4.1 Add unit tests for the skin store selection and fallback behavior, then verify they pass.
- [x] 4.2 Add component or integration tests for skin-driven rendering, then verify the relevant test suite passes.

## 5. Validation

- [x] 5.1 Run the project test and build commands, then verify the implementation remains green.
