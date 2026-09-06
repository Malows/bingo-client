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
      background: '#fdce04',
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
    name: 'Cumple de Lori',
    title: 'Cumple de Lori 🎉🥳🎂',
    header: {
      background: '#7e57c2', // Violeta vibrante
      textColor: '#ffffff',
      accentStart: '#ab47bc',
      accentMiddle: '#ce93d8', // Lila pastel
      accentEnd: '#7e57c2',
    },
    card: {
      border: '#9575cd', // Amatista suave
      background: '#ffffff',
      headerBackground: '#7e57c2', // Violeta
      headerText: '#ffffff',
      headerBorder: '#7e57c2',
      cellBorder: '#d1c4e9', // Lila claro
    },
    cell: {
      border: '#d1c4e9',
      hover: '#f3e5f5', // Lila tenue al pasar el mouse
      focus: '#7e57c2',
      empty: '#fbf7fc', // Crema lavanda tenue
      free: '#d1c4e9', // Lavanda pastel para casillero libre
      marked: '#8e24aa', // Púrpura vivo para celda marcada
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
