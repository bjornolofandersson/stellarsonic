<script lang="ts">
  import { Accordion, AccordionItem, Action, BackArrow, Editor, MainPanel, Scrollable, TitleBar } from 'src/editor';
  import DescriptionForm from '@components/editor/forms/DescriptionForm.svelte';
  import HeadingsForm from '@components/editor/forms/HeadingsForm.svelte';
  import ImageForm from '@components/editor/forms/ImageForm.svelte';
  import StyleForm from '@components/editor/forms/StyleForm.svelte';
  import { MixStore } from './playlist';

  export let slug: string;
  export let data: any;
  export let assets: string[];
  export let parentUrl: string;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Editor pageTitle={$post.title} onSave={() => {}}>
  <MainPanel>
    <BackArrow url={parentUrl} />

    <TitleBar title={$post.title}>
      <Action icon="settings" onClick={() => {}} />
    </TitleBar>

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
  </MainPanel>

  <div slot="preview"><slot/></div>
</Editor>
