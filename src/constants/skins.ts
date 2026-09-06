import type { SkinId, BingoSkin } from '../models/BingoSkin';

export const SKINS: Record<SkinId, BingoSkin> = {
  argentina: {
    id: 'argentina',
    name: 'Argentina',
    title: 'Bingo Locril Patrio',
    header: {
      background: '#03a9f4',
      textColor: '#ffffff',
      accentStart: 'transparent',
      accentMiddle: 'white',
      accentEnd: '#03a9f4',
    },
    card: {
      border: '#333333',
      background: '#ffffff',
      headerBackground: '#1976d2',
      headerText: '#ffffff',
      headerBorder: '#333333',
      cellBorder: '#333333',
    },
    cell: {
      border: '#333333',
      hover: '#e3f2fd',
      focus: '#1976d2',
      empty: '#ffebee',
      free: '#81c784',
      marked: '#4caf50',
      markedText: '#ffffff',
    },
    headerComponent: 'ArgentinaHeader',
  },
  colombia: {
    id: 'colombia',
    name: 'Colombia',
    title: 'Bingo Colombia',
    header: {
      background: '#f2c94c',
      textColor: '#111111',
      accentStart: 'transparent',
      accentMiddle: '#ffeb3b',
      accentEnd: '#1e88e5',
    },
    card: {
      border: '#1e88e5',
      background: '#ffffff',
      headerBackground: '#1e88e5',
      headerText: '#ffffff',
      headerBorder: '#1e88e5',
      cellBorder: '#1e88e5',
    },
    cell: {
      border: '#1e88e5',
      hover: '#fff8e1',
      focus: '#f2c94c',
      empty: '#f3e5f5',
      free: '#8bc34a',
      marked: '#1e88e5',
      markedText: '#ffffff',
    },
    headerComponent: 'ColombiaHeader',
  },
  lorieth: {
    id: 'lorieth',
    name: 'Cumple Lorieth',
    title: 'Bingo Happy Birthday Lorieth!',
    header: {
      background: '#81d4fa', // Azul cielo de la ilustración
      textColor: '#ffffff',
      accentStart: '#7cb342', // Verde pasto
      accentMiddle: '#f8bbd0', // Rosa pastel de la torta
      accentEnd: '#81d4fa',
    },
    card: {
      border: '#f06292', // Borde rosado festivo
      background: '#ffffff',
      headerBackground: '#4fc3f7', // Azul Pengu brillante
      headerText: '#ffffff',
      headerBorder: '#f06292',
      cellBorder: '#e0e0e0',
    },
    cell: {
      border: '#e0e0e0',
      hover: '#e1f5fe', // Celeste tenue al pasar el mouse
      focus: '#4fc3f7',
      empty: '#fff8e1', // Crema
      free: '#f8bbd0', // Rosa pastel para casillero libre
      marked: '#ec407a', // Magenta/Rosa para celda marcada
      markedText: '#ffffff',
    },
    headerComponent: 'LoriethHeader',
  },
};

export const DEFAULT_SKIN_ID: SkinId = 'lorieth';

const AVAILABLE_SKINS = new Set(['argentina', 'colombia', 'lorieth']);

export function isSkinId(value: string): value is SkinId {
  return AVAILABLE_SKINS.has(value);
}
