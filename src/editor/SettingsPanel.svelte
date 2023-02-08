<script lang="ts">
  import { getContext } from "svelte";
	import { PANELS } from './SettingsModal.svelte';
  
  export let name: string;

	const { registerPanel, selected } = getContext<any>(PANELS);

	registerPanel(name);
</script>

{#if $selected === name}
  <div class="p-8">
    <slot/>
  </div>
{/if}
