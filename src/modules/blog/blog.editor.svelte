<script lang="ts">
  import {
    Action,
    BackArrow,
    LinkListItem,
    List,
    MainPanel,
    Scrollable,
    SettingsModal,
    SettingsPanel,
    SubPanel,
    Input,
    NumberInput,
    TitleBar
  } from 'src/editor';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import themeDef from '@theme/index';
  import { BlogStore } from './blog';
  import ThemeSettings from '@components/editor/ThemeSettings.svelte';
    import Sidebar from 'src/editor/Sidebar.svelte';

  export let slug: string;
  export let posts: any[];
  export let settings: any;
  export let themeData: any;

  let store = BlogStore.instance(slug, settings, themeData);
  let {blog, theme} = store;

  let filteredPosts = posts;
  let search: string = '';
  let postTitle: string = '';
  let showSettings: boolean = false;
  let showAdd = false;
  let addDisabled = true;
  let postTitleInput: any;
  let panel: string | undefined = undefined;

  $: {
    filteredPosts = posts.filter(p => p.data.title.toLowerCase().includes(search.toLowerCase()));
    addDisabled = postTitle === '';
    if (showAdd && postTitleInput) {
      postTitleInput.focus();
    }
  }

  async function onSaveSettings() {
    await store.save();
    showSettings = false;
  }
</script>

<Sidebar bind:panel={panel}>
  <MainPanel>
    <BackArrow url="/"/>

    <TitleBar title={settings.title}>
      <Action icon="tune" onClick={() => {panel = 'theme'}}/>
      <Action icon="settings" onClick={() => {showSettings = true}}/>
      <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
    </TitleBar>

    {#if showAdd}
      <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
        <div class="flex mb-6">
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 mr-4">
            <span class="material-symbols-outlined">add_notes</span>
          </button>
          <h1 class="text-sm text-stone-700">New post</h1>
        </div>
        <div class="flex gap-8">
          <input class="w-full p-4 bg-transparent border-b border-[#00000010] placeholder-stone-400 focus:outline-none"
            placeholder="Title" bind:this={postTitleInput} bind:value={postTitle}>
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 px-4 bg-stone-300 rounded enabled:hover:bg-stone-200" disabled={addDisabled}>
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    {/if}

    <input type="search" class="w-full p-4 mt-4 bg-transparent border-b border-stone-400 focus:border-stone-700 focus:text-stone-700 focus:outline-none placeholder-stone-400"
      placeholder="Search posts" aria-label="Search" bind:value={search}>
    
    <Scrollable>
      <List>
        {#each filteredPosts as post}
        <LinkListItem icon="edit_note" url={post.slug}>
          <div class="inline-block">
            <span class="block text-sm">{post.data.title}</span>
            <span class="block text-stone-500 text-xs">{new Date(post.data.date).toLocaleDateString()}</span>
          </div>
        </LinkListItem>
        {/each}
      </List>
    </Scrollable>
  </MainPanel>

  <SubPanel name="theme">
    <ThemeSettings bind:theme={$theme} items={themeDef.modules.blog.options} />
  </SubPanel>

  <SettingsModal bind:show={showSettings} onSave={onSaveSettings}>
    <SettingsPanel name="General">
      <ul class="mt-8">
        <li>
          <label for="title" class="text-xs opacity-50">Page title</label>
          <Input type="text" id="title" bind:value={$blog.title} />
        </li>
        <li>
          <label for="limit" class="text-xs opacity-50">Posts per page</label>
          <NumberInput id="limit" bind:value={$blog.limit} />
        </li>
      </ul>
    </SettingsPanel>
    <SettingsPanel name="Posts">
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
    </SettingsPanel>
  </SettingsModal>
</Sidebar>
