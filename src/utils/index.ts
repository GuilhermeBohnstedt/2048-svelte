import type { Tablet, Row } from "../models";

export const genNewTileValue = (): number =>
  Math.random() > 0.9 ? 2 : 1;

export const isEmptyTile = (tile: number): boolean => tile === 0;

export const transpose = (matrix: Tablet<number>): Tablet<number> => {
  return matrix.reduce((prev: Row<number>[], next: Row<number>) =>
    next.map<Row<number>>((item, i: number) =>
      [...(prev[i] || []), next[i]]
    ),
    []);
}

export const reverse = (matrix: Tablet<number>) => matrix.map(row => row.reverse());
