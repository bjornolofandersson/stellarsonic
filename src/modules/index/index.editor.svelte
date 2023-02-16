<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { Action, Scrollable, TitleBar} from 'src/editor';

  export let data: any;
  export let sitemap: any;

  let showAdd = false;
  let showAddModal = '';
</script>

<TitleBar title="sections">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

{#if showAdd}
  <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
    <div class="grid grid-cols-2 gap-8">
      <button on:click={() => {showAddModal = 'hero'}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
        <!--<span class="material-symbols-outlined mr-2">draft</span>-->
        <span>Hero</span>
      </button>
    </div>
  </div>
{/if}

<Scrollable>
    <!---
  <List>
    {#each sitemap.pages as page}
      <LinkListItem icon={pageIcon(page)} url={page.path}>
        {page.path}
        <Action slot="actions" icon={"delete"} onClick={() => onDeletePage(page)}/>
      </LinkListItem>
    {/each}
    </List>
  <ul class="w-full p-8">
  </ul>
-->
</Scrollable>
