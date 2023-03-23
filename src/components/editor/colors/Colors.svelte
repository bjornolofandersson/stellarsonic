<script lang="ts">
  import type { Page, Palette, Template } from "src/content/config";
  import { Button, Tab, Tabs, Scrollable, Palette as PaletteComponent } from "src/editor";
  import ColorGroup from "./ColorGroup.svelte";

  export let panel: string;
  export let page: Page;
  export let template: Template;
  export let palette: Palette;
</script>

<Scrollable>
  <Tabs>
    <Tab name="Main">
      <ColorGroup bind:colors={template.colorGroups[0]} bind:palette={palette.colors} />
    </Tab>
    <Tab name="Article">
      <ColorGroup bind:colors={template.colorGroups[1]} bind:palette={palette.colors} />
    </Tab>
  </Tabs>
</Scrollable>

<Button label="Palette" icon="palette" on:click={() => {panel = 'palettes'}}>
  <span slot="value">{page.palette}</span>
</Button>

<PaletteComponent bind:colors={palette.colors} />