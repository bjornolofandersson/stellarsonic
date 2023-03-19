<script lang="ts" context="module">
  export const PANELS: any = {};
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

  export let panel: string = 'page';

  const panels: any[] = [];
  const selected = writable<string | undefined>(panel);
  const direction = writable<number>(420);

  let parent: string | undefined = undefined;

  $: {
    const obj = panels.find(p => p.name === $selected);
    if (obj && panel === obj.parent) {
      $direction = -420;
    } else {
      $direction = 420;
    }
    $selected = panel;
  }

  selected.subscribe(s => {
    updateParent();
  });

  function updateParent() {
    const c = panels.find(o => o.name === $selected);
    if (c) {
      parent = c.parent;
    }
  }


	setContext(PANELS, {
		registerPanel: (p: any) => {
			panels.push(p);
			selected.update(current => current || p.name);
      updateParent();
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selected.update(current => current === p.name ? (panels[i] || panels[panel.length - 1]) : current);
			});
		},
    selectPanel: (p: string) => {
      panel = p;
		},
    selected,
    direction,
    panels,
	});
</script>

<div class="flex flex-col h-screen">
  <div class="relative flex-grow">
    <slot/>
  </div>
  <slot name="footer"/>
</div>
