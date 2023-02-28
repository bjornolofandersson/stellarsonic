<script lang="ts">
  import { BlogPage } from './blog';
  import Blog from '@theme/Blog.svelte';
  import type { Entity } from "@lib/interfaces";

  export let page: BlogPage<any>;
  export let entity: Entity<any>;

</script>

<Blog page={page} />
