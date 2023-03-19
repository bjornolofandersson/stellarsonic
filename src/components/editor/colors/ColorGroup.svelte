<script lang="ts">
  import ColorSelect from "src/editor/ColorSelect.svelte";

  export let colors: any;
  export let palette: any;
</script>
    
<ColorSelect label="Background Primary"
    bind:value={colors.background[0]}
    palette={palette}
/>
<ColorSelect label="Background Accent"
    bind:value={colors.background[1]}
    palette={palette}
/>
<ColorSelect label="Text Primary"
    bind:value={colors.text[0]}
    palette={palette}
/>
<ColorSelect label="Text Accent"
    bind:value={colors.text[1]}
    palette={palette}
/>
