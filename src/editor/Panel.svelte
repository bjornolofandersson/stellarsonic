<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Sidebar.svelte';
  
  export let name: string;
  export let parent: string | undefined = undefined;

	const { registerPanel, selectPanel, selected, direction } = getContext<any>(PANELS);

	registerPanel({name, parent});
</script>

{#if $selected === name}
  <div class="absolute overflow-hidden max-h-full h-full w-full px-8 pt-8 flex flex-col"
    in:fly|local={{ x: $direction, duration: 500, easing: quintOut }}
    out:fly|local={{ x: -$direction, duration: 500, easing: quintOut }}
  >
    <div class="flex justify-between w-full mb-8">
      <div class="flex gap-4 text-sm">
        {#if parent}
          <button class="text-stone-400 hover:text-stone-700" on:click={() => selectPanel(parent)}>
            <span class="material-symbols-outlined -mb-1">keyboard_backspace</span>
          </button>
        {/if}
        <h1 class="uppercase opacity-50">
          {name}
        </h1>
      </div>
      <slot name="title" />
    </div>

    <slot/>
  </div>
{/if}
