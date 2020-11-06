<script lang="ts">
  import type { Tablet } from "../models";
  export let tablet: Tablet;
  import Tile from "./Tile.svelte";
</script>

<style>
  .grid {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
    grid-auto-flow: row;
  }
  .wrapper {
    position: relative;
    padding: 15px;
    background-color: #bbada0;
    border-radius: 6px;
  }

  .tiles {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .box {
    background-color: #cdc1b4;
  }
</style>

<div class="grid wrapper">
  {#each [...Array(tablet.length ** 2).keys()] as box}
    <div class="box box-{box}" />
  {/each}
  <div class="tiles">
    {#each tablet.flatMap((row) => row) as tile}
      {#if tile.position}
        <Tile {tile} />
      {/if}
    {/each}
  </div>
</div>
