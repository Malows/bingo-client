## Why

La aplicación ya tiene un primer intento de personalización visual a través de skins, pero la lógica está dispersa en el layout y en algunos componentes. Esta mejora busca convertir la personalización visual en un sistema claro y escalable para cambiar el tema general de la app, incluyendo header, colores de tarjeta y estados visuales de las celdas, sin duplicar lógica en cada vista.

## What Changes

- Introducir un sistema de skins/temas visuales con un catálogo centralizado de definiciones.
- Añadir un estado de skin activa en el store de Pinia y exponer una acción para cambiarla.
- Aplicar el tema activo mediante atributos o variables CSS globales en el contenedor principal de la app.
- Reemplazar el header fijo del layout por un componente dinámico por skin, usando una estrategia de componentes específicos.
- Actualizar los componentes de tarjetas para consumir variables CSS y reflejar los estilos de la skin activa.
- Añadir tests unitarios para la lógica de cambio de skin y para las reglas de integración con la UI.

## Capabilities

### New Capabilities
- `visual-skins`: support for defining, selecting, and applying visual skins across the app shell and bingo cards.

### Modified Capabilities
- None.

## Impact

- `src/stores/skin.ts` and/or a new dedicated store for theme state.
- `src/layouts/MainLayout.vue` for dynamic header rendering.
- `src/components/BingoCard75.vue` and `src/components/BingoCard90.vue` for theme-aware styling.
- New constants/types under `src/constants/` or `src/types/` for skin definitions.
- Unit tests in `src/stores/` and component-adjacent test files.
