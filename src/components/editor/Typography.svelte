<script lang="ts">
  import { ExpandRight, List, ListItem } from "src/editor";
  import ExpandSelect from "src/editor/ExpandSelect.svelte";

  export let template: any;
  export let panel: any;

  function alignIcon(align: string) {
    switch (align) {
      case 'left': return 'format_align_left';
      case 'right': return 'format_align_right';
      case 'center': return 'format_align_center';
    }
    return '';
  }
</script>

<ExpandSelect icon={alignIcon(template.textAlign)} label="Text align">
  <div slot="value">
    <span class="capitalize">{template.textAlign}</span>
  </div>

  <div class="-mr-4 -ml-4 -mb-4 -mt-4">
    <List>
      {#each ['left', 'center', 'right'] as align}
      <ListItem onClick={() => {template.textAlign = align}} active={template.textAlign === align} icon={alignIcon(align)}>{align}</ListItem>
      {/each}
    </List>
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
