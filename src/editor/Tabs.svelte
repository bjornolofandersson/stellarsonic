<script lang="ts" context="module">
  export const TABS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const items: string[] = [];
	const selected = writable<string | undefined>();

	setContext(TABS, {
		registerTab: (item: string) => {
			items.push(item);
      selected.set(items[0]);

			onDestroy(() => {
				const i = items.indexOf(item);
				items.splice(i, 1);
				selected.update(current => current === item ? (items[i] || items[items.length - 1]) : current);
			});
		},
    selectTab: (item: any) => {
			selected.set(item);
		},
    selected,
	});
</script>

<div class="text-sm flex gap-4 mb-8">
  {#each items as tab}
    <button 
      on:click={() => { $selected = tab }}
      class="capitalize border-b-2 { tab === $selected ? 'border-stone-600' : 'opacity-50'}">{tab}</button>
  {/each}
</div>

<slot />