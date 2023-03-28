<script lang="ts">
  import type { Entity, ModuleDescription } from "@lib/interfaces";
  import type { Page } from "src/content/config";
  import { Action, Input, TitleBar } from "src/editor";
  import ExpandAdd from "src/editor/ExpandAdd.svelte";
  import * as api from '@lib/api';
  import slugify from 'slugify';

  export let modules: Record<string, ModuleDescription> = {}

  let showAdd: boolean = false;
  let type: string | undefined = undefined;
  let title: string | undefined = undefined;

  async function onAdd() {
    if (title && type) {
      const slug = slugify(title, {lower: true});
      const content: Entity<any> = {
        id: slug,
        slug,
        collection: modules[type].collection,
        data: {
          title,
        },
      }

      const page: Entity<Page> = {
        id: slug,
        slug,
        collection: 'pages',
        data: {
          context: 'standalone',
          type,
          reference: title,
          palette: 'default',
        },
      }

      api.createEntity(content);
      api.createEntity(page);
    }
  }

</script>

<TitleBar title="pages">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd} button={type !== undefined} disabled={title === '' || !title} onAdd={onAdd}>
  <div class="grid grid-cols-2 gap-4">
    {#each Object.entries(modules) as [id, module]}
      <button on:click={() => {type = id}} class="text-sm flex hover:bg-stone-100 rounded p-4 w-full shadow {type === id ? 'bg-stone-100' : 'bg-stone-200'}">
        <span class="material-symbols-outlined mr-2">{module.icon}</span>
        <span>{module.name}</span>
      </button>
    {/each}
  </div>
  {#if type}
    <div class="mt-8">
      <Input placeholder="Title" bind:value={title} />
    </div>
  {/if}
</ExpandAdd>
