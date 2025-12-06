import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BingoCard75 from './BingoCard75.vue';

describe('BingoCard75.vue', () => {
  const mockCard: (number | 'FREE')[][] = [
    [1, 16, 31, 46, 61],
    [2, 17, 32, 47, 62],
    [3, 18, 'FREE', 48, 63],
    [4, 19, 34, 49, 64],
    [5, 20, 35, 50, 65],
  ];

  it('should render the component', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should display BINGO header letters', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
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
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    expect(rows).toHaveLength(5);
  });

  it('should render 25 cells total', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
      },
    });

    const cells = wrapper.findAll('.bingo-cell');
    expect(cells).toHaveLength(25);
  });

  it('should display FREE space in center', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    const centerRow = rows[2];
    const cells = centerRow?.findAll('.bingo-cell');
    const centerCell = cells?.[2];

    expect(centerCell?.text()).toBe('FREE');
    expect(centerCell?.classes()).toContain('free-space');
  });

  it('should display numbers correctly', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row');
    const firstRow = rows[0];
    const cells = firstRow?.findAll('.bingo-cell');

    expect(cells?.[0]?.text()).toBe('1');
    expect(cells?.[1]?.text()).toBe('16');
    expect(cells?.[2]?.text()).toBe('31');
  });

  it('should apply free-space class only to FREE cell', () => {
    const wrapper = mount(BingoCard75, {
      props: {
        card: mockCard,
      },
    });

    const freeSpaceCells = wrapper.findAll('.free-space');
    expect(freeSpaceCells).toHaveLength(1);

    const centerCell = wrapper.findAll('.bingo-row')[2]?.findAll('.bingo-cell')[2];
    expect(centerCell?.classes()).toContain('free-space');
  });

  it('should render with different card data', () => {
    const differentCard: (number | 'FREE')[][] = [
      [10, 25, 40, 55, 70],
      [11, 26, 41, 56, 71],
      [12, 27, 'FREE', 57, 72],
      [13, 28, 42, 58, 73],
      [14, 29, 43, 59, 74],
    ];

    const wrapper = mount(BingoCard75, {
      props: {
        card: differentCard,
      },
    });

    const cells = wrapper.findAll('.bingo-cell');
    expect(cells[0]?.text()).toBe('10');
    expect(cells[1]?.text()).toBe('25');
  });
});
