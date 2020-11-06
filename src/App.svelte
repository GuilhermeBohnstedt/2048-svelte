<script lang="ts">
  import Tablet from "./components/Tablet.svelte";
  import Header from "./components/Header.svelte";
  import { onMount } from "svelte";

  export let dimension: number;
  import type { GameState } from "./models";
  import { genInitialState } from "./game";

  let gameState: GameState;

  const newGame = () => {
    gameState = genInitialState(dimension);
  };

  onMount(() => {
    newGame();
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (gameState.actions[event.key]) {
      gameState = gameState.actions[event.key](gameState);
    }
  };

  const handleNewGame = () => {
    newGame();
  };
</script>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<main>
  {#if gameState}
    <Header value={gameState.score} on:click={handleNewGame} />
    <Tablet tablet={gameState.tablet} />
  {/if}
</main>
