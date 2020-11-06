<script lang="ts">
  export let dimension: number;
  export let title: string;

  import Tablet from "./components/Tablet.svelte";
  import Header from "./components/Header.svelte";
  import { onMount } from "svelte";

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

  h1 {
    font-size: 80px;
    margin: 0;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<main>
  <h1>{title}</h1>
  {#if gameState}
    <Header value={gameState.score} on:click={handleNewGame} />
    <Tablet tablet={gameState.tablet} />
  {/if}
</main>
