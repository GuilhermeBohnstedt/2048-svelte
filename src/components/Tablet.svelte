<script lang="ts">
  export let name: string;
  import type { TileContent } from "../models";
import Tile from "./Tile.svelte";

  const tiles: Array<TileContent> = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 },
    { value: 13 },
    { value: 14 },
    { value: 15 },
    { value: 16 },
  ];
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
    <div class="box"><Tile value={tile.value} /></div>
  {/each}
</div>
