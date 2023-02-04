<script lang="ts" context="module">
  export const SETTINGSPANELS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy, getContext } from 'svelte';
	import { writable } from 'svelte/store';

  export let show: boolean = false;
  export let onSave: () => void;

	const panels: string[] = [];
	const selected = writable<string>('');
  const available = writable<string[]>([]);

	setContext(SETTINGSPANELS, {
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

{#if show}
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[40vw] h-[70vh]">
        <div class="flex h-full">
          <div class="flex flex-col text-stone-400 p-8 w-[40%] h-full bg-stone-100">
            <div class="flex">
              <span class="material-symbols-outlined block mr-4 py-1">settings</span>
              <h1 class="text-2xl">Settings</h1>
            </div>
            <div class="flex-grow py-8">
              <ul class="px-4">
                {#each $available as panel}
                  <li class="{$selected === panel ? 'text-stone-700' : ''}">
                    <button on:click={() => selected.set(panel)} class="py-2">{panel}</button>
                  </li>
                {/each}
              </ul>
            </div>
            <div class="">
              <button on:click={onSave} type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-stone-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
              <button on:click={() => {show = false}} type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
          <div class="w-[60%] flex-col px-8">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
