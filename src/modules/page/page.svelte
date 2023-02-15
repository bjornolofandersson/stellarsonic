<script lang="ts">
  import Page from '@theme/Page.svelte';
  import { PageStore } from './page';
  import { Entity } from '@lib/interfaces';

  export let entity: Entity<any>;
  export let navigation: any;

  let {entity: page} = PageStore.instance(entity);
</script>

<Page bind:data={$page.data} sitemap={navigation}>
  <slot/>
</Page>
