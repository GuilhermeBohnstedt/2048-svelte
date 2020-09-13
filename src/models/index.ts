export type TileContent = {
  value: number;
}

export type GameKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'

export type GameActions = {
  [key in GameKeys]: (tiles: Array<TileContent>) => Array<TileContent>;
}