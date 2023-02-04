<script lang="ts">
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { SETTINGSPANELS } from './SettingsModal.svelte';
  
  export let name: string;

	const { registerPanel, selected } = getContext<any>(SETTINGSPANELS);

	registerPanel(name);
</script>

{#if $selected === name}
  <div class="absolute w-full h-full" transition:fade={{ duration: 200, easing: quintOut }}>
    <slot/>
  </div>
{/if}
