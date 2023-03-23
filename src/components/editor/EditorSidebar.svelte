<script lang="ts">
  import {
    Action,
    Range,
    SettingsModal,
    SettingsPanel,
    Sidebar,
  } from 'src/editor';
  import ActionBar from 'src/editor/ActionBar.svelte';
  import Panel from 'src/editor/Panel.svelte';
  import type { Page, Template, Palette } from 'src/content/config';
  import type { Entity } from '@lib/interfaces';
  import Typography from '@components/editor/typography/Typography.svelte';
  import Site from '@components/editor/site/Site.svelte';
  import SiteSettings from './site/SiteSettings.svelte';
  import PageEditor from './page/Page.svelte';
  import Colors from './colors/Colors.svelte';
  import { createEventDispatcher } from 'svelte';
  import * as store from '@lib/store';
  import FontPicker from './typography/FontPicker.svelte';
  import PalettePicker from './colors/PalettePicker.svelte';
  import Navigation from './site/Navigation.svelte';

	const dispatch = createEventDispatcher();
  
  export let page: Entity<Page>;
  export let template: Entity<Template>;
  export let palette: Entity<Palette>;
  export let site: any;

  let panel = store.editorPanel('content');
  let title: string = '';

  let showSettings = false;

  function onAddLink(link: any) {
    site.navigation = [...site.navigation, link];
  }

  function onDeleteLink() {

  }

  async function onSave() {
    dispatch('save');
  }
</script>

<Sidebar bind:panel={$panel}>
  <div class="px-8" slot="footer">
    <ActionBar slug={page.slug}>
      <Action icon="save" onClick={onSave}/>
      <Action icon="settings" onClick={() => { showSettings = true }}/>
    </ActionBar>
  </div>

  <Panel name="site">
    <Site bind:site={site} bind:panel={$panel} />
  </Panel>

  <Panel name="navigation" parent="site">
    <Navigation links={site.navigation} onAdd={onAddLink} onDelete={onDeleteLink}/>
  </Panel>

  <Panel name="content" parent="page">
    <slot name="content-editor"/>
  </Panel>

  <Panel name="page" parent="site">
    <PageEditor bind:page={page.data}
      on:content={() => {$panel = 'content'}}
      on:typography={() => {$panel = 'typography'}}
      on:colors={() => {$panel = 'colors'}}
    />
  </Panel>

  <Panel name="colors" parent="page">
    <Colors bind:panel={$panel} bind:page={page.data} bind:palette={palette.data} bind:template={template.data} />
  </Panel>

  <Panel name="typography" parent="page">
    <Typography bind:template={template.data} bind:panel={$panel} />
  </Panel>

  <Panel name="heading" parent="typography">
    <span slot="title">{template.data.fontFamily.h1}</span>
    <FontPicker label="Heading"
      bind:family={template.data.fontFamily.h1}
      bind:weight={template.data.fontWeight.h1}
      bind:lineHeight={template.data.lineHeight.h1}
    >
      <Range label="Size" bind:value={template.data.fontSize.h1} unit="rem" min={1} max={8} step={0.25} />
    </FontPicker>
  </Panel>

  <Panel name="paragraph" parent="typography">
    <span slot="title">{template.data.fontFamily.p}</span>
    <FontPicker label="Paragraph"
      bind:family={template.data.fontFamily.p}
      bind:weight={template.data.fontWeight.p}
      bind:lineHeight={template.data.lineHeight.p}
    >
      <Range label="Size" bind:value={template.data.fontSize.p} unit="rem" min={0.5} max={4} step={0.1} />
    </FontPicker>
  </Panel>

  <Panel name="button" parent="typography">
    <span slot="title">{template.data.fontFamily.button}</span>
    <FontPicker label="Button"
      bind:family={template.data.fontFamily.button}
      bind:weight={template.data.fontWeight.button}
      bind:lineHeight={template.data.lineHeight.button}
    >
      <Range label="Size" bind:value={template.data.fontSize.button} unit="rem" min={0.5} max={4} step={0.1} />
    </FontPicker>
  </Panel>

  <Panel name="palettes" parent="colors">
    <PalettePicker bind:page={page.data} />
  </Panel>
</Sidebar>

<SettingsModal bind:show={showSettings} onSave={onSave}>
  <SettingsPanel name="Site">
    <SiteSettings bind:site={site} />
  </SettingsPanel>
</SettingsModal>
