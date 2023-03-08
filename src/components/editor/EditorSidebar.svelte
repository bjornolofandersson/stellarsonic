<script lang="ts">
  import {
    Action,
    Palette,
    SettingsModal,
    SettingsPanel,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import Tabs from 'src/editor/Tabs.svelte';
  import Tab from 'src/editor/Tab.svelte';
  import * as store from '@lib/store';
  import type { Page, Template } from 'src/content/config';
  import type { Entity, ModuleDescription } from '@lib/interfaces';
  import Typography from '@components/editor/Typography.svelte';
  import Site from '@components/editor/site/Site.svelte';
  import ColorGroup from './ColorGroup.svelte';
  import SiteSettings from './site/SiteSettings.svelte';
  import PageEditor from './page/Page.svelte';
  
  export let page: Entity<Page>;
  export let template: Entity<Template>;
  export let palette: Entity<Palette>;
  export let content: Entity<any>;
  export let site: any;
  export let sitemap: any;
  export let modules: Record<string, ModuleDescription>;

  let panel = 'content';
  let showSettings = false;

  async function onSave() {
    store.saveEntity(page);
    store.saveEntity(template);
    store.saveEntity(palette);
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
    <PageEditor bind:page={page.data} />
  </Panel>

  <Panel name="colors">
    <Palette bind:colors={palette.data.colors} />
    <ColorGroup title="Main" bind:colors={template.data.colorGroups[0]} bind:palette={palette.data.colors} />
    <ColorGroup title="Article" bind:colors={template.data.colorGroups[1]} bind:palette={palette.data.colors} />
  </Panel>

  <Panel name="typography">
    <Typography bind:template={template.data} />
  </Panel>

  <Panel name="site">
    <Site bind:site={site} sitemap={sitemap} modules={modules} />
  </Panel>
</Sidebar>

<SettingsModal bind:show={showSettings} onSave={onSave}>
  <SettingsPanel name="Site">
    <SiteSettings bind:site={site} />
  </SettingsPanel>
</SettingsModal>
