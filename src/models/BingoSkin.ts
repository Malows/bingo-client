export type SkinId = 'argentina' | 'colombia' | 'lorieth';

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
  headerComponent: 'ArgentinaHeader' | 'ColombiaHeader' | 'LoriethHeader';
}
