<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let items: any[];
  export let onSelect: (item: string) => void;
</script>

<div class="absolute w-full px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
  <ul class="font-primary mt-8 text-2xl text-stone-500">
    {#each items as item}
      <li class="py-2">
        <button on:click={() => onSelect(item.name)} class="hover:text-stone-700 border-b border-[#00000020] w-full text-left p-4">
          <span class="material-symbols-outlined mr-4">{item.icon}</span>
          {item.name}
        </button>
      </li>
    {/each}
  </ul>
</div>


