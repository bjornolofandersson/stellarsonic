<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  export let value: number;
  export let label: string;
  export let palette: string[];

  let expanded = false;
</script>

<div class="">
  <button on:click={() => {expanded = !expanded}} class="flex justify-between mt-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff]">
    <span>{label}</span>
    <div class="flex gap-4">
      <span class="inline-block w-6 h-6 rounded border border-stone-700" style="background-color: {palette[value]};"></span>
      <span class="material-symbols-outlined">{expanded ? 'expand_less' : 'expand_more'}</span>
    </div>
  </button>
  {#if expanded}
    <div class="flex justify-start gap-4 bg-[#00000010] px-12 py-4 -ml-8 -mr-8" transition:slide={{ duration: 200, easing: quintOut }}>
      {#each palette as color, i}
        <button on:click={() => {value = i}} class="inline-block w-6 h-6 rounded border border-stone-700" style="background-color: {color};"></button>
      {/each}
    </div>
  {/if}
</div>
