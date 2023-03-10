<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import * as api from "@lib/api";
  import type { Page, Palette, Template } from "src/content/config";
  import { List, ListItem, Palette as PaletteComponent } from "src/editor";
  import { onMount } from "svelte";
  import ColorGroup from "./ColorGroup.svelte";
  import ExpandSelect from "src/editor/ExpandSelect.svelte";

  export let page: Page;
  export let template: Template;
  export let palette: Palette;

  let options: Entity<Palette>[] = [];

  onMount(async () => {
    options = await api.collection<Palette>('palettes');
  });
</script>

<div class="mb-8">
  <ExpandSelect label="Palette">
    <span slot="value">{page.palette}</span>

    <List class="-mr-4 -ml-4 -mt-4 -mb-4">
      {#each options as option, i}
        <ListItem icon="palette" active={page.palette === option.id} onClick={() => {page.palette = option.id}}>
          <span>{option.id}</span>
          <ul class="flex shadow-md rounded overflow-hidden" slot="actions">
            {#each option.data.colors as color}
            <li class="inline-block w-8 h-full" style="background-color: {color};"></li>
            {/each}
          </ul>
        </ListItem>
      {/each}
    </List>
  </ExpandSelect>
</div>
    
<PaletteComponent bind:colors={palette.colors} />
<ColorGroup title="Main" bind:colors={template.colorGroups[0]} bind:palette={palette.colors} />
<ColorGroup title="Article" bind:colors={template.colorGroups[1]} bind:palette={palette.colors} />
