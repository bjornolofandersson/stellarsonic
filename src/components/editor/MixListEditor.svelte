<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Editor from './Editor.svelte';
  import EditorPanel from './EditorPanel.svelte';
  import TextInput from './TextInput.svelte';
  import { post } from '@lib/MixStore';

  export let slugs: string[];

  let showCreate = false;

  function onCreate() {
    showCreate = true
  }

  function onSavePost() {
    fetch('/mixes.json', {
      method: 'POST',
      body: JSON.stringify($post),
    });
  }

  function onSave() {
  }
</script>

<Editor pageTitle="mixes" onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-cyan-700"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">Mixes</li>
  </ul>

  {#if !showCreate}
    <div class="absolute w-full" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
      <div class="px-8 text-lg">
        <button on:click={onCreate} class="p-2 align-middle">
          <span class="material-symbols-outlined">add</span> <span class="-mt-2">Create mix</span>
        </button>
      </div>

      <ul class="p-8">
        {#each slugs as slug}
          <li>
            <a class="block text-cyan-700 px-4 py-2 w-full border-b border-stone-400 hover:bg-stone-200" 
              href="/mixes/{slug}"><span class="material-symbols-outlined">edit_note</span> {slug}</a>
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <EditorPanel title="New mix" onBack={() => {showCreate = false}}>
      <TextInput id="title" label="Title" bind:value={$post.title} />
      <button class="mt-4 p-4 border border-stone-400" on:click={onSavePost}>Create</button>
    </EditorPanel>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>
