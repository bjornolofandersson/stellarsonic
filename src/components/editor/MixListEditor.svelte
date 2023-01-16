<script lang="ts">
  import Editor from './Editor.svelte';
  import PanelRight from './PanelRight.svelte';
  import TextInput from './TextInput.svelte';
  import { post } from '@lib/MixStore';
  import PanelLeft from './PanelLeft.svelte';
  import Button from './Button.svelte';

  export let slugs: string[];
  export let pageTitle: string;

  let showCreate = false;
  let confirmDelete: string | undefined = undefined;

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
  
  async function onDeletePost() {
    await fetch(`/mixes/${confirmDelete}.json`, {
      method: 'DELETE',
    });
    confirmDelete = undefined;
  }
</script>

<Editor pageTitle={pageTitle} onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-cyan-700"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">Mixes</li>
  </ul>

  <PanelLeft show={!showCreate}>
    <Button label="Create mix" icon="add" onClick={onCreate}/>

    <ul class="py-8">
      {#each slugs as slug}
        <li class="px-4 py-4 w-full border-b border-[#00000020] flex justify-between">
          <a class="text-stone-700" 
            href="/mixes/{slug}"><span class="material-symbols-outlined">edit_note</span> {slug}</a>
          <button on:click={() => {confirmDelete = slug}} class="text-stone-700">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </li>
      {/each}
    </ul>
  </PanelLeft>

  <PanelRight show={showCreate} title="New mix" onBack={() => {showCreate = false}}>
    <TextInput id="title" label="Title" bind:value={$post.title} />
    <button class="mt-4 p-4 border border-stone-400" on:click={onSavePost}>Create</button>
  </PanelRight>

  <div slot="preview"><slot/></div>

  {#if confirmDelete !== undefined}
  <div tabindex="-1" class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-md md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete {confirmDelete}.md?</h3>
          <button on:click={() => onDeletePost()} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Yes, I'm sure
          </button>
          <button on:click={() => {confirmDelete = undefined}} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
        </div>
      </div>
    </div>
  </div>
  {/if}

</Editor>
