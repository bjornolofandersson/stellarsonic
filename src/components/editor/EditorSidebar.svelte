<script lang="ts">
  import {
    Action,
    Palette,
    SelectGroup,
    SelectGroupOption,
    SettingsModal,
    SettingsPanel,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import Tabs from 'src/editor/Tabs.svelte';
  import Tab from 'src/editor/Tab.svelte';
  import * as store from '@lib/store';
  import type { Page } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import Typography from '@components/editor/Typography.svelte';
  import Site from '@components/editor/site/Site.svelte';
  import ColorGroup from './ColorGroup.svelte';
  import SiteSettings from './site/SiteSettings.svelte';
  
  export let page: Entity<Page>;
  export let template: Entity<any>;
  export let content: Entity<any>;
  export let site: any;
  export let sitemap: any;

  let panel = 'content';
  let status = page.data.draft ? 'draft' : 'published';
  let showSettings = false;

  $: {
    page.data.draft = status !== 'published';
  }

  async function onSave() {
    store.saveEntity(page);
    store.saveEntity(template);
    store.saveEntity(content);
    store.saveSite();
  }
</script>

<Sidebar bind:panel={panel}>
  <div class="px-8" slot="header">
    <ActionBar slug={page.slug}>
      <Action icon="undo" onClick={() => {}} disabled={true}/>
      <Action icon="redo" onClick={() => {}} disabled={true}/>
      <Action icon="save" onClick={onSave}/>
      <Action icon="settings" onClick={() => { showSettings = true }}/>
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
    <Palette bind:colors={page.data.palette} />
    <ColorGroup title="Main" bind:colors={template.data.colorGroups[0]} bind:palette={page.data.palette} />
    <ColorGroup title="Article" bind:colors={template.data.colorGroups[1]} bind:palette={page.data.palette} />
  </Panel>

  <Panel name="typography">
    <Typography bind:template={template.data} />
  </Panel>

  <Panel name="site">
    <Site bind:site={site} sitemap={sitemap} />
  </Panel>
</Sidebar>

<SettingsModal bind:show={showSettings} onSave={onSave}>
  <SettingsPanel name="Site">
    <SiteSettings bind:site={site} />
  </SettingsPanel>
</SettingsModal>
