<script lang="ts" context="module">
  export const PANELS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy, getContext } from 'svelte';
	import { writable } from 'svelte/store';
  export let panel: string = 'main';

  const panels: string[] = [];
  const selected = writable<string | undefined>(panel);
  const goBack = writable<boolean>(false);

  $: {
    getContext<any>(PANELS).selectPanel(panel);
  }

	setContext(PANELS, {
		registerPanel: (panel: any) => {
			panels.push(panel);
			selected.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selected.update(current => current === panel ? (panels[i] || panels[panel.length - 1]) : current);
			});
		},
    selectPanel: (p: any, back: boolean = false) => {
			selected.set(p);
      goBack.set(back);
      panel = p;
		},
    selected,
    back: goBack,
    panels,
	});
</script>

<div class="flex flex-col h-screen">
  <div>
    <slot name="header"/>
  </div>
  <div class="relative flex-grow">
    <slot/>
  </div>
</div>
