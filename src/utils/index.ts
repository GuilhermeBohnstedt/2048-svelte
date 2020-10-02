import type { TileContent } from "../models";

export const genNewTileValue = (): number => 
  Math.random() > 0.9? 2 : 1;  

export const isEmptyTile = (tile: TileContent): boolean => tile.value === 0;
