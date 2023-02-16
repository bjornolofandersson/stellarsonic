<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Sidebar.svelte';
  import BackArrow from "./BackArrow.svelte";
  
  export let name: string;

	const { registerPanel, selectPanel, selected, panels } = getContext<any>(PANELS);

	registerPanel(name);
</script>

{#if $selected === name}
  <div class="absolute w-full px-8" transition:fade={{ duration: 500, easing: quintOut }}>
    <slot/>
  </div>
{/if}
