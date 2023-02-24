<script lang="ts">
  import Page from '@theme/Page.svelte';
  import PageWrapper from '@components/common/Page.svelte';
  import { PageStore } from './page';
  import type { Entity } from '@lib/interfaces';

  export let entity: Entity<any>;
  export let navigation: any;

  let {entity: page} = PageStore.instance(entity);
</script>

<PageWrapper bind:page={$page.data}>
  <Page bind:data={$page.data} sitemap={navigation}>
    <slot/>
  </Page>
</PageWrapper>
