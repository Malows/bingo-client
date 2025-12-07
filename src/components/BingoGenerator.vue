<script setup lang="ts">
import { ref, computed } from 'vue';
import { BingoTypes } from 'src/models/BingoCard';
import { useBingoStore } from 'src/stores/bingo';
import BingoCard75 from './BingoCard75.vue';
import BingoCard90 from './BingoCard90.vue';

const store = useBingoStore();
const gameType = ref<BingoTypes>(BingoTypes.BINGO_75);
const quantity = ref(6);

const totalCards = computed(() => {
  return store.gameType === '75' ? store.cards75.length : store.cards90.length;
});

function generate() {
  store.generateCards(gameType.value, quantity.value);
}

function printCards() {
  window.print();
}
</script>

<template>
  <div class="bingo-generator">
    <div class="controls q-pa-md q-gutter-md no-print">
      <q-card class="control-panel">
        <q-card-section>
          <div class="text-h6">Configuration</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-select
                v-model="gameType"
                :options="[
                  { label: 'Bingo 75 (US)', value: '75' },
                  { label: 'Bingo 90 (UK/ES)', value: '90' },
                ]"
                label="Game Type"
                outlined
                emit-value
                map-options
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="quantity"
                type="number"
                label="Quantity"
                outlined
                min="1"
                max="100"
              />
            </div>
            <div class="col-12 col-md-4 flex items-center">
              <q-btn
                color="primary"
                label="Generate Cards"
                @click="generate"
                class="full-width"
                icon="refresh"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Print Cards"
            @click="printCards"
            icon="print"
            :disable="totalCards === 0"
          />
        </q-card-actions>
      </q-card>
    </div>

    <div class="cards-display q-pa-md">
      <div v-if="store.gameType === '75'" class="print-grid-75">
        <BingoCard75
          v-for="(card, index) in store.cards75"
          :key="index"
          :card="card"
          class="q-mb-md"
        />
      </div>
      <div v-if="store.gameType === '90'" class="print-grid-90">
        <BingoCard90 v-for="(card, index) in store.cards90" :key="index" :card="card" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.control-panel {
  max-width: 800px;
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

  .print-grid-75 {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row for Bingo 75 */
    gap: 20px;
    justify-items: center;
  }

  .print-grid-90 {
    /* Bingo 90 often printed in strips of 6, or just stacked */
    display: block;
  }
}
</style>
