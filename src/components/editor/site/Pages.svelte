<script lang="ts">
  import type { ModuleDescription } from "@lib/interfaces";
  import { Action, LinkListItem, List, TitleBar } from "src/editor";
  import ExpandAdd from "src/editor/ExpandAdd.svelte";

  export let sitemap: any;
  export let modules: Record<string, ModuleDescription>;
  export let onAdd: (type: string) => void;

  let showAdd: boolean = false;

  async function onDeletePage(page: any) {
    await fetch(`/api/pages/${page.path}.json`, {
      method: 'DELETE',
      //body: JSON.stringify(page),
    });
  }

  const pageIcon = (page: any) => {
    return modules[page.type].icon;
  }
</script>

<TitleBar title="pages">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} button={false} onAdd={() => {}}>
  <div class="grid grid-cols-2 gap-8">
    {#each Object.entries(modules) as [id, module]}
      <button on:click={() => onAdd(id)} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full shadow">
        <span class="material-symbols-outlined mr-2">{module.icon}</span>
        <span>{module.name}</span>
      </button>
    {/each}
  </div>
</ExpandAdd>

<List class="mb-8">
  {#each sitemap.pages as page}
    <LinkListItem icon={pageIcon(page)} url="/{page.path}">
      {page.path}
      <Action slot="actions" icon={"delete"} onClick={() => onDeletePage(page)}/>
    </LinkListItem>
  {/each}
</List>
