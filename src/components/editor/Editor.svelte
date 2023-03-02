<script lang="ts">
  import { Editor } from "src/editor";
  import * as store from '@lib/store';
  import type { PageState } from '@lib/interfaces';
  import EditorSidebar from "./EditorSidebar.svelte";
  
  export let state: PageState;
  export let sitemap: any;

  const page = store.loadEntity(state.page);
  const template = store.loadEntity(state.template);
  const content = store.loadEntity(state.content);

  store.site.set(state.site);
  const site = store.site;
</script>

<Editor pageTitle="Hello" onSave={() => {}}>
  <EditorSidebar slot="sidebar" bind:page={$page} bind:template={$template} bind:content={$content} bind:site={$site} sitemap={sitemap}>
    <slot name="content-editor" slot="content-editor" />
  </EditorSidebar>

  <slot name="preview" slot="preview" />
</Editor>
