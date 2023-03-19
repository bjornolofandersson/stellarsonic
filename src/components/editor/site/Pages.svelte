<script lang="ts">
  import type { Entity, ModuleDescription } from "@lib/interfaces";
  import type { Page } from "src/content/config";
  import { Action, LinkListItem, List, TitleBar } from "src/editor";
  import ExpandAdd from "src/editor/ExpandAdd.svelte";
  import { onMount } from "svelte";
  import * as api from '@lib/api';

  export let onAdd: (type: string) => void;
  export let panel: string;

  let showAdd: boolean = false;
  let pages: Entity<Page>[] = [];
  let modules: Record<string, ModuleDescription> = {}
  let path = window.location.pathname;

  function isActive(slug: string) {
    return '/' + slug === path || slug === 'index' && path === '/';
  }

  function onDeletePage(page: Entity<Page>) {
    api.deleteEntity('pages', page.id);
  }

  const pageIcon = (page: Page) => {
    return modules[page.type] ? modules[page.type].icon : '';
  }

  onMount(async () => {
    modules = await api.modules();
    pages = await api.collection<Page>('pages');
  });

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
  {#each pages.sort((a, b) => a.slug > b.slug ? 1 : -1) as page}
    <LinkListItem icon={pageIcon(page.data)} url="/{page.slug}" active={isActive(page.slug)}>
      {page.slug}
      <div slot="actions">
        <Action class="dark" icon={"edit_square"} onClick={() => {panel = 'page'}}/>
        <Action icon={"delete"} onClick={() => onDeletePage(page)}/>
      </div>
    </LinkListItem>
  {/each}
</List>
