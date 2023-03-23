<script lang="ts">
  import { Button, Select } from "src/editor";

  export let template: any;
  export let panel: any;

  const textAlignOptions = [
    { name: 'Left', icon: 'format_align_left', value: "left" },
    { name: 'Center', icon: 'format_align_center', value: "center" },
    { name: 'Right', icon: 'format_align_right', value: "right" },
  ];
</script>

<Select label="Text align" bind:value={template.textAlign} options={textAlignOptions} singleRow/>

<Button icon="title" label="Heading" on:click={() => {panel = 'heading'}}>
  <span slot="value">{template.fontFamily.h1}</span>
</Button>

<Button icon="format_paragraph" label="Paragraph" on:click={() => {panel = 'paragraph'}}>
  <span slot="value">{template.fontFamily.p}</span>
</Button>

<Button icon="link" label="Button" on:click={() => {panel = 'button'}}>
  <span slot="value">{template.fontFamily.button}</span>
</Button>
