import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { Quasar } from 'quasar';
import GameModal from './GameModal.vue';
import { BingoTypes } from '../models/BingoCard';

describe('GameModal.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mountComponent = (props = {}) => {
    return mount(GameModal, {
      props: {
        modelValue: true,
        totalCards: 0,
        ...props,
      },
      global: {
        plugins: [Quasar],
      },
    });
  };

  it('should render the component', () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('should initialize gameType with BINGO_75', () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as unknown as { gameType: BingoTypes };
    expect(vm.gameType).toBe(BingoTypes.BINGO_75);
  });

  it('should initialize quantity with 1', () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as unknown as { quantity: number };
    expect(vm.quantity).toBe(1);
  });

  it('should receive totalCards prop', () => {
    const wrapper = mountComponent({ totalCards: 5 });
    const vm = wrapper.vm as unknown as { totalCards: number };
    expect(vm.totalCards).toBe(5);
  });

  it('should emit update:modelValue when show changes', async () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as unknown as { show: boolean };

    vm.show = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('should allow changing gameType', async () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as unknown as { gameType: BingoTypes };

    vm.gameType = BingoTypes.BINGO_90;
    await wrapper.vm.$nextTick();

    expect(vm.gameType).toBe(BingoTypes.BINGO_90);
  });

  it('should allow changing quantity', async () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as unknown as { quantity: number };

    vm.quantity = 10;
    await wrapper.vm.$nextTick();

    expect(vm.quantity).toBe(10);
  });
});
