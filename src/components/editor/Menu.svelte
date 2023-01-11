<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let items: string[];
  export let onSelect: (item: string) => void;
</script>

<div class="absolute w-full px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
  <ul class="font-primary mt-8 text-2xl text-stone-500 font-bold">
    {#each items as item}
      <li class="py-2">
        <button on:click={() => onSelect(item)} class="hover:text-stone-700">{item}</button>
      </li>
    {/each}
  </ul>
</div>


