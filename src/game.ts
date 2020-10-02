import type { TileContent, GameState, MovesType, MoveType } from "./models";
import { genNewTileValue } from "./utils";

export const genNewTiles = (tiles: Array<TileContent>, dimension: number): Array<TileContent> => {
  const randomTiles: number[] = [
    Math.floor(Math.random() * (dimension * 2)),
    Math.floor(Math.random() * (dimension * dimension)),
  ]

  return tiles.map((tile, index) => randomTiles.includes(index) ? { value: genNewTileValue() } : tile);
}

const changeTile = (arr: Array<TileContent>, from: number, to: number) => {
  const array = [...arr];
  const [elementInFrom] = arr.slice(from, from + 1);
  const [elementInTo] = arr.slice(to, to + 1);

  array.splice(from, 1, elementInTo);
  array.splice(to, 1, elementInFrom);

  return array;
}

const isEmptyTile = (tile: TileContent): boolean => tile.value === 0;

const moveToNextTile = (tiles: Array<TileContent>, index: number, move: MoveType): Array<TileContent> => {

  const nextIndex: number = index + move.nextTile;
  const canMoveTo: boolean = isEmptyTile(tiles[nextIndex]);

  return canMoveTo ? changeTile(tiles, index, nextIndex) : tiles;
}

export const move = (state: GameState, move: MovesType): GameState => {
  const newTiles: Array<TileContent> = state.tiles.reduce((acc: Array<TileContent>, tile: TileContent, index: number) => {
    return isEmptyTile(tile) ? acc : moveToNextTile(acc, index, state.moves[move]);
  }, state.tiles)

  return {
    ...state,
    tiles: newTiles,
  };
}

export const genInitialState = (dimension: number): GameState => {
  const doubleDimension = dimension * dimension;
  const topLimit = [...Array(dimension)].map((value, index) => index);
  const bottomLimit = [...Array(dimension)].map((value, index) => doubleDimension - (index + 1));
  const leftLimit = [...Array(dimension)].map((value, index) => index * dimension);
  const rightLimit = [...Array(dimension)].map((value, index) => index * dimension + (dimension - 1));

  return {
    dimension,
    moves: {
      up: {
        nextTile: -dimension,
        start: topLimit,
        stop: bottomLimit,
      },
      down: {
        nextTile: dimension,
        start: bottomLimit,
        stop: topLimit,
      },
      right: {
        nextTile: 1,
        start: rightLimit,
        stop: leftLimit,
      },
      left: {
        nextTile: -1,
        start: leftLimit,
        stop: rightLimit,
      }
    },
    tiles: genNewTiles([...Array(dimension * dimension)].map(() => ({ value: 0 })), dimension),
    actions: {
      ArrowUp: (state: GameState) => move(state, 'up'),
      ArrowDown: (state: GameState) => move(state, 'down'),
      ArrowLeft: (state: GameState) => move(state, 'left'),
      ArrowRight: (state: GameState) => move(state, 'right'),
    }
  }
}