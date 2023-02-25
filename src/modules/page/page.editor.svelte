<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Action,
    Option,
    Palette,
    Select,
    SelectGroup,
    SelectGroupOption,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import { PageStore, TemplateStore } from './page';
  import Tabs from 'src/editor/Tabs.svelte';
  import Tab from 'src/editor/Tab.svelte';
  import TitleBar from 'src/editor/TitleBar.svelte';
  import Scrollable from 'src/editor/Scrollable.svelte';
  import List from 'src/editor/List.svelte';
  import LinkListItem from 'src/editor/LinkListItem.svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  export let data: any;
  export let template: any;
  export let sitemap: any;

  const store = PageStore.instance(data);
  const templateStore = TemplateStore.instance(template);
  let { entity: storedTemplate } = templateStore;
  let { entity: page } = store;
  let panel = 'page';
  let status = $page.data.draft ? 'draft' : 'published';
  let showAdd: boolean = false;
  let showAddModal: string | undefined = undefined;

  $: {
    $page.data.draft = status !== 'published';
  }

  async function onDeletePage(page: any) {
    await fetch(`/pages/${page.path}.json`, {
      method: 'DELETE',
      //body: JSON.stringify(page),
    });
  }

  const pageIcon = (page: any) => {
    switch (page.type) {
      case 'blog': return 'library_books';
      case 'page': return 'draft';
      case 'playlist': return 'queue_music';
      case 'container': return 'display_external_input';
    }
    return 'draft';
  }
</script>

<Sidebar bind:panel={panel}>
  <div class="px-8">
    <ActionBar slug={$page.slug}>
      <Action icon="undo" onClick={() => {}} disabled={true}/>
      <Action icon="redo" onClick={() => {}} disabled={true}/>
      <Action icon="save" onClick={() => {store.save()}}/>
      <Action icon="settings" onClick={() => {}}/>
    </ActionBar>

    <Tabs>
      <Tab panel="page">Page</Tab>
      <Tab panel="template">Template</Tab>
      <Tab panel="content">Content</Tab>
      <Tab panel="site">Site</Tab>
    </Tabs>
  </div>

  <Panel name="page">
    <SelectGroup bind:selected={status}>
      <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
      <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm py-4 mt-4 opacity-50">Menu bar</h1>
    <SelectGroup bind:selected={$page.data.menu}>
      <SelectGroupOption id="light" icon="light_mode">Light</SelectGroupOption>
      <SelectGroupOption id="dark" icon="dark_mode">Dark</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm p-4 mt-4 -mb-3 opacity-50">Palette</h1>
    <Palette bind:colors={$page.data.palette} />
  </Panel>

  <Panel name="content">
    <slot/>
  </Panel>

  <Panel name="template">
    <div class="flex text-sm opacity-50 p-4 border border-[#00000040] rounded-md">
      <span class="material-symbols-outlined mr-4">info</span>
      <span>These styles apply to all pages in this context ({$page.data.context})</span>
    </div>

    <h1 class="text-sm text-stone-600 mb-4 mt-8">Text alignment</h1>
    <SelectGroup bind:selected={$storedTemplate.data.textAlign}>
      <SelectGroupOption id="left" icon="format_align_left">Left</SelectGroupOption>
      <SelectGroupOption id="center" icon="format_align_center">Center</SelectGroupOption>
      <SelectGroupOption id="right" icon="format_align_right">Right</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm text-stone-600 mb-4 mt-8">Typography</h1>
    <Accordion>
      <AccordionItem icon="title" name="Heading 1">
        <Select label="Family" bind:value={$storedTemplate.data.fontFamily.h1}>
          <Option value="Montserrat">Montserrat</Option>
          <Option value="Gloock">Gloock</Option>
          <Option value="Raleway">Raleway</Option>
        </Select>

        <Select label="Weight" bind:value={$storedTemplate.data.fontWeight.h1}>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="400">400</option>
        </Select>

        <div class="relative">
          <label for="font-size-h1" class="-mb-6 text-md text-stone-600 p-4 w-full flex justify-between">
            <span>Size</span>
            <span>{$storedTemplate.data.fontSize.h1}rem</span>
          </label>
          <input id="font-size-h1" type="range" min="1" max="8" step="0.25" bind:value={$storedTemplate.data.fontSize.h1}
            class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-500"/>
        </div>

      </AccordionItem>
      <AccordionItem icon="title" name="Heading 2">
        <label for="font-size-h2" class="text-sm opacity-50">{$storedTemplate.data.fontSize.h2}rem</label>
        <input id="font-size-h2" type="range" min="1" max="8" step="0.25" bind:value={$storedTemplate.data.fontSize.h2}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
      </AccordionItem>
      <AccordionItem icon="title" name="Heading 3">
        <label for="font-size-h3" class="text-sm opacity-50">{$storedTemplate.data.fontSize.h3}rem</label>
        <input id="font-size-h3" type="range" min="1" max="8" step="0.25" bind:value={$storedTemplate.data.fontSize.h3}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
      </AccordionItem>
      <AccordionItem icon="segment" name="Paragraph">
        <label for="font-size-p" class="text-sm opacity-50">{$storedTemplate.data.fontSize.p}rem</label>
        <input id="font-size-p" type="range" min="0.5" max="4" step="0.1" bind:value={$storedTemplate.data.fontSize.p}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
      </AccordionItem>
    </Accordion>
  </Panel>

  <Panel name="site">
    <TitleBar title="pages">
      <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
    </TitleBar>

    {#if showAdd}
      <div class="mt-4 px-8 py-8 -ml-8 -mr-8 bg-[#00000007]"  transition:slide={{ duration: 200, easing: quintOut }}>
        <div class="grid grid-cols-2 gap-8">
          <button on:click={() => {showAddModal = 'page'}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">draft</span>
            <span>Page</span>
          </button>
          <button class="flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">library_books</span>
            <span>Blog</span>
          </button>
          <button on:click={() => {showAddModal = 'mix'}} class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">queue_music</span>
            <span>Mix</span>
          </button>
          <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">library_music</span>
            <span>Album</span>
          </button>
          <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">music_note</span>
            <span>Recording</span>
          </button>
          <button class="text-sm flex bg-stone-300 hover:bg-stone-200 rounded p-4 w-full">
            <span class="material-symbols-outlined mr-2">podcasts</span>
            <span>Podcast</span>
          </button>
        </div>
      </div>
    {/if}

    <Scrollable>
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
    </Scrollable>
  </Panel>
</Sidebar>
