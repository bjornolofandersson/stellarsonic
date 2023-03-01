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
  import { loadEntity, saveEntity } from '@lib/store';
  import type { Page } from './page.server';
  import type { Entity } from '@lib/interfaces';
  import Colors from '@components/editor/Colors.svelte';
  import Typography from '@components/editor/Typography.svelte';
  import Site from '@components/editor/Site.svelte';
  
  export let data: Entity<Page>;
  export let template: Entity<any>;
  export let sitemap: any;

  const page = loadEntity(data);
  const storedTemplate = loadEntity(template);

  let panel = 'page';
  let status = $page.data.draft ? 'draft' : 'published';

  $: {
    $page.data.draft = status !== 'published';
  }

  async function onSave() {
    saveEntity($page);
    saveEntity($storedTemplate);
  }
</script>

<Sidebar bind:panel={panel}>
  <div class="px-8" slot="header">
    <ActionBar slug={$page.slug}>
      <Action icon="undo" onClick={() => {}} disabled={true}/>
      <Action icon="redo" onClick={() => {}} disabled={true}/>
      <Action icon="save" onClick={onSave}/>
      <Action icon="settings" onClick={() => {}}/>
    </ActionBar>

    <Tabs>
      <Tab panel="page">Page</Tab>
      <Tab panel="typography">Typography</Tab>
      <Tab panel="colors">Colors</Tab>
      <Tab panel="content">Content</Tab>
      <Tab panel="site">Site</Tab>
    </Tabs>
  </div>

  <Panel name="page">
    <SelectGroup bind:selected={status}>
      <SelectGroupOption id="published" icon="verified">Published</SelectGroupOption>
      <SelectGroupOption id="draft" icon="draft">Draft</SelectGroupOption>
    </SelectGroup>
  </Panel>

  <Panel name="content">
    <slot/>
  </Panel>

  <Panel name="colors">
    <Colors bind:colors={$storedTemplate.data.colors} bind:palette={$page.data.palette} />
  </Panel>

  <Panel name="typography">
    <Typography bind:template={$storedTemplate.data} />
  </Panel>

  <Panel name="site">
    <Site sitemap={sitemap} />
  </Panel>
</Sidebar>
