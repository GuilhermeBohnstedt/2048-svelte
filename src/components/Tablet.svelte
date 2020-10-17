<script lang="ts">
  import { onMount } from "svelte";

  export let dimension: number;
  import type { GameState } from "../models";
  import Tile from "./Tile.svelte";
  import { genInitialState } from "../game";

  let gameState: GameState;

  onMount(() => {
    gameState = genInitialState(dimension);
    console.log(gameState);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (gameState.actions[event.key]) {
      gameState.tablet = gameState.actions[event.key](gameState.tablet);
    console.log(gameState);

    }
  };
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
    height: calc(100% - 30px);
    width: calc(100% - 30px);
    padding: 15px;
  }

  .box {
    background-color: #cdc1b4;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if gameState}
  <div class="grid wrapper">
    {#each [...Array(gameState.tablet.length ** 2).keys()] as box}
      <div class="box box-{box}" />
    {/each}
    <div class="tiles">
      {#each gameState.tablet.flatMap((row) => row) as tile}
        <Tile {tile} />
      {/each}
    </div>
  </div>
{/if}
