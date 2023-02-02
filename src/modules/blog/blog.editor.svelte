<script lang="ts">
  import Action from '@components/editor/common/Action.svelte';
  import BackArrow from '@components/editor/common/BackArrow.svelte';
  import Editor from '@components/editor/common/Editor.svelte';
  import LinkListItem from '@components/editor/common/LinkListItem.svelte';
  import List from '@components/editor/common/List.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import Scrollable from '@components/editor/common/Scrollable.svelte';
  import SettingsModal from '@components/editor/common/SettingsModal.svelte';
  import TitleBar from '@components/editor/common/TitleBar.svelte';
  import { SiteStore } from '@modules/site/site';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  export let collection: string;
  export let title: string;
  export let posts: any[];
  export let path: string;
  export let settings: any;

  let store = SiteStore.instance(settings);
  let {site} = store;
  let blog = $site.pages.find((p: any) => p.path === path)

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

<Editor pageTitle={title} onSave={() => {}} bind:panel={panel}>
  <MainPanel>
    <BackArrow onClick={() => {}}/>

    <TitleBar title={title}>
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
        <LinkListItem icon="edit_note" url="/{path}/{post.slug}">
          <div class="inline-block">
            <span class="block text-sm">{post.data.title}</span>
            <span class="block text-stone-500 text-xs">{new Date(post.data.date).toLocaleDateString()}</span>
          </div>
        </LinkListItem>
        {/each}
      </List>
    </Scrollable>
  </MainPanel>

  <SettingsModal bind:show={showSettings} bind:settings={blog} onSave={onSaveSettings}/>

  <div slot="preview"><slot/></div>
</Editor>
