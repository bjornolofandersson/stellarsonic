<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { Action, MainPanel, Scrollable, Input, TitleBar} from 'src/editor';
  import LinkListItem from 'src/editor/LinkListItem.svelte';
  import List from 'src/editor/List.svelte';
  import SettingsModal from 'src/editor/SettingsModal.svelte';
  import SettingsPanel from 'src/editor/SettingsPanel.svelte';
  import Sidebar from 'src/editor/Sidebar.svelte';
  import { SiteStore } from './site';
  import CreatePageModal from '@components/editor/modals/create-page.svelte';
  import CreateMixModal from '@components/editor/modals/create-mix.svelte';

  export let data: any;
  export let sitemap: any;

  let {site} = SiteStore.instance(data);
  let panel: string | undefined = undefined;
  let showAdd: boolean = false;
  let showSettings: boolean = false;
  let showAddModal: string | undefined = undefined;

  function onSave() {}
  function onSaveSettings() {}

  const pageIcon = (page: any) => {
    switch (page.type) {
      case 'blog': return 'library_books';
      case 'page': return 'draft';
      case 'playlist': return 'queue_music';
      case 'container': return 'display_external_input';
    }
    return 'draft';
  }
</script>

<Sidebar bind:panel={panel}>
  <MainPanel>
    <div class="mt-12"></div>
    <TitleBar title="pages">
      <Action icon="settings" onClick={() => {showSettings = true}}/>
      <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
    </TitleBar>

    {#if showAdd}
      <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
        <div class="grid grid-cols-2 gap-8">
          <button on:click={() => {showAddModal = 'page'}} class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">draft</span>
            <span>Page</span>
          </button>
          <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">library_books</span>
            <span>Blog</span>
          </button>
          <button on:click={() => {showAddModal = 'mix'}} class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">queue_music</span>
            <span>Mix</span>
          </button>
          <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">library_music</span>
            <span>Album</span>
          </button>
          <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">music_note</span>
            <span>Recording</span>
          </button>
          <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">podcasts</span>
            <span>Podcast</span>
          </button>
        </div>
      </div>
    {/if}

    <Scrollable>
      <List>
        {#each sitemap.pages as page}
          <LinkListItem icon={pageIcon(page)} url={page.path}>
            {page.path}
          </LinkListItem>
        {/each}
        </List>
      <ul class="w-full p-8">
      </ul>
    </Scrollable>
  </MainPanel>

  <SettingsModal bind:show={showSettings} onSave={onSaveSettings}>
    <SettingsPanel name="Site">
      <ul class="mt-8">
        <li>
          <label for="title" class="text-xs opacity-50">Site title</label>
          <Input type="text" id="title" bind:value={$site.title}/>
        </li>
        <li>
          <label for="description" class="text-xs opacity-50">Description</label>
          <Input type="text" id="description" bind:value={$site.description}/>
        </li>
        <li>
          <label for="url" class="text-xs opacity-50">URL</label>
          <Input type="text" id="url" bind:value={$site.url}/>
        </li>
      </ul>
    </SettingsPanel>
  </SettingsModal>

  <CreatePageModal show={showAddModal === 'page'} />
  <CreateMixModal show={showAddModal === 'mix'} />
</Sidebar>
