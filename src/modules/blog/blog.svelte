<script lang="ts">
  import { BlogPage, BlogStore } from './blog';
  import Blog from '@theme/Blog.svelte';
  import { Entity } from '@lib/interfaces';

  export let page: BlogPage<any>;
  export let entity: Entity<any>;

  let { entity: blog } = BlogStore.instance(entity);
</script>

<Blog page={page} bind:theme={$blog.data.theme} />
