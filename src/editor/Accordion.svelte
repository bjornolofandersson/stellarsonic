<script lang="ts" context="module">
  export const ITEMS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const items: any[] = [];
	const selected = writable(null);

	setContext(ITEMS, {
		registerItem: (item: any) => {
			items.push(item);

			onDestroy(() => {
				const i = items.indexOf(item);
				items.splice(i, 1);
				selected.update(current => current === item ? (items[i] || items[items.length - 1]) : current);
			});
		},
    selectItem: (item: any) => {
			selected.set(item);
		},
    selected,
	});
</script>

<ul class="accordion">
	<slot></slot>
</ul>
