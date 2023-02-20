<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { Action, Scrollable, TitleBar} from 'src/editor';
  import type { Entity } from '@lib/interfaces';
  import Accordion from 'src/editor/Accordion.svelte';
  import AccordionItem from 'src/editor/AccordionItem.svelte';
  import Input from 'src/editor/Input.svelte';
  import { IndexStore } from '.';

  export let entity: Entity<any>;
  export let data: any;
  export let sitemap: any;

  const store = IndexStore.instance(entity);
  const { entity: index } = store;

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
        <span>Hero</span>
      </button>
    </div>
  </div>
{/if}

<Scrollable>
  <Accordion>
    {#each $index.data.sections as section}
      <AccordionItem icon="code_blocks" name={section.type.charAt(0).toUpperCase() + section.type.slice(1)}>
        <label for="title" class="text-xs">Title</label>
        <Input id="title" bind:value={section.title} />
        <label for="cta-label" class="text-xs">Call to action label</label>
        <Input id="cta-label" bind:value={section.cta.label} />
        <label for="cta-url" class="text-xs">Call to action URL</label>
        <Input id="cta-url" bind:value={section.cta.url} />
      </AccordionItem>
    {/each}
  </Accordion>
</Scrollable>
