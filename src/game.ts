import type { TileContent } from "./models";

const changeTile = (arr: Array<TileContent>, from: number, to: number) => {
  const array = [...arr];
  const [elementInFrom] = arr.slice(from, from + 1);
  const [elementInTo] = arr.slice(to, to + 1);

  array.splice(from, 1, elementInTo);
  array.splice(to, 1, elementInFrom);

  return array;
}

const isEmptyTile = (tile: TileContent): boolean => tile.value === 0;

const getNextUpEmptyTile = (arr: Array<TileContent>, index: number): number => {
  const nextTile: number = index - 4;
  return ![0,1,2,3].includes(index) && isEmptyTile(arr[nextTile]) ? getNextUpEmptyTile(arr, nextTile) : index;
}

export const moveUp = (tiles: Array<TileContent>): Array<TileContent> => {
  return tiles.reduce((acc: Array<TileContent>, tile: TileContent, index: number) => {
    const isMoveableTile = !isEmptyTile(tile);
    const moveToTileIndex: number = isMoveableTile ? getNextUpEmptyTile(acc, index) : index;

    return moveToTileIndex !== index ? changeTile(acc, index, moveToTileIndex) : acc;
  }, tiles);
}

const getNextDownEmptyTile = (arr: Array<TileContent>, index: number): number => {
  const nextTile: number = index + 4;
  return ![12,13,14,15].includes(index) && isEmptyTile(arr[nextTile]) ? getNextDownEmptyTile(arr, nextTile) : index;
}

export const moveDown = (tiles: Array<TileContent>): Array<TileContent> => {
  return tiles.reduce((acc: Array<TileContent>, tile: TileContent, index: number) => {
    const isMoveableTile = !isEmptyTile(tile);
    const moveToTileIndex: number = isMoveableTile ? getNextDownEmptyTile(acc, index) : index;

    return moveToTileIndex !== index ? changeTile(acc, index, moveToTileIndex) : acc;
  }, tiles);
}

const getNextLeftEmptyTile = (arr: Array<TileContent>, index: number): number => {
  const nextTile: number = index - 1;
  return ![0,4,8,12].includes(index) && isEmptyTile(arr[nextTile]) ? getNextLeftEmptyTile(arr, nextTile) : index;
}

export const moveLeft = (tiles: Array<TileContent>): Array<TileContent> => {
  return tiles.reduce((acc: Array<TileContent>, tile: TileContent, index: number) => {
    const isMoveableTile = !isEmptyTile(tile);  
    const moveToTileIndex: number = isMoveableTile ? getNextLeftEmptyTile(acc, index) : index;

    return moveToTileIndex !== index ? changeTile(acc, index, moveToTileIndex) : acc;
  }, tiles);
}

const getNextRightEmptyTile = (arr: Array<TileContent>, index: number): number => {
  const nextTile: number = index + 1;
  return ![3,7,11,15].includes(index) && isEmptyTile(arr[nextTile]) ? getNextRightEmptyTile(arr, nextTile) : index;
}

export const moveRight = (tiles: Array<TileContent>): Array<TileContent> => {
  return tiles.reduce((acc: Array<TileContent>, tile: TileContent, index: number) => {
    const isMoveableTile = !isEmptyTile(tile);  
    const moveToTileIndex: number = isMoveableTile ? getNextRightEmptyTile(acc, index) : index;

    return moveToTileIndex !== index ? changeTile(acc, index, moveToTileIndex) : acc;
  }, tiles);

}
