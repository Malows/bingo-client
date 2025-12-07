import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { Quasar } from 'quasar';
import BingoGenerator from './BingoGenerator.vue';
import GameModal from './GameModal.vue';
import BingoCard75 from './BingoCard75.vue';
import BingoCard90 from './BingoCard90.vue';
import { BingoTypes } from '../models/BingoCard';
import { useBingoStore } from '../stores/bingo';

// Stub for QPageSticky since it requires QLayout parent
const QPageStickyStub = {
  template: '<div class="q-page-sticky-stub"><slot /></div>',
  props: ['position', 'offset'],
};

describe('BingoGenerator.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mountComponent = () => {
    return mount(BingoGenerator, {
      global: {
        plugins: [Quasar],
        components: {
          GameModal,
          BingoCard75,
          BingoCard90,
        },
        stubs: {
          QPageSticky: QPageStickyStub,
        },
      },
    });
  };

  it('should render the component', () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('should have settings button inside QPageSticky', () => {
    const wrapper = mountComponent();
    const sticky = wrapper.find('.q-page-sticky-stub');
    expect(sticky.exists()).toBe(true);
    const btn = sticky.find('.q-btn');
    expect(btn.exists()).toBe(true);
  });

  it('should have GameModal component', () => {
    const wrapper = mountComponent();
    const modal = wrapper.findComponent(GameModal);
    expect(modal.exists()).toBe(true);
  });

  it('should display Bingo75 cards when store has type 75 cards', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    store.generateCards(BingoTypes.BINGO_75, 2);
    await wrapper.vm.$nextTick();

    const cards75 = wrapper.findAllComponents(BingoCard75);
    expect(cards75.length).toBe(2);
  });

  it('should display Bingo90 cards when store has type 90 cards', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    store.generateCards(BingoTypes.BINGO_90, 2);
    await wrapper.vm.$nextTick();

    const cards90 = wrapper.findAllComponents(BingoCard90);
    expect(cards90.length).toBe(2);
  });

  it('should call window.print when printCards is called', () => {
    const wrapper = mountComponent();

    // Mock window.print
    window.print = vi.fn();
    const printSpy = window.print as ReturnType<typeof vi.fn>;

    // Access component method
    const vm = wrapper.vm as unknown as { printCards: () => void };
    vm.printCards();

    expect(printSpy).toHaveBeenCalled();
  });

  it('should generate cards when generate is called', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    // Access component method
    const vm = wrapper.vm as unknown as {
      generate: (type: BingoTypes, quantity: number) => void;
    };
    vm.generate(BingoTypes.BINGO_75, 3);

    await wrapper.vm.$nextTick();

    expect(store.cards75.length).toBe(3);
  });

  it('should close dialog after generating cards', async () => {
    const wrapper = mountComponent();

    // Set dialog open
    const vm = wrapper.vm as unknown as {
      showConfigDialog: boolean;
      generate: (type: BingoTypes, quantity: number) => void;
    };
    vm.showConfigDialog = true;

    // Generate cards
    vm.generate(BingoTypes.BINGO_75, 1);
    await wrapper.vm.$nextTick();

    expect(vm.showConfigDialog).toBe(false);
  });

  it('should have print-grid-75 class when displaying 75 cards', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    store.generateCards(BingoTypes.BINGO_75, 1);
    await wrapper.vm.$nextTick();

    const printGrid = wrapper.find('.print-grid-75');
    expect(printGrid.exists()).toBe(true);
  });

  it('should have print-grid-90 class when displaying 90 cards', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    store.generateCards(BingoTypes.BINGO_90, 1);
    await wrapper.vm.$nextTick();

    const printGrid = wrapper.find('.print-grid-90');
    expect(printGrid.exists()).toBe(true);
  });

  it('should emit toggle-mark to store when card emits toggle-mark', async () => {
    const wrapper = mountComponent();
    const store = useBingoStore();

    store.generateCards(BingoTypes.BINGO_75, 1);
    await wrapper.vm.$nextTick();

    const card = wrapper.findComponent(BingoCard75);
    const toggleMarkSpy = vi.spyOn(store, 'toggleMark');

    // Emit toggle-mark from card
    card.vm.$emit('toggle-mark', 0, 0);

    expect(toggleMarkSpy).toHaveBeenCalledWith(store.cards75[0]?.id, 0, 0);
  });
});
