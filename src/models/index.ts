export type GameKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'

export type GameActions = {
  [key in GameKeys]: (tablet: Tablet) => Tablet;
}

export enum Moves {
  'up',
  'down',
  'left',
  'right'
}

export type MovesType = keyof typeof Moves;

export type TileContent = {
  id: number;
  top: number;
  left: number;
  value: number;
  merged: boolean;
  swipe: boolean;
  new: boolean;
}
export type Row= Array<TileContent>;
export type Tablet = Array<Row>;

export type GameState = {
  dimension: number;
  tablet: Tablet;
  actions: GameActions;
}