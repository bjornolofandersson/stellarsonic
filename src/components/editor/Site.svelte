<script lang="ts">
  import { Action, Input, LinkListItem, List, Scrollable, SettingsModal, SettingsPanel, TitleBar } from "src/editor";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  export let sitemap: any;

  let showAdd: boolean = false;
  let showAddModal: string | undefined = undefined;
  let showSettings = false;

  async function onSaveSettings() {

  }

  async function onDeletePage(page: any) {
    await fetch(`/pages/${page.path}.json`, {
      method: 'DELETE',
      //body: JSON.stringify(page),
    });
  }

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

<TitleBar title="pages">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

{#if showAdd}
  <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
    <div class="grid grid-cols-2 gap-8">
      <button on:click={() => {showAddModal = 'page'}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">draft</span>
        <span>Page</span>
      </button>
      <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">library_books</span>
        <span>Blog</span>
      </button>
      <button on:click={() => {showAddModal = 'mix'}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">queue_music</span>
        <span>Mix</span>
      </button>
      <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">library_music</span>
        <span>Album</span>
      </button>
      <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">music_note</span>
        <span>Recording</span>
      </button>
      <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">podcasts</span>
        <span>Podcast</span>
      </button>
    </div>
  </div>
{/if}

<Scrollable>
  <List>
    {#each sitemap.pages as page}
      <LinkListItem icon={pageIcon(page)} url="/{page.path}">
        {page.path}
        <Action slot="actions" icon={"delete"} onClick={() => onDeletePage(page)}/>
      </LinkListItem>
    {/each}
    </List>
  <ul class="w-full p-8">
  </ul>
</Scrollable>

<SettingsModal bind:show={showSettings} onSave={onSaveSettings}>
  <SettingsPanel name="Site">
    <ul class="mt-8">
      <!--
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
  -->
    </ul>
  </SettingsPanel>
</SettingsModal>

<!--
<CreatePageModal show={showAddModal === 'page'} />
<CreateMixModal show={showAddModal === 'mix'} />
-->