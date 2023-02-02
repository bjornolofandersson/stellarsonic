<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Editor.svelte';
  
  export let name: string;

	const { registerPanel, selectPanel, selected } = getContext<any>(PANELS);

	registerPanel(name);
</script>

{#if $selected === name}
  <div class="absolute w-full px-8" transition:fly={{ x: 512, duration: 500, easing: quintOut }}>
    <div class="flex mt-8">
      <button class="text-stone-400 hover:text-stone-700" on:click={() => selectPanel('main')}>
        <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
      </button>
    </div>

    <div class="flex justify-between text-xl">
      <h2 class="mt-8 text-lg font-[500]">{name.toUpperCase()}</h2>
      <div class="flex">
        <slot name="actions"/>
      </div>
    </div>
    <slot/>
  </div>
{/if}
