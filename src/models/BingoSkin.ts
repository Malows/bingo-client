export type SkinId = 'argentina' | 'colombia' | 'lorieth';

export interface BingoSkin {
  id: SkinId;
  name: string;
  title: string;
  headerComponent: 'ArgentinaHeader' | 'ColombiaHeader' | 'LoriethHeader';
}
