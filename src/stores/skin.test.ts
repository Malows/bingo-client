import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSkinStore } from './skin';
import type { SkinId } from '../models/BingoSkin';
import { DEFAULT_SKIN_ID, SKINS } from '../constants/skins';

describe('useSkinStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should default to the configured default skin', () => {
    const store = useSkinStore();

    expect(store.currentSkinId).toBe(DEFAULT_SKIN_ID);
    expect(store.activeSkin).toEqual(SKINS[DEFAULT_SKIN_ID]);
  });

  it('should change the active skin', () => {
    const store = useSkinStore();

    store.setSkin('colombia');

    expect(store.currentSkinId).toBe('colombia');
    expect(store.activeSkin).toEqual(SKINS.colombia);
  });

  it('should expose the title from the active skin', () => {
    const store = useSkinStore();

    expect(store.title).toBe(SKINS[DEFAULT_SKIN_ID].title);
  });

  it('should accept valid skin IDs', () => {
    const store = useSkinStore();
    const validIds: SkinId[] = ['argentina', 'colombia', 'lorieth'];

    validIds.forEach((skinId) => {
      store.setSkin(skinId);
      expect(store.currentSkinId).toBe(skinId);
    });
  });
});
