<script lang="ts">
  import Accordion from '@components/editor/common/Accordion.svelte';
  import AccordionItem from '@components/editor/common/AccordionItem.svelte';
  import Editor from '@components/editor/common/Editor.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import Scrollable from '@components/editor/common/Scrollable.svelte';
  import DescriptionForm from '@components/editor/forms/DescriptionForm.svelte';
  import HeadingsForm from '@components/editor/forms/HeadingsForm.svelte';
  import ImageForm from '@components/editor/forms/ImageForm.svelte';
  import StyleForm from '@components/editor/forms/StyleForm.svelte';
  import { MixStore } from './playlist';

  export let slug: string;
  export let data: any;
  export let assets: string[];

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Editor pageTitle={$post.title} onSave={() => {}}>
  <MainPanel>
    <div class="h-full flex flex-col flex-auto">
      <div class="flex mt-8">
        <button class="text-stone-400 hover:text-stone-700" on:click={() => {}}>
          <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
        </button>
      </div>

      <div class="flex justify-between text-xl">
        <h2 class="mt-8 text-lg font-[500]">{$post.title.toUpperCase()}</h2>
        <div class="flex">
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>

      <Scrollable>
        <Accordion>
          <AccordionItem name="Headings" icon="title">
            <HeadingsForm bind:post={$post} />
          </AccordionItem>
          <AccordionItem name="Description" icon="description">
            <DescriptionForm bind:post={$post} />
          </AccordionItem>
          <AccordionItem name="Image" icon="image">
            <ImageForm bind:post={$post} assets={assets} />
          </AccordionItem>
          <AccordionItem name="Style" icon="format_paint">
            <StyleForm bind:post={$post} />
          </AccordionItem>
        </Accordion>
      </Scrollable>
    </div>
  </MainPanel>

  <div slot="preview"><slot/></div>
</Editor>
