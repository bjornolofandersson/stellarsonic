<script lang="ts">
  import type { Page, Palette, Template } from "src/content/config";
  import { ExpandRight, List, ListItem, Palette as PaletteComponent } from "src/editor";
  import ColorGroup from "./ColorGroup.svelte";

  export let panel: string;
  export let page: Page;
  export let template: Template;
  export let palette: Palette;

  let group: string = 'main';

</script>

<div class="flex-grow">
  <div class="flex gap-4 mb-8">
    {#each ['main', 'article'] as g}
      <button 
        on:click={() => { group = g }}
        class="capitalize border-b-2 {g === group ? 'border-stone-600' : 'opacity-50'}">{g}</button>
    {/each}
  </div>

  {#if group === 'main'}
    <ColorGroup bind:colors={template.colorGroups[0]} bind:palette={palette.colors} />
  {/if}

  {#if group === 'article'}
    <ColorGroup bind:colors={template.colorGroups[1]} bind:palette={palette.colors} />
  {/if}
  </div>

  <ExpandRight label="Palette" icon="palette" on:click={() => {panel = 'palettes'}}>
    <span slot="value">{page.palette}</span>
  </ExpandRight>
<PaletteComponent bind:colors={palette.colors} />