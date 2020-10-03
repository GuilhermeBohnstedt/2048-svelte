import type { GameState, MovesType, Tablet, Row } from "./models";
import { genNewTileValue, isEmptyTile, transpose, reverse } from "./utils";

const genRow = (dimension: number): Row<number> => Array(dimension).fill(0);
const genTablet = (dimension: number): Tablet<number> => Array(dimension).fill(genRow(dimension))

const getAllEmptyTiles = (tablet: Tablet<number>): Tablet<boolean> =>
  tablet.map(row => row.map(tile => isEmptyTile(tile)))


export const genNewTiles = (tablet: Tablet<number>): Tablet<number> => {
  const empties: Tablet<boolean> = getAllEmptyTiles(tablet);

  const randomRow = Math.floor(Math.random() * tablet.length);
  const randomTile = Math.floor(Math.random() * tablet.length);

  return isEmptyTile(tablet[randomRow][randomTile]) ? changeTile(tablet, randomRow, randomTile) : genNewTiles(tablet);
}

const changeTile = (arr: Tablet<number>, row: number, tile: number): Tablet<number> => {
  return [
    ...arr.slice(0, row),
    [
      ...arr[row].slice(0, tile),
      genNewTileValue(),
      ...arr[row].slice(tile + 1, arr[row].length),

    ],
    ...arr.slice(row + 1, arr.length),
  ]
}

export const move = (state: GameState, move: MovesType): GameState => {
  return state;
}

const merge = (row: Row<number>): Row<number> => {
  return row.reduce((prev: Row<number>, current: number, index: number) => {
    return [
      ...(index - 1 > 0 && prev[index - 1] === current? [current * 2] : [current])
    ]
  }, [])
}

const normalize = (tablet: Tablet<number>): Tablet<number> => {
  return tablet.map(row => {
    const noZeroTiles = row.filter(tile => !isEmptyTile(tile));
    return [...merge(noZeroTiles), ...genRow(tablet.length - noZeroTiles.length)]
  }
  )
}

export const genInitialState = (dimension: number): GameState => {
  return {
    dimension,
    tablet: genNewTiles(genTablet(dimension)),
    actions: {
      ArrowUp: (tablet: Tablet<number>) => {
        return genNewTiles(transpose(normalize(transpose(tablet))));
      },
      ArrowDown: (tablet: Tablet<number>) => {
        return genNewTiles(transpose(normalize(transpose(tablet))).reverse())
      },
      ArrowLeft: (tablet: Tablet<number>) => {
        return genNewTiles(normalize(tablet));
      },
      ArrowRight: (tablet: Tablet<number>) => {
        return genNewTiles(reverse(normalize(reverse(tablet))));
      },
    }
  }
}