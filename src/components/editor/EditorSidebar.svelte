<script lang="ts">
  import {
    Action,
    SelectGroup,
    SelectGroupOption,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import Tabs from 'src/editor/Tabs.svelte';
  import Tab from 'src/editor/Tab.svelte';
  import { saveEntity } from '@lib/store';
  import type { Page } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import Colors from '@components/editor/Colors.svelte';
  import Typography from '@components/editor/Typography.svelte';
  import Site from '@components/editor/Site.svelte';
  
  export let page: Entity<Page>;
  export let template: Entity<any>;
  export let content: Entity<any>;
  export let sitemap: any;

  let panel = 'content';
  let status = page.data.draft ? 'draft' : 'published';

  $: {
    page.data.draft = status !== 'published';
  }

  async function onSave() {
    saveEntity(page);
    saveEntity(template);
    saveEntity(content);
  }
</script>

<Sidebar bind:panel={panel}>
  <div class="px-8" slot="header">
    <ActionBar slug={page.slug}>
      <Action icon="undo" onClick={() => {}} disabled={true}/>
      <Action icon="redo" onClick={() => {}} disabled={true}/>
      <Action icon="save" onClick={onSave}/>
      <Action icon="settings" onClick={() => {}}/>
    </ActionBar>

    <Tabs>
      <Tab panel="content">Content</Tab>
      <Tab panel="page">Page</Tab>
      <Tab panel="typography">Typography</Tab>
      <Tab panel="colors">Colors</Tab>
      <Tab panel="site">Site</Tab>
    </Tabs>
  </div>

  <Panel name="content">
    <slot name="content-editor"/>
  </Panel>

  <Panel name="page">
    <SelectGroup bind:selected={status}>
      <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
      <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
    </SelectGroup>
  </Panel>

  <Panel name="colors">
    <Colors bind:colors={template.data.colors} bind:palette={page.data.palette} />
  </Panel>

  <Panel name="typography">
    <Typography bind:template={template.data} />
  </Panel>

  <Panel name="site">
    <Site sitemap={sitemap} />
  </Panel>
</Sidebar>