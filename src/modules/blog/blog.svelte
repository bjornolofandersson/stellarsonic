<script lang="ts">
  import { BlogPage, BlogStore } from './blog';
  import Blog from '@theme/Blog.svelte';

  export let page: BlogPage<any>;
  export let blogData: any;
  export let themeData: any;

  let {theme} = BlogStore.instance('mixtapes', blogData, themeData);
</script>

<Blog page={page} bind:theme={$theme} />
