<script lang="ts">
  export let post: any;
</script>


<h2 class="mt-8 text-xl border-b border-stone-400">Genres</h2>
<ul>
  {#each post.genres as genre}
    <li>{genre}</li>
  {/each}
</ul>

<h2 class="mt-8 text-xl border-b border-stone-400">Tags</h2>
<ul>
  {#each post.tags as tag}
    <li>{tag}</li>
  {/each}
</ul>