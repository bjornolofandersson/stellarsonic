<script lang="ts">
  import Gallery from '@theme/Gallery.svelte';
  import type { Entity } from '@lib/interfaces';
  import { loadEntity } from '@lib/store';

  export let entity: Entity<any>;
  export let navigation: any;
  export let previews: any[];

  const g = loadEntity(entity);
</script>

<Gallery data={$g.data} navigation={navigation} previews={previews}/>
