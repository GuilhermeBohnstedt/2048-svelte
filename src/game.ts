import type { GameState, Tablet, Row, TileContent } from "./models";
import { genNewTileValue, isEmptyTile, transpose, reverse } from "./utils";

const genRow = (dimension: number): Row =>
  [...Array<TileContent>(dimension).keys()].map(() => ({
    value: 0,
    merged: false,
    new: false,
    swipe: false,
  }));

const genTablet = (dimension: number): Tablet =>
  [...Array<Row>(dimension).keys()].map((rowIndex) => genRow(dimension));

const hasEmptyTiles = (tablet: Tablet): boolean =>
  tablet.filter((row) => row.filter((tile) => isEmptyTile(tile)).length > 0)
    .length > 0;

const populateNewTile = (arr: Tablet, row: number, tile: number): Tablet => {
  return [
    ...arr.slice(0, row),
    [
      ...arr[row].slice(0, tile),
      {
        ...arr[row][tile],
        value: genNewTileValue(),
        new: true,
        position: { top: row, left: tile },
      },
      ...arr[row].slice(tile + 1, arr[row].length),
    ],
    ...arr.slice(row + 1, arr.length),
  ];
};

const reposition = (tablet: Tablet): Tablet => {
  return tablet.map((row, rowIndex) =>
    row.map((tile, tileIndex) => ({
      ...tile,
      new: false,
      ...(tile.position ? { prevPosition: tile.position } : {}),
      ...(tile.value > 0
        ? { position: { top: rowIndex, left: tileIndex } }
        : {}),
    }))
  );
};

export const genNewTiles = (tablet: Tablet): Tablet => {
  if (!hasEmptyTiles(tablet)) return tablet;

  const randomRow = Math.floor(Math.random() * tablet.length);
  const randomTile = Math.floor(Math.random() * tablet.length);

  return isEmptyTile(tablet[randomRow][randomTile])
    ? populateNewTile(tablet, randomRow, randomTile)
    : genNewTiles(tablet);
};

const merge = (row: Row): Row => {
  const current = row[0];
  const next = row[1];
  const canMerge =
    Boolean(current) && Boolean(next) && current.value === next.value;
  const newRow = row.slice(canMerge ? 2 : 1);
  return [
    ...(canMerge
      ? [{ ...current, value: current.value + 1, merged: true }]
      : [...(Boolean(current) ? [current] : [])]),
    ...(newRow.length > 1
      ? merge(newRow)
      : Boolean(next) && !canMerge
        ? [next]
        : newRow),
  ];
};

const normalize = (tablet: Tablet): Tablet => {
  return tablet.map((row, rowIndex) => {
    const noZeroTiles = row.filter((tile) => !isEmptyTile(tile));
    const merged = merge(noZeroTiles);
    return [...merged, ...genRow(tablet.length - merged.length)];
  });
};

const getScore = (tablet: Tablet) => tablet.reduce((score: number, row: Row) =>
  row.reduce((rowScore: number, tile: TileContent) => (tile.value > 0 ? 2 ** tile.value : 0) + rowScore, 0) + score
  , 0)

const nextState = (state: GameState, newTablet: Tablet) => ({
  ...state,
  finished: false,
  score: getScore(newTablet),
  tablet: newTablet,
});

export const genInitialState = (dimension: number): GameState => {
  return {
    dimension,
    score: 0,
    finished: false,
    tablet: genNewTiles(genTablet(dimension)),
    actions: {
      ArrowUp: (state: GameState) =>
        nextState(
          state,
          genNewTiles(reposition(transpose(normalize(transpose(state.tablet)))))
        ),
      ArrowDown: (state: GameState) =>
        nextState(
          state,
          genNewTiles(
            reposition(
              transpose(normalize(transpose(state.tablet.reverse()))).reverse()
            )
          )
        ),
      ArrowLeft: (state: GameState) =>
        nextState(state, genNewTiles(reposition(normalize(state.tablet)))),
      ArrowRight: (state: GameState) =>
        nextState(
          state,
          genNewTiles(reposition(reverse(normalize(reverse(state.tablet)))))
        ),
    },
  };
};
