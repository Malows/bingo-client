import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export type SkinId = 'argentina' | 'colombia';

export interface BingoSkin {
  id: SkinId;
  name: string;
  title: string;
  header: {
    background: string;
    textColor: string;
    accentStart: string;
    accentMiddle: string;
    accentEnd: string;
  };
  card: {
    border: string;
    background: string;
    headerBackground: string;
    headerText: string;
    headerBorder: string;
    cellBorder: string;
  };
  cell: {
    border: string;
    hover: string;
    focus: string;
    empty: string;
    free: string;
    marked: string;
    markedText: string;
  };
}

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
  },
};

export const useSkinStore = defineStore('skin', () => {
  const currentSkinId = ref<SkinId>('argentina');

  const activeSkin = computed(() => SKINS[currentSkinId.value]);
  const title = ref('Bingo Locril Patrio');

  function setSkin(skinId: SkinId) {
    currentSkinId.value = skinId;
  }

  return {
    currentSkinId,
    activeSkin,
    title,
    setSkin,
  };
});
