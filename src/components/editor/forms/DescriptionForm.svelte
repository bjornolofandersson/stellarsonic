<script lang="ts">
  export let post: any;
</script>

<label for="description" class="text-xs">Description</label>
<textarea id="description" class="mt-4 w-full bg-transparent placeholder-stone-400 focus:outline-none focus:text-stone-700" rows={10} bind:value={post.description} />
