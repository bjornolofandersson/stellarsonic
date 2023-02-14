<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Action,
    BackArrow,
    MainPanel,
    Palette,
    SelectGroup,
    SelectGroupOption,
    Sidebar,
    SubPanel,
    TitleBar
  } from 'src/editor';
  import { PageStore, TemplateStore } from './page';

  export let data: any;
  export let template: any;

  const store = PageStore.instance(data);
  const templateStore = TemplateStore.instance(template);
  let { entity: storedTemplate } = templateStore;
  let { entity: page } = store;
  let panel = 'main';
  let status = $page.data.draft ? 'draft' : 'published';

  $: {
    $page.data.draft = status !== 'published';
  }
</script>

<Sidebar bind:panel={panel}>
  <MainPanel>
    <BackArrow url={data.parent ? `/${data.parent}` : '/'}/>

    <TitleBar title="page">
      <Action icon="save" onClick={() => {store.save()}}/>
      <Action icon="tune" onClick={() => {panel = 'template'}}/>
      <Action icon="settings" onClick={() => {}}/>
    </TitleBar>

    <SelectGroup bind:selected={status}>
      <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
      <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm p-4 mt-4 opacity-50">Menu bar</h1>
    <SelectGroup bind:selected={$page.data.menu}>
      <SelectGroupOption id="light" icon="light_mode">Light</SelectGroupOption>
      <SelectGroupOption id="dark" icon="dark_mode">Dark</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm p-4 mt-4 opacity-50">Palette</h1>
    <Palette bind:colors={$page.data.palette} />

    <div class="mt-8">
      <slot/>
    </div>
  </MainPanel>

  <SubPanel name="template">
    <TitleBar title="template">
      <Action icon="save" onClick={() => {templateStore.save()}}/>
    </TitleBar>

    <div class="flex text-sm opacity-50 p-4 mt-4 border border-[#00000040] rounded-md">
      <span class="material-symbols-outlined mr-4">info</span>
      <span>These styles apply to all pages in this context ({$page.data.context})</span>
    </div>

    <h1 class="text-sm text-stone-600 mb-4 mt-8">Text alignment</h1>
    <SelectGroup bind:selected={$storedTemplate.data.textAlign}>
      <SelectGroupOption id="left" icon="format_align_left">Left</SelectGroupOption>
      <SelectGroupOption id="center" icon="format_align_center">Center</SelectGroupOption>
      <SelectGroupOption id="right" icon="format_align_right">Right</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm text-stone-600 mb-4 mt-8">Font sizes</h1>
    <label for="base-font-size-h1" class="text-sm opacity-50">H1: {$storedTemplate.data.fontSize.h1}rem</label>
    <input id="base-font-size-h1" type="range" min="1" max="8" step="0.25" bind:value={$storedTemplate.data.fontSize.h1}
      class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
    <label for="base-font-size-h2" class="text-sm opacity-50">H2: {$storedTemplate.data.fontSize.h2}rem</label>
    <input id="base-font-size-h2" type="range" min="1" max="8" step="0.25" bind:value={$storedTemplate.data.fontSize.h2}
      class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>

    <!--
    <Accordion>
      <AccordionItem icon="title" name="Heading 1">
        <label for="font-size-h1" class="text-sm opacity-50">{$page.data.style.fontSize.h1}rem</label>
        <input id="font-size-h1" type="range" min="1" max="8" step="0.25" bind:value={$page.data.style.fontSize.h1}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h1" label={$page.data.style.color.h1} bind:value={$page.data.style.color.h1}/>
      </AccordionItem>
      <AccordionItem icon="title" name="Heading 2">
        <label for="font-size-h2" class="text-sm opacity-50">{$page.data.style.fontSize.h2}rem</label>
        <input id="font-size-h2" type="range" min="1" max="8" step="0.25" bind:value={$page.data.style.fontSize.h2}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h2" label={$page.data.style.color.h2} bind:value={$page.data.style.color.h2}/>
      </AccordionItem>
      <AccordionItem icon="title" name="Heading 3">
        <label for="font-size-h3" class="text-sm opacity-50">{$page.data.style.fontSize.h3}rem</label>
        <input id="font-size-h3" type="range" min="1" max="8" step="0.25" bind:value={$page.data.style.fontSize.h3}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h3" label={$page.data.style.color.h3} bind:value={$page.data.style.color.h3}/>
      </AccordionItem>
      <AccordionItem icon="segment" name="Paragraph">
        <label for="font-size-p" class="text-sm opacity-50">{$page.data.style.fontSize.p}rem</label>
        <input id="font-size-h3" type="range" min="0.5" max="4" step="0.1" bind:value={$page.data.style.fontSize.p}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-p" label={$page.data.style.color.p} bind:value={$page.data.style.color.p}/>
      </AccordionItem>
    </Accordion>
  -->
  </SubPanel>
</Sidebar>
