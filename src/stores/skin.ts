import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { SkinId } from '../models/BingoSkin';
import { DEFAULT_SKIN_ID, SKINS, isSkinId } from '../constants/skins';

export const useSkinStore = defineStore('skin', () => {
  const currentSkinId = ref<SkinId>(DEFAULT_SKIN_ID);

  const activeSkin = computed(() => SKINS[currentSkinId.value]);
  const title = computed(() => activeSkin.value.title);

  function setSkin(skinId: string) {
    currentSkinId.value = isSkinId(skinId) ? skinId : DEFAULT_SKIN_ID;
  }

  return {
    currentSkinId,
    activeSkin,
    title,
    setSkin,
  };
});
