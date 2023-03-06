<script lang="ts">
  import {
    Action,
    LinkListItem,
    List,
    SettingsModal,
    SettingsPanel,
    Input,
    NumberInput,
    TitleBar,
    ExpandAdd
  } from 'src/editor';
  import type { Blog } from './blog.server';

  export let content: Blog
  export let posts: any[];

  let filteredPosts = posts;
  let search: string = '';
  let postTitle: string = '';
  let showSettings: boolean = false;
  let showAdd = false;
  let addDisabled = true;

  $: {
    filteredPosts = posts.filter(p => p.data.title.toLowerCase().includes(search.toLowerCase()));
    addDisabled = postTitle === '';
  }

  async function onSaveSettings() {
    //await saveEntity($blog);
    showSettings = false;
  }

  async function onDeletePost(post: any) {

  }
</script>

<TitleBar title="posts">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} disabled={addDisabled} onAdd={() => {}}>
  <Input placeholder="Title" bind:value={postTitle} />
</ExpandAdd>

<input type="search" class="w-full p-4 mt-4 bg-transparent border-b border-stone-400 focus:border-stone-700 focus:text-stone-700 focus:outline-none placeholder-stone-400"
  placeholder="Search posts" aria-label="Search" bind:value={search}>

<List class="mb-8">
  {#each filteredPosts as post}
    <LinkListItem icon="edit_note" url={post.slug}>
      {post.data.title}
      <Action slot="actions" icon={"delete"} onClick={() => onDeletePost(post)}/>
    </LinkListItem>
  {/each}
</List>

<SettingsModal bind:show={showSettings} onSave={onSaveSettings}>
<SettingsPanel name="General">
  <ul class="mt-8">
    <li>
      <label for="title" class="text-xs opacity-50">Page title</label>
      <Input type="text" id="title" bind:value={content.title} />
    </li>
    <li>
      <label for="limit" class="text-xs opacity-50">Posts per page</label>
      <NumberInput id="limit" bind:value={content.limit} />
    </li>
  </ul>
</SettingsPanel>
<SettingsPanel name="Posts">
  <!---
  <ul class="mt-8">
    <li>
      <label for="path" class="text-xs opacity-50">Path</label>
      <Input type="text" id="path" bind:value={$blog.posts.path} />
    </li>
    <li>
      <label for="module" class="text-xs opacity-50">Module</label>
      <Input type="text" id="module" bind:value={$blog.posts.type} />
    </li>
    <li>
      <label for="collection" class="text-xs opacity-50">Collection</label>
      <Input type="text" id="collection" bind:value={$blog.posts.collection} />
    </li>
  </ul>
-->
</SettingsPanel>
</SettingsModal>
