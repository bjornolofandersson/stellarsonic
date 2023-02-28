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
  <div class="absolute overflow-y-auto max-h-full w-full px-8 py-8" transition:fade={{ duration: 500, easing: quintOut }}>
    <slot/>
  </div>
{/if}

<style>
  ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>