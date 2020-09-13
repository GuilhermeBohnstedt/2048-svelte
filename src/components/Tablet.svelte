<script lang="ts">
  import { onMount } from "svelte";

  export let name: string;
  import type { TileContent } from "../models";
  import Tile from "./Tile.svelte";
  import { genNewTileValue } from "../utils";

  let tiles: Array<TileContent> = [...Array(16)].map(() => ({ value: 0 }));

  onMount(() => {
    const randomTiles: number[] = [
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 16),
    ];

    randomTiles.map(
      (rT) => (tiles[rT] = { value: genNewTileValue() } as TileContent)
    );
  });
</script>

<style>
  .wrapper {
    padding: 15px;
    background-color: #bbada0;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
    grid-auto-flow: row;
    border-radius: 6px;
  }
  .box {
    background-color: #cdc1b4;
    color: #000;
    text-align: center;
    line-height: 120px;
  }
</style>

<div class="wrapper">
  {#each tiles as tile}
    <div class="box">
      <Tile value={tile.value} />
    </div>
  {/each}
</div>
