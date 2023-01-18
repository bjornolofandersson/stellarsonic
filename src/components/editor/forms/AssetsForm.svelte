<script lang="ts">
  import TextInput from '../common/TextInput.svelte';

  export let post: any;
  export let assets: string[];

  function selectImage(url: string) {
    post.image = url;
  }

  let images = assets.filter(file => ['jpg', 'png'].includes(file.split('.').pop() as string));
</script>

<h2 class="mt-8 text-xl border-b border-stone-400">Image</h2>
<div class="py-4 grid grid-cols-3 gap-4">
  {#each images as image}
    <button on:click={() => selectImage(image)}
      class="overflow-hidden relative aspect-square border-4 {image === post.image ? 'border-white' : 'border-transparent'}"
      style="padding-bottom: 100%">
      <img class="absolute w-full h-full object-cover" src={image} alt=""/>
    </button>
  {/each}
</div>
<TextInput id="image" label="URL" bind:value={post.image} />

<h2 class="mt-8 text-xl border-b border-stone-400">Audio</h2>
<TextInput id="audio" label="URL" bind:value={post.audio} />
