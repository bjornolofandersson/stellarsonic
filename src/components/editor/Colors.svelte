<script lang="ts">
  import { Palette, Scrollable, SelectGroup, SelectGroupOption } from "src/editor";
  import ColorSelect from "src/editor/ColorSelect.svelte";

  export let page: any;
  export let colors: any;
  export let palette: any;
</script>
    
<Scrollable>
  <SelectGroup bind:selected={page.data.menu}>
    <SelectGroupOption id="light" icon="light_mode">Light</SelectGroupOption>
    <SelectGroupOption id="dark" icon="dark_mode">Dark</SelectGroupOption>
  </SelectGroup>

  <h1 class="text-sm p-4 mt-4 -mb-3 opacity-50">Palette</h1>
  <Palette bind:colors={palette} />

  <h1 class="text-sm text-stone-600 mb-4 mt-8">Colors</h1>
  <ColorSelect label="Background primary"
      bind:value={colors.background.primary}
      palette={palette}
  />
  <ColorSelect label="Background secondary"
      bind:value={colors.background.secondary}
      palette={palette}
  />
  <ColorSelect label="Background tertiary"
      bind:value={colors.background.tertiary}
      palette={palette}
  />
  <ColorSelect label="Background article"
      bind:value={colors.background.article}
      palette={palette}
  />
  <ColorSelect label="Text Heading 1"
      bind:value={colors.text.h1}
      palette={palette}
  />
  <ColorSelect label="Text Heading 2"
      bind:value={colors.text.h2}
      palette={palette}
  />
  <ColorSelect label="Text Paragraph"
      bind:value={colors.text.p}
      palette={palette}
  />
  <ColorSelect label="Article Text Paragraph"
      bind:value={colors.textArticle.p}
      palette={palette}
  />
</Scrollable>