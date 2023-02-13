<script lang="ts" context="module">
  export const OPTIONS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy, getContext } from 'svelte';
	import { writable } from 'svelte/store';
  export let selected: string;

  const options: string[] = [];
  const active = writable<string | undefined>(selected);

  $: {
    getContext<any>(OPTIONS).selectOption(selected);
  }

	setContext(OPTIONS, {
		registerOption: (option: any) => {
			options.push(option);
			active.update(current => current || option);
		
			onDestroy(() => {
				const i = options.indexOf(option);
				options.splice(i, 1);
				active.update(current => current === option ? (options[i] || options[option.length - 1]) : current);
			});
		},
    selectOption: (p: any) => {
			active.set(p);
      selected = p;
		},
    selected: active,
	});
</script>

<div class="w-full flex">
  <slot/>
</div>
