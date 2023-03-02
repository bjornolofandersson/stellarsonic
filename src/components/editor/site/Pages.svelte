<script lang="ts">
  import { Action, LinkListItem, List, TitleBar } from "src/editor";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  export let sitemap: any;
  export let onAdd: (type: string) => void;

  let showAdd: boolean = false;

  async function onDeletePage(page: any) {
    await fetch(`/api/pages/${page.path}.json`, {
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
      <button on:click={() => onAdd('article')} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">draft</span>
        <span>Article</span>
      </button>
      <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <span class="material-symbols-outlined mr-2">library_books</span>
        <span>Blog</span>
      </button>
      <button on:click={() => {onAdd('mix')}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
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

<List class="mb-8">
  {#each sitemap.pages as page}
    <LinkListItem icon={pageIcon(page)} url="/{page.path}">
      {page.path}
      <Action slot="actions" icon={"delete"} onClick={() => onDeletePage(page)}/>
    </LinkListItem>
  {/each}
</List>
