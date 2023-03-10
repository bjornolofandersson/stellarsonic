<script lang="ts">
  import { Editor } from "src/editor";
  import * as store from '@lib/store';
  import * as api from '@lib/api';
  import type { PageState } from '@lib/interfaces';
  import EditorSidebar from "./EditorSidebar.svelte";
  import type { Palette } from "src/content/config";
  
  export let state: PageState;

  const page = store.loadEntity(state.page);
  const template = store.loadEntity(state.template);
  const palette = store.loadEntity(state.palette);
  const content = store.loadEntity(state.content);

  store.site.set(state.site);
  const site = store.site;

  page.subscribe(async p => {
    const palettes = await api.collection<Palette>('palettes');

    const newPalette = palettes.find(o => o.id === p.data.palette);
    if (newPalette) {
      palette.set(newPalette);
    }
  });

  async function onSave() {
    store.saveEntity($page);
    store.saveEntity($template);
    store.saveEntity($palette);
    store.saveEntity($content);
    store.saveSite();
  }
</script>

<Editor pageTitle="Hello" onSave={() => {}}>
  <EditorSidebar
    slot="sidebar"
    on:save={onSave}
    bind:page={$page}
    bind:template={$template}
    bind:palette={$palette}
    bind:site={$site}
  >
    <slot name="content-editor" slot="content-editor" />
  </EditorSidebar>

  <slot name="preview" slot="preview" />
</Editor>
