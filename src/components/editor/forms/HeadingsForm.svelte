<script lang="ts">
  export let post: any;
  export let context: any;
</script>

<label for="title" class="text-xs">H1</label>
<input id="title" class=" mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700" placeholder="Title" bind:value={post.title}>

<label for="subtitle" class="text-xs">H2</label>
<input id="subtitle" class="mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700" placeholder="Subtitle" bind:value={post.subtitle}>
