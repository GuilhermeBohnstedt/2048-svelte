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
      gameState = gameState.actions[event.key](gameState);
    }
  };
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

<svelte:window on:keydown={handleKeydown} />

<div class="wrapper">
  {#if gameState}
    {#each gameState.tiles as tile}
      <div class="box">
        <Tile value={tile.value} />
      </div>
    {/each}
  {/if}
</div>
