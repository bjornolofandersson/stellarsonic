<script lang="ts" context="module">
  export const PANELS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
  import SplitModal from './SplitModal.svelte';

  export let show: boolean = false;
  export let onSave: () => void;

	const panels: string[] = [];
	const selected = writable<string>('');
  const available = writable<string[]>([]);

	setContext(PANELS, {
		registerPanel: (panel: any) => {
			panels.push(panel);
      available.set(Array.from(new Set([...panels, panel])))
			selected.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selected.update(current => current === panel ? (panels[i] || panels[panel.length - 1]) : current);
			});
		},
    selectPanel: (p: any) => {
			selected.set(p);
		},
    selected,
	});
</script>

<SplitModal bind:show={show}>
  <div slot="header" class="flex">
    <span class="material-symbols-outlined block mr-4 py-1">settings</span>
    <h1 class="text-2xl">Settings</h1>
  </div>

  <ul slot="sidebar" class="px-4">
    {#each $available as panel}
      <li class="{$selected === panel ? 'text-stone-700' : ''}">
        <button on:click={() => selected.set(panel)} class="py-2">{panel}</button>
      </li>
    {/each}
  </ul>

  <div slot="footer" class="">
    <button on:click={onSave} type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-stone-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
    <button on:click={() => {show = false}} type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
  </div>

  <svelte:fragment slot="content">
    <slot/>
  </svelte:fragment>
</SplitModal>
