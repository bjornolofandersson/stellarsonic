<script lang="ts">
  import { Scrollable, SelectGroup, SelectGroupOption } from "src/editor";
    import ExpandSelect from "src/editor/ExpandSelect.svelte";
  import Range from "src/editor/Range.svelte";
  import FontPicker from "./forms/FontPicker.svelte";

  export let template: any;
</script>
  <ExpandSelect label="Text align">
    <div slot="value">
      <span class="capitalize">{template.textAlign}</span>
    </div>
  </ExpandSelect>

  <FontPicker label="Heading"
    bind:family={template.fontFamily.h1}
    bind:weight={template.fontWeight.h1}>
    <Range label="Size" bind:value={template.fontSize.h1} unit="rem" min={1} max={8} step={0.25} />
  </FontPicker>

  <FontPicker label="Paragraph"
    bind:family={template.fontFamily.p}
    bind:weight={template.fontWeight.p}>
    <Range label="Size" bind:value={template.fontSize.p} unit="rem" min={0.5} max={4} step={0.1} />
  </FontPicker>

  <FontPicker label="Button"
    bind:family={template.fontFamily.button}
    bind:weight={template.fontWeight.button}>
    <Range label="Size" bind:value={template.fontSize.button} unit="rem" min={0.5} max={4} step={0.1} />
  </FontPicker>