import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BingoCard75 from './BingoCard75.vue';
import { Bingo75Card } from '../models/Bingo75Card';

describe('BingoCard75.vue', () => {
  // Helper to create a mock card with specific values
  const createMockCard = (): Bingo75Card => {
    return new Bingo75Card();
  };

  it('should render the component', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should display BINGO header letters', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const headers = wrapper.findAll('.header-cell');
    expect(headers).toHaveLength(5);
    expect(headers[0]!.text()).toBe('B');
    expect(headers[1]!.text()).toBe('I');
    expect(headers[2]!.text()).toBe('N');
    expect(headers[3]!.text()).toBe('G');
    expect(headers[4]!.text()).toBe('O');
  });

  it('should render 5 rows', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    expect(rows).toHaveLength(5);
  });

  it('should render 25 cells total', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const cells = wrapper.findAll('.bingo-cell');
    expect(cells).toHaveLength(25);
  });

  it('should display FREE space in center', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    const centerRow = rows[2];
    const cells = centerRow?.findAll('.bingo-cell');
    const centerCell = cells?.[2];

    expect(centerCell?.text()).toBe('FREE');
    expect(centerCell?.classes()).toContain('bingo-cell--free');
  });

  it('should apply bingo-cell--free class only to FREE cell', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const freeSpaceCells = wrapper.findAll('.bingo-cell--free');
    expect(freeSpaceCells).toHaveLength(1);

    const centerCell = wrapper.findAll('.bingo-row')[2]?.findAll('.bingo-cell')[2];
    expect(centerCell?.classes()).toContain('bingo-cell--free');
  });

  it('should emit toggle-mark event when cell is clicked', async () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: createMockCard(),
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    const firstCell = rows[0]?.findAll('.bingo-cell')[0];

    await firstCell?.trigger('click');

    expect(wrapper.emitted('toggle-mark')).toBeTruthy();
    expect(wrapper.emitted('toggle-mark')![0]).toEqual([0, 0]);
  });

  it('should show bingo-cell--marked class when cell is marked', () => {
    const card = createMockCard();
    card.toggleMark(0, 0); // Mark the first cell

    const wrapper = mount(BingoCard75, {
      props: { card },
    });

    const rows = wrapper.findAll('.bingo-row');
    const firstCell = rows[0]?.findAll('.bingo-cell')[0];

    expect(firstCell?.classes()).toContain('bingo-cell--marked');
  });
});
