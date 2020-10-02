export type TileContent = {
  value: number;
}

export type GameKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'

export type GameActions = {
  [key in GameKeys]: (state: GameState) => GameState;
}

export enum Moves {
  'up',
  'down',
  'left',
  'right'
}

export type MovesType = keyof typeof Moves;

export type MoveType = {
  nextTile: number;
  start: number[];
  stop: number[];
}

export type GameState = {
  dimension: number;
  moves: Record<MovesType, MoveType>;
  tiles: Array<TileContent>;
  actions: GameActions;
}