import type { SkinId, BingoSkin } from '../models/BingoSkin';

export const SKINS: Record<SkinId, BingoSkin> = {
  argentina: {
    id: 'argentina',
    name: 'Argentina',
    title: 'Bingo Locril Patrio',
    headerComponent: 'ArgentinaHeader',
  },
  colombia: {
    id: 'colombia',
    name: 'Colombia',
    title: 'Bingo Colombia',
    headerComponent: 'ColombiaHeader',
  },
  lorieth: {
    id: 'lorieth',
    name: 'Cumple de Lori',
    title: 'Cumple de Lori 🎉🥳🎂',
    headerComponent: 'LoriethHeader',
  },
};

export const DEFAULT_SKIN_ID: SkinId = 'argentina';

const AVAILABLE_SKINS = new Set(['argentina', 'colombia', 'lorieth']);

export function isSkinId(value: string): value is SkinId {
  return AVAILABLE_SKINS.has(value);
}
