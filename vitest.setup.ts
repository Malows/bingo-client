import { config } from '@vue/test-utils';

// Configuración global para Vue Test Utils
config.global.mocks = {
  $t: (key: string) => key, // Mock de i18n si se usa
};

// Mock de Quasar plugins si es necesario
config.global.stubs = {
  // Puedes agregar stubs aquí si necesitas mockear componentes de Quasar
};
