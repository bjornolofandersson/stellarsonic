<script lang="ts">
  import { Editor } from "src/editor";
  import * as store from '@lib/store';
  import type { Page } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import EditorSidebar from "./EditorSidebar.svelte";
  
  export let page: Entity<Page>;
  export let template: Entity<any>;
  export let content: Entity<any>;
  export let sitemap: any;
  export let site: any;

  const p = store.loadEntity(page);
  const t = store.loadEntity(template);
  const c = store.loadEntity(content);

  store.site.set(site);
  const s = store.site;
</script>

<Editor pageTitle="Hello" onSave={() => {}}>
  <EditorSidebar slot="sidebar" bind:page={$p} bind:template={$t} bind:content={$c} bind:site={$s} sitemap={sitemap}>
    <slot name="content-editor" slot="content-editor" />
  </EditorSidebar>

  <slot name="preview" slot="preview" />
</Editor>
