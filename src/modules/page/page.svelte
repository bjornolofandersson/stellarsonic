<script lang="ts">
  import Page from '@theme/Page.svelte';
  import type { Entity } from '@lib/interfaces';
  import { loadEntity } from '@lib/store';

  export let entity: Entity<any>;
  export let navigation: any;

  const page = loadEntity(entity);
</script>

<Page data={$page.data} sitemap={navigation}>
  <slot/>
</Page>
