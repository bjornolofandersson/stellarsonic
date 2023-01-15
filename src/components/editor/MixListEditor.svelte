<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Editor from './Editor.svelte';
  import PanelRight from './PanelRight.svelte';
  import TextInput from './TextInput.svelte';
  import { post } from '@lib/MixStore';
  import PanelLeft from './PanelLeft.svelte';
  import Button from './Button.svelte';

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
  
  function onDeletePost(slug: string) {
    fetch(`/mixes/${slug}.json`, {
      method: 'DELETE',
    });
  }
</script>

<Editor pageTitle="mixes" onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-cyan-700"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">Mixes</li>
  </ul>

  {#if !showCreate}
    <PanelLeft>
      <Button label="Create mix" icon="add" onClick={onCreate}/>

      <ul class="py-8">
        {#each slugs as slug}
          <li class="px-4 py-4 w-full border-b border-[#00000020] flex justify-between">
            <a class="text-stone-700" 
              href="/mixes/{slug}"><span class="material-symbols-outlined">edit_note</span> {slug}</a>
            <button on:click={() => onDeletePost(slug)} class="text-stone-700">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </li>
        {/each}
      </ul>
    </PanelLeft>
  {:else}
    <PanelRight title="New mix" onBack={() => {showCreate = false}}>
      <TextInput id="title" label="Title" bind:value={$post.title} />
      <button class="mt-4 p-4 border border-stone-400" on:click={onSavePost}>Create</button>
    </PanelRight>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>
