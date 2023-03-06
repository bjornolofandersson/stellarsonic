<script lang="ts">
  import ColorSelect from "src/editor/ColorSelect.svelte";

  export let title: string;
  export let colors: any;
  export let palette: any;
</script>
    

<h1 class="text-sm mt-20 font-bold">{title}</h1>
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
