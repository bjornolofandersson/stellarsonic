<script lang="ts">
  import type { BlogPage } from './blog';
  import Blog from '@theme/Blog.svelte';
  import type { Entity } from "@lib/interfaces";

  export let page: BlogPage<any>;
  export let entity: Entity<any>;
  export let site: any;

</script>

<Blog page={page} site={site} />
