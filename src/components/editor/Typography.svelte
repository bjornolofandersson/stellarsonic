<script lang="ts">
  import { ExpandRight } from "src/editor";
  import ExpandSelect from "src/editor/ExpandSelect.svelte";

  export let template: any;
  export let panel: any;
</script>

<ExpandSelect label="Text align">
  <div slot="value">
    <span class="capitalize">{template.textAlign}</span>
  </div>
</ExpandSelect>

<ExpandRight icon="title" label="Heading" on:click={() => {panel = 'heading'}}>
  <span slot="value">{template.fontFamily.h1}</span>
</ExpandRight>

<ExpandRight icon="format_paragraph" label="Paragraph" on:click={() => {panel = 'paragraph'}}>
  <span slot="value">{template.fontFamily.p}</span>
</ExpandRight>

<ExpandRight icon="link" label="Button" on:click={() => {panel = 'button'}}>
  <span slot="value">{template.fontFamily.button}</span>
</ExpandRight>
