<script lang="ts">
  import Input from 'src/editor/Input.svelte';
  import TitleBar from 'src/editor/TitleBar.svelte';
  import Action from 'src/editor/Action.svelte';
  import { ExpandAdd, LinkListItem, List } from 'src/editor';
  import type { Gallery } from './gallery.server';

  export let content: Gallery;

  let showAdd = false;

  let cta: any = { label: '', url: ''};

  function onDeleteCTA(cta: any) {
    content.cta = content.cta.filter((c: any) => c !== cta);
  }

  function onAddCTA() {
    content.cta = [...content.cta, {label: cta.label, url: cta.url}];
    cta = { label: '', url: '' };
  }
</script>

<div class="mb-8">
  <label for="include" class="text-sm uppercase opacity-50">Inclusion tag</label>
  <Input id="include" placeholder="Inclusion tag" bind:value={content.include} />
  <div class="border border-[#00000010] p-4 rounded">
    <span class="text-sm opacity-50">Any page having a tag equal to the one above will be included in the gallery. Press save for changes to apply</span>
  </div>
</div>

<TitleBar title="calls to action">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} onAdd={() => { onAddCTA(); showAdd = false }}>
  <Input placeholder="Label" bind:value={cta.label} />
  <Input placeholder="URL" bind:value={cta.url} />
</ExpandAdd>

<List class="mb-8">
  {#each content.cta as cta}
    <LinkListItem icon="link" url={cta.url}>
      {cta.label}
      <Action slot="actions" icon={"delete"} onClick={() => onDeleteCTA(cta)}/>
    </LinkListItem>
  {/each}
</List>
