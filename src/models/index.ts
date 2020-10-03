export type GameKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'

export type GameActions = {
  [key in GameKeys]: (tablet: Tablet<number>) => Tablet<number>;
}

export enum Moves {
  'up',
  'down',
  'left',
  'right'
}

export type MovesType = keyof typeof Moves;


export type Row<T> = Array<T>;
export type Tablet<T> = Array<Row<T>>;

export type GameState = {
  dimension: number;
  tablet: Tablet<number>;
  actions: GameActions;
}