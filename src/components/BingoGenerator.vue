<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { BingoTypes } from 'src/models';
import { useBingoStore } from 'src/stores/bingo';

import GameModal from './GameModal.vue';
import BingoCard75 from './BingoCard75.vue';
import BingoCard90 from './BingoCard90.vue';

const $q = useQuasar();
const store = useBingoStore();
const showConfigDialog = ref(false);

function generate(gameType: BingoTypes, quantity: number = 1) {
  store.generateCards(gameType, quantity);
  showConfigDialog.value = false;
}

function printCards() {
  window.print();
}

const stickyPosition = computed(() => {
  return $q.screen.gt.sm ? 'top-right' : 'bottom-right';
});
</script>

<template>
  <div class="bingo-generator">
    <!-- FAB button to open config dialog on mobile -->
    <q-page-sticky :position="stickyPosition" :offset="[18, 18]">
      <q-btn
        class="print-hide"
        round
        color="primary"
        icon="settings"
        @click="showConfigDialog = true"
      />
    </q-page-sticky>

    <!-- Configuration Dialog -->
    <game-modal
      v-model="showConfigDialog"
      class="print-hide"
      :total-cards="store.totalCards"
      @generate="generate"
      @print="printCards"
    />

    <div class="cards-display q-pa-sm">
      <div v-if="store.gameType === BingoTypes.BINGO_75" class="print-grid-75">
        <BingoCard75
          v-for="card in store.cards75"
          :key="card.id"
          :card="card"
          class="q-mb-sm"
          @toggle-mark="(row, col) => store.toggleMark(card.id, row, col)"
        />
      </div>
      <div v-if="store.gameType === BingoTypes.BINGO_90" class="print-grid-90">
        <BingoCard90
          v-for="card in store.cards90"
          :key="card.id"
          :card="card"
          @toggle-mark="(row, col) => store.toggleMark(card.id, row, col)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Cards display - flexbox layout */
.print-grid-75,
.print-grid-90 {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.print-grid-75 > *,
.print-grid-90 > * {
  flex: 1 1 100%;
  min-width: 0;
}

.print-grid-75 > * {
  max-width: 300px;
}

.print-grid-90 > * {
  max-width: 600px;
}

.cards-display {
  max-width: 1400px;
  margin: 0 auto;
}
/* Print Styles */
@media print {
  .no-print {
    display: none !important;
  }

  .q-page-container {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
</style>
