<script lang="ts">
  import Gallery from '@theme/Gallery.svelte';
  import type { Entity } from '@lib/interfaces';
  import * as store from '@lib/store';


  export let entity: Entity<any>;
  export let site: any;
  export let previews: any[];

  const g = store.loadEntity(entity);
  store.site.set(site);
  const s = store.site;
</script>

<Gallery data={$g.data} site={$s} previews={previews}/>
