<script lang="ts">
  import { Action, Input, LinkListItem, List, Scrollable, SettingsModal, SettingsPanel, TitleBar } from "src/editor";
  import { quintOut } from "svelte/easing";
  import { fly, slide } from "svelte/transition";

  export let links: any;
  export let onDelete: (link: any) => void;

  let link: any = { title: '', url: '' };
  let addDisabled = false;

  let showAdd = false;
</script>

<TitleBar title="navigation">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

{#if showAdd}
  <div class="relative mt-4 px-8 py-8 mb-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
    <Input placeholder="Title" bind:value={link.title} />
    <Input placeholder="URL" bind:value={link.url} />
    <button on:click={() => {}} in:fly={{ delay: 200, x: 15, duration: 200, easing: quintOut }} class="absolute right-4 bottom-0 text-stone-700 disabled:text-stone-400 -mb-7 p-4 w-14 h-14 bg-stone-200 rounded-full shadow enabled:hover:bg-stone-100" disabled={addDisabled}>
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
{/if}

<List class="mb-8">
  {#each links as link}
    <LinkListItem icon="link" url={link.url}>
      {link.title}
      <Action slot="actions" icon={"delete"} onClick={() => onDelete(link)}/>
    </LinkListItem>
  {/each}
</List>

