<script lang="ts">
  import {
    Action,
    SettingsModal,
    SettingsPanel,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import type { Page, Template, Palette } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import Typography from '@components/editor/Typography.svelte';
  import Site from '@components/editor/site/Site.svelte';
  import SiteSettings from './site/SiteSettings.svelte';
  import PageEditor from './page/Page.svelte';
  import Colors from './colors/Colors.svelte';
  import { createEventDispatcher } from 'svelte';
  import * as store from '@lib/store';

	const dispatch = createEventDispatcher();
  
  export let page: Entity<Page>;
  export let template: Entity<Template>;
  export let palette: Entity<Palette>;
  export let site: any;

  let panel = store.editorPanel('content');

  let showSettings = false;

  async function onSave() {
    dispatch('save');
  }
</script>

<Sidebar bind:panel={$panel}>
  <div class="px-8" slot="header">
    <ActionBar slug={page.slug}>
      <Action icon="save" onClick={onSave}/>
      <Action icon="settings" onClick={() => { showSettings = true }}/>
    </ActionBar>
  </div>

  <Panel name="content" parent="page">
    <slot name="content-editor"/>
  </Panel>

  <Panel name="page">
    <PageEditor bind:page={page.data}
      on:content={() => {$panel = 'content'}}
      on:typography={() => {$panel = 'typography'}}
      on:colors={() => {$panel = 'colors'}}
      on:site={() => {$panel = 'site'}}
    />
  </Panel>

  <Panel name="colors" parent="page">
    <Colors bind:page={page.data} bind:palette={palette.data} bind:template={template.data} />
  </Panel>

  <Panel name="typography" parent="page">
    <Typography bind:template={template.data} />
  </Panel>

  <Panel name="site" parent="page">
    <Site bind:site={site} />
  </Panel>
</Sidebar>

<SettingsModal bind:show={showSettings} onSave={onSave}>
  <SettingsPanel name="Site">
    <SiteSettings bind:site={site} />
  </SettingsPanel>
</SettingsModal>
