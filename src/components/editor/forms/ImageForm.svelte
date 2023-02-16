<script lang="ts">
  export let post: any;
  export let assets: string[];

  function selectImage(url: string) {
    post.image = url;
  }

  let images = assets.filter(file => ['jpg', 'png'].includes(file.split('.').pop() as string));
</script>

<label for="url" class="text-xs">Image URL</label>
<input id="url" class="mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700" placeholder="Subtitle" bind:value={post.image}>
<div class="py-4 grid grid-cols-3 gap-4">
  {#each images as image}
    <button on:click={() => selectImage(image)}
      class="overflow-hidden relative aspect-square  {image === post.image ? 'shadow-lg' : 'opacity-30'}"
      style="padding-bottom: 100%">
      <img class="absolute w-full h-full object-cover" src={image} alt=""/>
    </button>
  {/each}
</div>
