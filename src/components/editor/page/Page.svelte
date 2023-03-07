<script lang="ts">
  import type { Page } from "src/content/config";
  import { Action, ExpandAdd, Input, ListItem, List, SelectGroup, SelectGroupOption, TitleBar } from "src/editor";

  export let page: Page;

  let status = page.draft ? 'draft' : 'published';
  let tag: string = '';
  let showAdd = false;

  $: {
    page.draft = status !== 'published';
  }

  function onAddTag() {
    page.tags = [...page.tags || [], tag];
  }

  function onDeleteTag(tag: string) {
    page.tags = page.tags?.filter(t => t !== tag);
  }
</script>

<div class="mb-8">
  <SelectGroup bind:selected={status}>
    <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
    <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
  </SelectGroup>
</div>

<TitleBar title="tags">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} onAdd={() => { onAddTag(); showAdd = false }}>
  <Input placeholder="Tag" bind:value={tag} />
</ExpandAdd>

<List class="mb-8">
  {#each page.tags || [] as tag}
    <ListItem icon="tag">
      {tag}
      <Action slot="actions" icon={"delete"} onClick={() => onDeleteTag(tag)}/>
    </ListItem>
  {/each}
</List>