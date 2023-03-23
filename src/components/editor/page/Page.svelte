<script lang="ts">
  import type { Page } from "src/content/config";
  import { Action, ExpandAdd, Input, ListItem, List, TitleBar, Message } from "src/editor";
  import Button from "src/editor/Button.svelte";
  import ButtonExpand from "src/editor/ButtonExpand.svelte";
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
  <ButtonExpand icon="task_alt" label="Status">
    <div slot="value">
      <span class="capitalize">{status}</span>
    </div>
    <div class="flex justify-start w-full gap-4">
      {#each ['draft', 'published'] as s}
        <button on:click={() => {status = s}} class="flex w-full gap-4 p-4 shadow rounded {status === s ? 'bg-stone-100 shadow-lg' : 'bg-stone-200'}">
          <span class="text-sm capitalize">{s}</span>
        </button>
      {/each}
    </div>
  </ButtonExpand>
  <Button icon="text_snippet" label="Content" on:click={() => dispatch('content')}></Button>
  <Button icon="title" label="Typography" on:click={() => dispatch('typography')}></Button>
  <Button icon="palette" label="Colors" on:click={() => dispatch('colors')}></Button>
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