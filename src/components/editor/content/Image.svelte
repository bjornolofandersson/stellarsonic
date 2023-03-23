<script lang="ts">
    import ButtonExpand from "src/editor/ButtonExpand.svelte";
    import Input from "src/editor/Input.svelte";

  export let post: any;
  export let assets: string[];

  function selectImage(url: string) {
    post.image = url;
  }

  let images = assets.filter(file => ['jpg', 'png'].includes(file.split('.').pop() as string));
</script>

<ButtonExpand icon="image" label="Image">
  <label for="url" class="text-xs">Image URL</label>
  <Input id="url" bind:value={post.image}/>
  <div class="py-4 grid grid-cols-3 gap-4">
    {#each images as image}
      <button on:click={() => selectImage(image)}
        class="overflow-hidden relative aspect-square  {image === post.image ? 'shadow-lg' : 'opacity-30'}"
        style="padding-bottom: 100%">
        <img class="absolute w-full h-full object-cover" src={image} alt=""/>
      </button>
    {/each}
  </div>
</ButtonExpand>
