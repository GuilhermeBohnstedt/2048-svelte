import type { Tablet, Row, TileContent } from "../models";

export const genNewTileValue = (): number =>
  Math.random() > 0.9 ? 2 : 1;

export const isEmptyTile = (tile: TileContent): boolean => tile.value === 0;

export const transpose = (matrix: Tablet): Tablet => {
  return matrix.reduce((prev: Row[], next: Row) =>
    next.map<Row>((item, i: number) =>
      [...(prev[i] || []), next[i]]
    ),
    []);
}

export const reverse = (matrix: Tablet) => matrix.map(row => row.reverse());
