<script lang="ts">
  import type { Page } from "src/content/config";
  import { Action, Button,  ExpandAdd, Input, ListItem, List, Select, TitleBar, Message, Scrollable } from "src/editor";
  import { createEventDispatcher } from 'svelte';

  export let page: Page;

	const dispatch = createEventDispatcher();
  let tag: string = '';
  let showAdd = false;

  function onAddTag() {
    page.tags = [...page.tags || [], tag];
  }

  function onDeleteTag(tag: string) {
    page.tags = page.tags?.filter(t => t !== tag);
  }

  const statusOptions = [
    { name: 'Published', icon: 'task_alt', value: false },
    { name: 'Draft', icon: 'draft', value: true },
  ]
</script>

<Scrollable>
  <Select label="Status" bind:value={page.draft} options={statusOptions} singleRow />
  <Button icon="text_snippet" label="Content" on:click={() => dispatch('content')}></Button>
  <Button icon="title" label="Typography" on:click={() => dispatch('typography')}></Button>
  <Button icon="palette" label="Colors" on:click={() => dispatch('colors')}></Button>
</Scrollable>

<div class="">
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

  {#if (page.tags || []).length === 0}
    <Message icon="info">This page has no tags yet</Message>
  {/if}
</div>