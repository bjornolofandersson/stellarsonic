<script lang="ts">
  import Paginator from '@theme/common/Paginator.svelte';

  export let genres: string[];
  export let page: any;
</script>

<div class="bg-white">
  <slot name="header"/>

  <div class="w-full py-12 bg-light-accent dark:bg-dark-accent">
    <ul class="flex justify-center text-white text-l">
      {#each genres as genre}
        <li class="px-4">{genre}</li>
      {/each}
    </ul>
  </div>

  <div class="container mx-auto">
    <section class="pb-20 pt-12">
      {#if page.lastPage !== 1}
        <Paginator page={page} path="/mixes" />
      {/if}
    </section>

    <section class="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
      <slot name="posts"/>
    </section>
  </div>
</div>
