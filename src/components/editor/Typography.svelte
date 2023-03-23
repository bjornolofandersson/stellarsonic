<script lang="ts">
  import { Button } from "src/editor";
  import ButtonExpand from "src/editor/ButtonExpand.svelte";

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

<ButtonExpand icon={alignIcon(template.textAlign)} label="Text align">
  <div slot="value">
    <span class="capitalize">{template.textAlign}</span>
  </div>

  <div class="flex justify-between w-full gap-4">
    {#each ['left', 'center', 'right'] as align}
      <button on:click={() => {template.textAlign = align}} class="flex gap-4 p-4 shadow rounded {template.textAlign === align ? 'bg-stone-100 shadow-lg' : 'bg-stone-200'}">
        <span class="material-symbols-outlined text-sm">{alignIcon(align)}</span>
        <span class="text-sm">{align}</span>
      </button>
    {/each}
  </div>
</ButtonExpand>

<Button icon="title" label="Heading" on:click={() => {panel = 'heading'}}>
  <span slot="value">{template.fontFamily.h1}</span>
</Button>

<Button icon="format_paragraph" label="Paragraph" on:click={() => {panel = 'paragraph'}}>
  <span slot="value">{template.fontFamily.p}</span>
</Button>

<Button icon="link" label="Button" on:click={() => {panel = 'button'}}>
  <span slot="value">{template.fontFamily.button}</span>
</Button>
