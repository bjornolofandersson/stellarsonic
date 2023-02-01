<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  import LinkListItem from '@components/editor/common/LinkListItem.svelte';
  import List from '@components/editor/common/List.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  export let collection: string;
  export let title: string;
  export let posts: any[];
  export let path: string;

  let filteredPosts = posts;

  $: {
    filteredPosts = posts.filter(p => p.data.title.toLowerCase().includes(search.toLowerCase()));
  }

  let search: string = '';
  let postTitle: string = '';
  let showAdd = false;
</script>

<Editor pageTitle={title} onSave={() => {}}>
  <MainPanel>
    <div class="h-full flex flex-col flex-auto">
      <div class="flex mt-8">
        <button class="text-stone-400 hover:text-stone-700" on:click={() => {}}>
          <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
        </button>
      </div>

      <div class="flex justify-between text-xl">
        <h2 class="mt-8 text-lg font-[500]">{title.toUpperCase()}</h2>
        <div class="flex">
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">tune</span>
          </button>
          <button on:click={() => {showAdd = !showAdd}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">{showAdd ? 'expand_less' : 'add'}</span>
          </button>
        </div>
      </div>

      {#if showAdd}
        <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
          <div class="flex mb-6">
            <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 mr-4">
              <span class="material-symbols-outlined">add_notes</span>
            </button>
            <h1 class="text-sm text-stone-700">New post</h1>
          </div>
          <div class="flex gap-8">
            <input class="w-full p-4 bg-transparent border-b border-[#00000010] placeholder-stone-400 focus:outline-none" placeholder="Title" bind:value={postTitle}>
            <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 px-4 bg-stone-300 rounded hover:bg-stone-200">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      {/if}

      <input type="search" class="w-full p-4 mt-4 bg-transparent border-b border-stone-400 focus:border-stone-700 focus:text-stone-700 focus:outline-none placeholder-stone-400"
        placeholder="Search posts" aria-label="Search" bind:value={search}>
      
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
    </div>
  </MainPanel>

  <div slot="preview"><slot/></div>
</Editor>
