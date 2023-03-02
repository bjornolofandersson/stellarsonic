<script lang="ts">
  import { Editor } from "src/editor";
  import { loadEntity } from '@lib/store';
  import type { Page } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import EditorSidebar from "./EditorSidebar.svelte";
  
  export let page: Entity<Page>;
  export let template: Entity<any>;
  export let content: Entity<any>;
  export let sitemap: any;

  const p = loadEntity(page);
  const t = loadEntity(template);
  const c = loadEntity(content);
</script>

<Editor pageTitle="Hello" onSave={() => {}}>
  <EditorSidebar slot="sidebar" page={$p} template={$t} content={$c} sitemap={sitemap}>
    <slot name="content-editor" slot="content-editor" />
  </EditorSidebar>

  <slot name="preview" slot="preview" />
</Editor>
