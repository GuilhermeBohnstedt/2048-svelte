<script lang="ts">
  export let tile: TileContent;
  import type { TileContent } from "../models";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { beforeUpdate } from "svelte";

  const topTweened = tweened(tile.top / 3, {
    duration: 400,
    easing: cubicOut,
  });

  const leftTweened = tweened(tile.left / 3, {
    duration: 400,
    easing: cubicOut,
  });

  beforeUpdate(() => {
		topTweened.set(tile.top / 3);
	});

  // Based on composite rule of three
  $: top = $topTweened * 405 + 15;
  $: left = $leftTweened * 405 + 15;
</script>

<style>
  .tile {
    color: #000;
    text-align: center;
    line-height: 120px;
    position: absolute;
    width: 120px;
    height: 120px;
  }
  .tile-1 {
    background: #eee4da;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
      inset 0 0 0 1px rgba(255, 255, 255, 0);
    font-size: 80px;
  }
  .tile-2 {
    background: #ede0c8;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
      inset 0 0 0 1px rgba(255, 255, 255, 0);
    font-size: 80px;
  }
  .tile-3 {
    color: #f9f6f2;
    background: #f2b179;
    font-size: 80px;
  }
  .tile-4 {
    color: #f9f6f2;
    background: #f59563;
    font-size: 80px;
  }
  .tile-5 {
    color: #f9f6f2;
    background: #f67c5f;
    font-size: 80px;
  }
  .tile-6 {
    color: #f9f6f2;
    background: #f65e3b;
    font-size: 80px;
  }
  .tile-7 {
    color: #f9f6f2;
    background: #edcf72;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381),
      inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
    font-size: 45px;
  }
  .tile-8 {
    color: #f9f6f2;
    background: #edcc61;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746),
      inset 0 0 0 1px rgba(255, 255, 255, 0.19048);
    font-size: 45px;
  }
  .tile-9 {
    color: #f9f6f2;
    background: #edc850;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
    font-size: 45px;
  }
  .tile-10 {
    color: #f9f6f2;
    background: #edc53f;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619),
      inset 0 0 0 1px rgba(255, 255, 255, 0.28571);
    font-size: 35px;
  }
  .tile-11 {
    color: #f9f6f2;
    background: #f46573;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tile-12 {
    color: #f9f6f2;
    background: #f14b61;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tile-13 {
    color: #f9f6f2;
    background: #e9443d;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tile-14 {
    color: #f9f6f2;
    background: #72b3db;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tile-15 {
    color: #f9f6f2;
    background: #5da0e4;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tile-16 {
    color: #f9f6f2;
    background: #027dc0;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
      inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
</style>

{#if tile.value > 0}
  <div id="{tile.id.toString()}" class="tile tile-{tile.value}" style="top: {top}px; left: {left}px;">
    {2 ** tile.value}
  </div>
{/if}
