<script lang="ts">
  import ColorInput from '../common/ColorInput.svelte';

  export let post: any;
</script>

<div class="bg-stone-200 shadow-md rounded-md p-4 mt-8">
  <h2 class="text-xl pb-4">Colors</h2>
  <ColorInput id="color-primary" label="Primary color" bind:value={post.colors[0]} />
  <ColorInput id="color-secondary" label="Secondary color" bind:value={post.colors[1]} />
</div>
