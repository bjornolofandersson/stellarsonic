<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Sidebar.svelte';
  import BackArrow from "./BackArrow.svelte";
  
  export let name: string;
  export let parent: string | undefined = undefined;

	const { registerPanel, selectPanel, selected, back, direction } = getContext<any>(PANELS);

	registerPanel({name, parent});
</script>

{#if $selected === name}
  <div class="absolute overflow-hidden max-h-full h-full w-full px-8 pb-8 flex flex-col"
    in:fly|local={{ x: $direction, duration: 500, easing: quintOut }}
    out:fly|local={{ x: -$direction, duration: 500, easing: quintOut }}
  >
    {#if parent}
    <BackArrow title={name} on:click={() => selectPanel(parent)}/>
    {/if}
    <slot/>
  </div>
{/if}
