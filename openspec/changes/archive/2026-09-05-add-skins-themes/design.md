## Context

The app already has a lightweight skin concept in `src/stores/skin.ts`, but it is partially coupled to the layout and not yet applied in a consistent way to all visual surfaces. The current implementation uses hardcoded styling in `MainLayout.vue` and a few component-specific classes, which makes theme changes harder to maintain and extend.

## Goals / Non-Goals

**Goals:**

- Establish a single source of truth for skin definitions and active skin selection.
- Apply the selected skin consistently to the app shell and bingo cards.
- Keep the design compatible with the existing Vue 3 + Pinia + Quasar architecture.

**Non-Goals:**

- Building a full theme editor or persistence layer for user-defined themes.
- Supporting runtime switching of arbitrary CSS variables from the UI without a store-backed selection flow.

## Decisions

- Use a centralized skin definition model (type + catalog) so the app can consume a consistent structure from store, layout, and components.
  - Rationale: this keeps the styling contract explicit and avoids scattering color values across files.
  - Alternative considered: keeping color values inline in each component. Rejected because it would duplicate logic and make future additions harder.

- Keep the active skin in Pinia and expose it through a computed getter plus a setter action.
  - Rationale: this fits the existing architecture and allows future UI controls without introducing a second state management pattern.
  - Alternative considered: using browser-local storage directly in components. Rejected because it would couple presentation to persistence too early.

- Apply the active skin through a root-level attribute plus CSS custom properties.
  - Rationale: this provides a clean way for the layout and components to consume theme values without hardcoded component classes.
  - Alternative considered: branching in every component with many `v-if`/`v-else` conditions. Rejected because it would make the code harder to extend.

- Use a strategy pattern for headers by introducing a small set of header components per skin.
  - Rationale: this preserves the flexibility to provide distinct header markup or imagery while keeping `MainLayout.vue` simple.
  - Alternative considered: embedding all header variants in one component with conditional rendering. Rejected because it makes the header component grow in complexity as more skins are added.

- Keep gameplay logic unchanged and limit visual theming to presentation concerns.
  - Rationale: the existing domain models should remain independent from UI skin state.
  - Alternative considered: coupling card generation or game rules to skin state. Rejected because it would blur domain/UI boundaries.

## Risks / Trade-offs

- [Theme consistency across components] → Mitigation: define a shared token set in the skin model and consume it from both layout and card components.
- [Header component proliferation] → Mitigation: keep each header component focused on presentation only and use a simple registration pattern.
- [CSS variable coverage gaps] → Mitigation: define a baseline token set for common surfaces and add new tokens only when a new skin requires them.

## Migration Plan

1. Introduce the new skin model and store-backed selection flow without changing existing behavior.
2. Switch the layout and card components to consume the shared skin contract.
3. Add tests for store selection and rendering behavior, then validate that existing bingo behavior remains unchanged.

## Open Questions

- Should the selected skin be persisted across page reloads, or stay in-memory for now?
- Should the UI expose a visible selector in the app, or is the initial implementation limited to internal state and future wiring?
