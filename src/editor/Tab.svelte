<script lang="ts">
	import { TABS } from './Tabs.svelte';
  import { getContext } from 'svelte';

  export let name: string;

	const { selected, registerTab } = getContext<any>(TABS);

  registerTab(name);
</script>

{#if name === $selected}
  <slot/>
{/if}
