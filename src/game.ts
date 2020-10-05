import type { GameState, MovesType, Tablet, Row, TileContent } from "./models";
import { genNewTileValue, isEmptyTile, transpose, reverse } from "./utils";

const genRow = (dimension: number): Row => Array<TileContent>(dimension).fill({ value: 0, merged: false, new: false, swipe: false });
const genTablet = (dimension: number): Tablet => Array(dimension).fill(genRow(dimension))

const hasEmptyTiles = (tablet: Tablet): boolean =>
  tablet.filter(row => row.filter(tile => isEmptyTile(tile)).length > 0).length > 0


export const genNewTiles = (tablet: Tablet): Tablet => {
  if (!hasEmptyTiles(tablet)) return tablet;

  const randomRow = Math.floor(Math.random() * tablet.length);
  const randomTile = Math.floor(Math.random() * tablet.length);

  return isEmptyTile(tablet[randomRow][randomTile]) ? changeTile(tablet, randomRow, randomTile) : genNewTiles(tablet);
}

const changeTile = (arr: Tablet, row: number, tile: number): Tablet => {
  return [
    ...arr.slice(0, row),
    [
      ...arr[row].slice(0, tile),
      { value: genNewTileValue(), merged: false, new: true, swipe: false },
      ...arr[row].slice(tile + 1, arr[row].length),

    ],
    ...arr.slice(row + 1, arr.length),
  ]
}

const merge = (row: Row): Row => {
  const current = row[0];
  const next = row[1];
  const canMerge = Boolean(current) && Boolean(next) && current.value === next.value;
  const newRow = row.slice(canMerge ? 2 : 1);
  return [
    ...(
      canMerge
        ? [{ ...current, value: current.value + 1, merged: true }]
        : [
          ...(
            Boolean(current) ? [current] : []
          ),
        ]
    ),
    ...(
      newRow.length > 1 ? merge(newRow) : Boolean(next) && !canMerge ? [next] : newRow
    )
  ]
}

const normalize = (tablet: Tablet): Tablet => {
  return tablet.map(row => {
    const noZeroTiles = row.filter(tile => !isEmptyTile(tile));
    const merged = merge(noZeroTiles);
    return [...merged, ...genRow(tablet.length - merged.length)]
  }
  )
}

export const genInitialState = (dimension: number): GameState => {
  return {
    dimension,
    tablet: genNewTiles(genTablet(dimension)),
    actions: {
      ArrowUp: (tablet: Tablet) => {
        return genNewTiles(transpose(normalize(transpose(tablet))));
      },
      ArrowDown: (tablet: Tablet) => {
        return genNewTiles(transpose(normalize(transpose(tablet.reverse()))).reverse())
      },
      ArrowLeft: (tablet: Tablet) => {
        return genNewTiles(normalize(tablet));
      },
      ArrowRight: (tablet: Tablet) => {
        return genNewTiles(reverse(normalize(reverse(tablet))));
      },
    }
  }
}