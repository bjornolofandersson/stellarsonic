<script lang="ts">
  import type { Entity } from '@lib/interfaces';
  import Input from 'src/editor/Input.svelte';
  import { loadEntity } from '@lib/store';

  export let entity: Entity<any>;

  const g = loadEntity(entity);
</script>

<label for="cta-label" class="text-xs">Call to action label</label>
<Input id="cta-label" bind:value={$g.data.cta.label} />
<label for="cta-url" class="text-xs">Call to action URL</label>
<Input id="cta-url" bind:value={$g.data.cta.url} />
