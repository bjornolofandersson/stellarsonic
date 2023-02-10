<script lang="ts">
  import {
    Action,
    BackArrow,
    ColorInput,
    MainPanel,
    TitleBar
  } from 'src/editor';
    import Accordion from 'src/editor/Accordion.svelte';
    import AccordionItem from 'src/editor/AccordionItem.svelte';
    import MultiButton from 'src/editor/MultiButton.svelte';
  import Sidebar from 'src/editor/Sidebar.svelte';
  import SubPanel from 'src/editor/SubPanel.svelte';
  import { PageStore } from './page';

  export let data: any;

  let { page } = PageStore.instance(data);
  let panel = 'main';
</script>

<Sidebar bind:panel={panel}>
  <MainPanel>
    <BackArrow url={data.parent ? `/${data.parent}` : '/'}/>

    <TitleBar title="page">
      <Action icon="save" onClick={() => {}}/>
      <Action icon="tune" onClick={() => {panel = 'style'}}/>
      <Action icon="settings" onClick={() => {}}/>
    </TitleBar>

    <p class="mb-20">Some things related to page</p>
    <slot/>
  </MainPanel>

  <SubPanel name="style">
    <div class="flex gap-2 w-full mt-8">
      <Action icon="format_align_left" onClick={() => {$page.style.textAlign = 'left'}}/>
      <Action icon="format_align_center" onClick={() => {$page.style.textAlign = 'center'}}/>
      <Action icon="format_align_right" onClick={() => {$page.style.textAlign = 'right'}}/>
    </div>
    <Accordion>
      <AccordionItem icon="title" name="Heading 1">
        <label for="font-size-h1" class="text-sm opacity-50">{$page.style.fontSize.h1}rem</label>
        <input id="font-size-h1" type="range" min="1" max="8" step="0.25" bind:value={$page.style.fontSize.h1}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h1" label={$page.style.color.h1} bind:value={$page.style.color.h1}/>
      </AccordionItem>
      <AccordionItem icon="title" name="Heading 2">
        <label for="font-size-h2" class="text-sm opacity-50">{$page.style.fontSize.h2}rem</label>
        <input id="font-size-h2" type="range" min="1" max="8" step="0.25" bind:value={$page.style.fontSize.h2}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h2" label={$page.style.color.h2} bind:value={$page.style.color.h2}/>
      </AccordionItem>
      <AccordionItem icon="title" name="Heading 3">
        <label for="font-size-h3" class="text-sm opacity-50">{$page.style.fontSize.h3}rem</label>
        <input id="font-size-h3" type="range" min="1" max="8" step="0.25" bind:value={$page.style.fontSize.h3}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-h3" label={$page.style.color.h3} bind:value={$page.style.color.h3}/>
      </AccordionItem>
      <AccordionItem icon="segment" name="Paragraph">
        <label for="font-size-p" class="text-sm opacity-50">{$page.style.fontSize.p}rem</label>
        <input id="font-size-h3" type="range" min="0.5" max="4" step="0.1" bind:value={$page.style.fontSize.p}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <ColorInput id="text-color-p" label={$page.style.color.p} bind:value={$page.style.color.p}/>
      </AccordionItem>
    </Accordion>
  </SubPanel>
</Sidebar>
