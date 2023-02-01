<script lang="ts">
  export let post: any;
</script>

<textarea id="description" class="w-full bg-transparent placeholder-stone-400 focus:outline-none focus:text-stone-700" rows={10} bind:value={post.description} />
