<script lang="ts">
  import { MixStore } from '@lib/media/Stellarsonic';
  import Editor from './common/Editor.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import Menu from './common/Menu.svelte';
  import MainPanel from './common/MainPanel.svelte';
  import Breadcrumbs from './common/Breadcrumbs.svelte';
  import AssetsForm from './forms/AssetsForm.svelte';
  import ContentForm from './forms/ContentForm.svelte';
  import StyleForm from './forms/StyleForm.svelte';
  import PostForm from './forms/PostForm.svelte';
  import TrackList from './forms/TrackList.svelte';
  import TagsPanel from './forms/TagsPanel.svelte';
  import MusicMixView from './forms/MusicMixView.svelte';

  export let slug: string;
  export let data: any;
  export let assets: string[];

  let {post, playlist, save} = MixStore.instance(slug, data);
  let selected: any = undefined;
  let context = {
    assets,
    playlist,
    save,
    selectedTrack: 0,
  }

  const menuItems = [
    {name: 'Content', icon: 'article', panel: ContentForm},
    {name: 'Tags', icon: 'tag', panel: TagsPanel}, 
    {name: 'Assets', icon: 'perm_media', panel: AssetsForm}, 
    {name: 'Tracks', icon: 'queue_music', panel: TrackList, view: MusicMixView},
    {name: 'Style', icon: 'format_paint', panel: StyleForm},
  ];

  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: 'Mixes', href: '/mixes'},
    {label: slug},
  ]
</script>

<Editor bind:pageTitle={$post.title} onSave={save} showPreview={menuItems.find(i => i.name === selected && i.view !== undefined) === undefined}>
  <Breadcrumbs trail={breadcrumbs} />

  <MainPanel show={selected === undefined}>
    <PostForm>
      <Menu items={menuItems} onSelect={item => {selected = item}}/>
    </PostForm>
  </MainPanel>

  {#each menuItems as item}
    {#if item.panel}
      <SubPanel show={selected === item.name} title={item.name} onBack={() => {selected = undefined}}>
        <svelte:component this={item.panel} bind:post={$post} bind:context={context} />
      </SubPanel>
    {/if}
    {#if item.view && selected === item.name}
      <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
        <svelte:component this={item.view} bind:post={$post} bind:context={context} />
      </div>
    {/if}
  {/each}

  <div slot="preview"><slot/></div>
</Editor>