<script lang="ts">
  import { Input } from "src/editor/";

  export let post: any;
  export let context: {assets: string[]};

  function selectImage(url: string) {
    post.image = url;
  }

  let images = context.assets.filter(file => ['jpg', 'png'].includes(file.split('.').pop() as string));
</script>

<div class="bg-stone-200 shadow-md rounded-md p-4 mt-8">
  <h2 class="text-xl pb-4">Image</h2>
  <div class="py-4 grid grid-cols-3 gap-4">
    {#each images as image}
      <button on:click={() => selectImage(image)}
        class="overflow-hidden relative aspect-square border-4 {image === post.image ? 'border-white' : 'border-transparent'}"
        style="padding-bottom: 100%">
        <img class="absolute w-full h-full object-cover" src={image} alt=""/>
      </button>
    {/each}
  </div>
  <Input type="text" id="image" label="URL" bind:value={post.image} />
</div>

<div class="bg-stone-200 shadow-md rounded-md p-4 mt-8">
  <h2 class="text-xl pb-4">Audio</h2>
  <Input type="text" id="audio" label="URL" bind:value={post.audio} />
</div>
