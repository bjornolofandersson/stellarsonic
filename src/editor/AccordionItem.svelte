<script lang="ts">
  import { getContext } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
	import { ITEMS } from './Accordion.svelte';

  export let icon: string;
  export let name: string;


	const item = {icon, name};
	const { registerItem, selectItem, selected } = getContext<any>(ITEMS);

	registerItem(item);
</script>

{#if item !== $selected}
  <li class="">
    <button on:click={() => {selectItem(item)}} class="hover:text-stone-700 w-full text-left py-3 text-sm">
      <div class="flex">
        <span class="material-symbols-outlined mr-4">{icon}</span>
        <span>{name}</span>
      </div>
    </button>
  </li>
{:else}
  <div class="-ml-8 -mr-8 bg-[#00000007] p-8" transition:slide={{ duration: 200, easing: quintOut }}>
    <div class="flex mb-6 justify-between">
      <button on:click={() => {selectItem({})}} class="flex">
        <span class="material-symbols-outlined mr-4">{item.icon}</span>
        <h1 class="text-sm text-stone-700">{item.name}</h1>
      </button>
    </div>
    <slot/>
  </div>
{/if}
