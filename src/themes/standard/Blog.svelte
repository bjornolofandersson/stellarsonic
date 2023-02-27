<script lang="ts">
  import { BlogPage } from "@modules/blog/blog";
  import Paginator from "./common/Paginator.svelte";
  import PostPreview from "./PostPreview.svelte";
    import Preview from "./Preview.svelte";

  export let page: BlogPage<any>;
  export let theme: any;
</script>

<div class="bg-palette-1">
  <slot name="header"/>

  <div class="w-full py-12 bg-palette-2">
    <ul class="flex justify-center text-white text-l">
      <!--
      {#each genres as genre}
        <li class="px-4">{genre}</li>
      {/each}
      -->
    </ul>
  </div>

  <div class="container mx-auto px-20">
    <section class="pb-20 pt-12">
      <Paginator page={page}/>
    </section>

    <section class="grid md:grid-cols-1 lg:grid-cols-1 gap-6 mb-48">
      {#each page.posts as {slug, data, collection}, i}
        <Preview data={data} flip={i % 2 === 1} />
        <!--<PostPreview post={data} slug={slug} collection={collection} background={theme.layout === 'alternate'} />-->
      {/each}
    </section>

  </div>

  <footer class="h-48 w-full bg-palette-3">
    <div class="container mx-auto px-20">

    </div>
  </footer>
</div>
