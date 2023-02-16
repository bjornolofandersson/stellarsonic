<script lang="ts">
	import { PANELS } from './Sidebar.svelte';
  import { getContext } from 'svelte';

  export let panel: string;

	const { selectPanel, selected } = getContext<any>(PANELS);
</script>

<button on:click={() => {selectPanel(panel)}} class="text-sm p-4 {panel === $selected ? 'font-[600]' : 'opacity-60'}">
  {panel.toUpperCase()}
</button>
