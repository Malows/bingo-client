# AGENTS.md

## Commands

- Use the scripts in `package.json` as the source of truth: `npm run lint`, `npm run test:run`, and `npm run build`.
- There is no dedicated `typecheck` script; `npm run build` is the main TypeScript validation path.
- For one test file, run `npm run test:run -- <path-to-test>` (for example `npm run test:run -- src/components/BingoCard75.test.ts`).
- Install dependencies with `npm install`; the README also mentions `yarn`, but the repo scripts are npm-compatible.

## Repo shape

- This is a Quasar + Vue 3 + Pinia app.
- Primary wiring lives in `src/App.vue`, `src/router/`, `src/stores/`, `src/pages/`, and `src/components/`.
- Domain/model code is under `src/models/`; keep UI components and model classes separate.
- Tests are colocated as `*.test.ts` under `src/` next to the implementation they cover.

## Architecture

- The app entry is `src/App.vue`, which mounts the router.
- Routing is defined in `src/router/routes.ts`: `/` loads `src/layouts/MainLayout.vue` and then `src/pages/IndexPage.vue`.
- `src/layouts/MainLayout.vue` provides the Quasar shell and shared header/layout chrome.
- `src/pages/IndexPage.vue` is the page-level composition root; it renders `src/components/BingoGenerator.vue`.
- `src/components/` contains UI components and should stay focused on rendering and user interaction. Business logic should not live here.
- `src/stores/bingo.ts` is the Pinia store for game state and actions such as generating cards, toggling marks, and checking lines/full completion.
- `src/models/` contains the domain model classes (`Bingo75Card`, `Bingo90Card`, `BingoCardFactory`) and the shared bingo constants/interfaces. Rules like card generation, marking, and win validation belong here.
- Follow the flow: component -> store -> model -> UI update.

## Quasar/Vite gotchas

- `npm install` runs `quasar prepare` via `postinstall`; do not hand-edit generated `.quasar` artifacts.
- Vitest aliases `@` and `src` to `src/`, so follow existing import paths instead of inventing new ones.
- ESLint/Prettier are already configured for Vue + TypeScript; keep changes compatible with the existing flat config.
