<script lang="ts">
  import { Palette } from "src/editor";
  import ColorSelect from "src/editor/ColorSelect.svelte";

  export let colors: any;
  export let palette: any;
</script>
    
<Palette bind:colors={palette} />

<ColorSelect label="Background Primary"
    bind:value={colors.background.primary}
    palette={palette}
/>
<ColorSelect label="Background Secondary"
    bind:value={colors.background.secondary}
    palette={palette}
/>
<ColorSelect label="Background Tertiary"
    bind:value={colors.background.tertiary}
    palette={palette}
/>
<ColorSelect label="Background Article"
    bind:value={colors.background.article}
    palette={palette}
/>
<ColorSelect label="Heading 1"
    bind:value={colors.text.h1}
    palette={palette}
/>
<ColorSelect label="Heading 2"
    bind:value={colors.text.h2}
    palette={palette}
/>
<ColorSelect label="Paragraph"
    bind:value={colors.text.p}
    palette={palette}
/>
<ColorSelect label="Article Heading 1"
    bind:value={colors.textArticle.h1}
    palette={palette}
/>
<ColorSelect label="Article Heading 2"
    bind:value={colors.textArticle.h2}
    palette={palette}
/>
<ColorSelect label="Article Link"
    bind:value={colors.textArticle.a}
    palette={palette}
/>
<ColorSelect label="Article Paragraph"
    bind:value={colors.textArticle.p}
    palette={palette}
/>