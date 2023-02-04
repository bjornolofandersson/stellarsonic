<script lang="ts">
  import ColorInput from "src/editor/ColorInput.svelte";

  export let post: any;
</script>

<ColorInput id="color-primary" label="Primary color" bind:value={post.colors[0]} />
<ColorInput id="color-secondary" label="Secondary color" bind:value={post.colors[1]} />
