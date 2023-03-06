<script lang="ts">
  import type { BlogPage } from "@modules/blog/blog";
  import Paginator from "./common/Paginator.svelte";
  import MenuBar from "./MenuBar.svelte";
  import Preview from "./Preview.svelte";

  export let page: BlogPage<any>;
  export let site: any;
</script>

<div class="bg-primary">
  <div class="flex flex-col container mx-auto px-20 h-full">
    <MenuBar site={site} />
  </div>

  <!--
  <div class="w-full py-12 bg-palette-2">
    <div class="container mx-auto px-20">
      <h1 class="text-h1 font-h1 text-2xl">{page.title}</h1>

      <section class="pb-20 pt-12">
        <Paginator page={page}/>
      </section>
    </div>
  </div>
-->

  <div class="container mx-auto px-20">
    <section class="grid md:grid-cols-1 lg:grid-cols-1 gap-6 mb-48">
      {#each page.posts as {slug, data, collection}, i}
        <Preview data={{slug, ...data}} flip={i % 2 === 1} />
        <!--<PostPreview post={data} slug={slug} collection={collection} background={theme.layout === 'alternate'} />-->
      {/each}
    </section>
  </div>

  <footer class="h-48 w-full bg-primary-invert text-primary-invert">
    <div class="container mx-auto px-20">
      <MenuBar site={site} />
    </div>
  </footer>
</div>
