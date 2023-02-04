<script lang="ts" context="module">
  export const PANELS: any = {};
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { setContext, onDestroy, getContext } from 'svelte';
	import { writable } from 'svelte/store';
  import PageContainer from "./PageContainer.svelte";

  export let pageTitle: string;
  export let onSave: () => void;
  export let showPreview: boolean = true;
  export let panel: string = 'main';

	const panels: string[] = [];
	const selected = writable<string | undefined>(panel);

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
    selectPanel: (p: any) => {
			selected.set(p);
      panel = p;
		},
    selected,
	});
</script>

<div class="bg-stone-300 fixed w-screen h-screen">
  <div class="w-[512px] h-full absolute text-stone-700 font-editor">
    <slot/>
  </div>

  {#if showPreview}
    <div transition:fade={{ duration: 500, easing: quintOut }}>
      <PageContainer bind:title={pageTitle} onSave={onSave}>
        <slot name="preview"/>
      </PageContainer>
    </div>
  {/if}
</div>
