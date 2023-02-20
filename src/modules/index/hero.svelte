<script lang="ts">
  import Hero from '@theme/Hero.svelte';
  import { PageStore } from '../page/page';
  import type { Entity } from '@lib/interfaces';
  import { IndexStore } from '.';

  export let data: any;
  export let page: Entity<any>;
  export let navigation: any;
  export let section: number;

  let {entity: storedIndex} = IndexStore.instance(data);
  let {entity: storedPage} = PageStore.instance(page);
</script>

<Hero bind:data={$storedIndex.data.sections[section]} bind:page={$storedPage.data} navigation={navigation}>
  <slot/>
</Hero>
