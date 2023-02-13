<script lang="ts">
  import {
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
  import { PageStore } from './page';

  export let data: any;
  export let baseStyle: any;

  const store = PageStore.instance(data, baseStyle);
  let { entity: page, base } = store;
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
      <Action icon="tune" onClick={() => {panel = 'style'}}/>
      <Action icon="settings" onClick={() => {}}/>
    </TitleBar>

    <SelectGroup bind:selected={status}>
      <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
      <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
    </SelectGroup>

    <h1 class="text-sm p-4 mt-4 opacity-50">Palette</h1>
    <Palette bind:colors={$page.data.palette} />

    <div class="mt-8">
      <slot/>
    </div>
  </MainPanel>

  <SubPanel name="style">
      <!--<ColorInput id={color} bind:value={color} label={color}></ColorInput>-->
    
    <!--
    <h1 class="text-md mt-8">Base style</h1>
    <p class="text-xs opacity-50 border-b border-[#00000060] pb-4">These are applied to all pages this context</p>
    <Accordion>
      <AccordionItem icon="title" name="Font sizes">
        <label for="base-font-size-h1" class="text-sm opacity-50">H1: {$base.fontSize.h1}rem</label>
        <input id="base-font-size-h1" type="range" min="1" max="8" step="0.25" bind:value={$base.fontSize.h1}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
        <label for="base-font-size-h2" class="text-sm opacity-50">H2: {$base.fontSize.h2}rem</label>
        <input id="base-font-size-h2" type="range" min="1" max="8" step="0.25" bind:value={$base.fontSize.h2}
          class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-200"/>
      </AccordionItem>
    </Accordion>

    <div class="flex gap-2 w-full mt-8">
      <Action icon="format_align_left" onClick={() => {$page.data.style.textAlign = 'left'}}/>
      <Action icon="format_align_center" onClick={() => {$page.data.style.textAlign = 'center'}}/>
      <Action icon="format_align_right" onClick={() => {$page.data.style.textAlign = 'right'}}/>
    </div>
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
