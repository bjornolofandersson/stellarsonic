<script lang="ts">
  import Editor from './Editor.svelte';

  export let slugs: string[];

  function onSave() {
  }
</script>

<Editor pageTitle="mixes" onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-cyan-700"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">Mixes</li>
  </ul>

  <div class="px-8 text-lg">
    <button class="p-2 align-middle"><span class="material-symbols-outlined">add</span> <span class="-mt-2">Create mix</span></button>
  </div>


  <ul class="p-8">
    {#each slugs as slug}
      <li>
        <a class="block text-cyan-700 px-4 py-2 w-full border-b border-stone-400 hover:bg-stone-200" 
          href="/mixes/{slug}"><span class="material-symbols-outlined">edit_note</span> {slug}</a>
      </li>
    {/each}
  </ul>

  <div slot="preview"><slot/></div>
</Editor>
