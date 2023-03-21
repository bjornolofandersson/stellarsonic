<script lang="ts">
  import type { Page } from "src/content/config";
  import { Action, ExpandAdd, Input, ListItem, List, SelectGroup, SelectGroupOption, TitleBar, Message } from "src/editor";
  import ExpandRight from "src/editor/ExpandRight.svelte";
    import ExpandSelect from "src/editor/ExpandSelect.svelte";
  import { createEventDispatcher } from 'svelte';

  export let page: Page;

	const dispatch = createEventDispatcher();
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

<div class="flex-grow">
  <ExpandRight icon="text_snippet" label="Content" on:click={() => dispatch('content')}></ExpandRight>
  <ExpandRight icon="title" label="Typography" on:click={() => dispatch('typography')}></ExpandRight>
  <ExpandRight icon="palette" label="Colors" on:click={() => dispatch('colors')}></ExpandRight>
  <ExpandSelect icon="task_alt" label="Status">
    <div slot="value">
      <span class="capitalize">{status}</span>
    </div>
  </ExpandSelect>
</div>

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