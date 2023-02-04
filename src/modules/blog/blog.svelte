<script lang="ts">
  import { BlogPage, BlogStore } from './blog';
  import Blog from '@theme/Blog.svelte';

  export let page: BlogPage<any>;
  export let themeData: any;

  let {theme} = BlogStore.instance(themeData);
</script>

<Blog page={page} bind:theme={$theme} />
