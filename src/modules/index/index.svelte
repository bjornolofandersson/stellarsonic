<script lang="ts">
  import Index from '@theme/index.svelte';
  import { PageStore } from '../page/page';
  import type { Entity } from '@lib/interfaces';
  import { IndexStore } from '.';

  export let data: any;
  export let page: Entity<any>;
  export let navigation: any;
  export let previews: any[];

  let {entity: storedIndex} = IndexStore.instance(data);
  let {entity: storedPage} = PageStore.instance(page);
</script>

<Index data={$storedIndex.data} page={$storedPage.data} navigation={navigation} previews={previews}/>
