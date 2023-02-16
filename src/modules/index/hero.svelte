<script lang="ts">
  import Hero from '@theme/Hero.svelte';
  import { PageStore } from '../page/page';
  import type { Entity } from '@lib/interfaces';

  export let data: any;
  export let page: Entity<any>;
  export let navigation: any;

  let {entity: storedPage} = PageStore.instance(page);
</script>

<Hero bind:data={data} bind:page={$storedPage.data} navigation={navigation}>
  <slot/>
</Hero>
