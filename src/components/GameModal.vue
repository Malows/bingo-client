<script setup lang="ts">
import { ref } from 'vue';
import { BingoTypes } from 'src/models';

defineProps<{ totalCards: number }>();
const show = defineModel<boolean>({ required: true });
defineEmits<{
  (e: 'generate', gameType: BingoTypes, quantity: number): void;
  (e: 'print'): void;
}>();

const gameType = ref<BingoTypes>(BingoTypes.BINGO_75);
const quantity = ref(1);
</script>

<template>
  <q-dialog v-model="show">
    <q-card class="config-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Configuration</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="column q-gutter-md">
          <q-select
            v-model="gameType"
            :options="[
              { label: 'Bingo 75', value: BingoTypes.BINGO_75 },
              { label: 'Bingo 90', value: BingoTypes.BINGO_90 },
            ]"
            label="Game Type"
            outlined
            emit-value
            map-options
          />
          <q-input
            v-model.number="quantity"
            type="number"
            label="Quantity"
            outlined
            :rules="[(val) => val >= 1 || 'Minimum 1', (val) => val <= 100 || 'Maximum 100']"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          flat
          color="secondary"
          label="Print Cards"
          icon="print"
          :disable="totalCards === 0"
          @click="$emit('print')"
        />
        <q-btn
          color="primary"
          label="Generate Cards"
          icon="refresh"
          @click="$emit('generate', gameType, quantity)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.config-dialog {
  border-radius: 8px;
}
</style>
