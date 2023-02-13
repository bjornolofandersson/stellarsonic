<script lang="ts">
  import { BlogPage } from "@modules/blog/blog";
  import Paginator from "./common/Paginator.svelte";
  import PostPreview from "./PostPreview.svelte";

  export let page: BlogPage<any>;
  export let theme: any;
</script>

<div class="bg-white">
  <slot name="header"/>

  <div class="w-full py-12 bg-light-accent dark:bg-dark-accent">
    <ul class="flex justify-center text-white text-l">
      <!--
      {#each genres as genre}
        <li class="px-4">{genre}</li>
      {/each}
      -->
    </ul>
  </div>

  <div class="container mx-auto">
    <section class="pb-20 pt-12">
      <Paginator page={page}/>
    </section>

    <section class="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
      {#each page.posts as {slug, data, collection}}
        <PostPreview post={data} slug={slug} collection={collection} background={theme.layout === 'alternate'} />
      {/each}
    </section>
  </div>
</div>
