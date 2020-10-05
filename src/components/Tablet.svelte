<script lang="ts">
  import { onMount } from "svelte";

  export let dimension: number;
  import type { GameState } from "../models";
  import Tile from "./Tile.svelte";
  import { genInitialState } from "../game";

  let gameState: GameState;

  onMount(() => {
    gameState = genInitialState(dimension);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (gameState.actions[event.key]) {
      gameState.tablet = gameState.actions[event.key](gameState.tablet);
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
    padding: 15px;
    background-color: #bbada0;
    border-radius: 6px;
  }

  .tiles {
    position: absolute;
  }
  .box {
    background-color: #cdc1b4;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if gameState}
  <div class="grid wrapper">
    {#each Array(gameState.tablet.length ** 2) as box}
      <div class="box box-{box}" />
    {/each}
  </div>
  <div class="grid tiles">
    {#each gameState.tablet.flatMap((row) => row) as tile}
      <Tile {tile} />
    {/each}
  </div>
{/if}
