<script lang="ts">
  import type { Entity } from '@lib/interfaces';
  import Input from 'src/editor/Input.svelte';
  import { loadEntity } from '@lib/store';
  import TitleBar from 'src/editor/TitleBar.svelte';
  import Action from 'src/editor/Action.svelte';
  import { ExpandAdd, LinkListItem, List } from 'src/editor';

  export let entity: Entity<any>;

  let showAdd = false;

  let cta: any = { label: '', url: ''};

  function onDeleteCTA(cta: any) {
    $g.data.cta = $g.data.cta.filter((c: any) => c !== cta);
  }

  function onAddCTA() {
    $g.data.cta = [...$g.data.cta, {label: cta.label, url: cta.url}];
    cta = { label: '', url: '' };
  }

  const g = loadEntity(entity);
</script>

<TitleBar title="calls to action">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} onAdd={() => { onAddCTA(); showAdd = false }}>
  <Input placeholder="Label" bind:value={cta.label} />
  <Input placeholder="URL" bind:value={cta.url} />
</ExpandAdd>

<List class="mb-8">
  {#each $g.data.cta as cta}
    <LinkListItem icon="link" url={cta.url}>
      {cta.label}
      <Action slot="actions" icon={"delete"} onClick={() => onDeleteCTA(cta)}/>
    </LinkListItem>
  {/each}
</List>
