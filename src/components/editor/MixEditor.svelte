<script lang="ts">
  import { MixStore } from '@lib/media/Stellarsonic';
  import Editor from './common/Editor.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import TextInput from './common/TextInput.svelte';
  import NumberInput from './common/NumberInput.svelte';
  import Menu from './common/Menu.svelte';
  import MainPanel from './common/MainPanel.svelte';
  import Breadcrumbs from './common/Breadcrumbs.svelte';
  import AssetsForm from './forms/AssetsForm.svelte';
  import ContentForm from './forms/ContentForm.svelte';
  import StyleForm from './forms/StyleForm.svelte';
  import TagsForm from './forms/TagsForm.svelte';
  import PostForm from './forms/PostForm.svelte';
  import TrackList from './forms/TrackList.svelte';
  import PlaylistForm from './forms/PlaylistForm.svelte';

  export let slug: string;
  export let data: any;
  export let assets: string[];

  let selectedTrack = 0;

  let {post, playlist, save} = MixStore.instance(slug, data);

  function onSelectTrack(track: number) {
    selectedTrack = track;
  }

  let selected: any = undefined;

  const menuItems = [
    {name: 'Content', icon: 'article'},
    {name: 'Tags', icon: 'tag'}, 
    {name: 'Assets', icon: 'perm_media'}, 
    {name: 'Tracks', icon: 'queue_music'},
    {name: 'Style', icon: 'format_paint'}
  ];

  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: 'Mixes', href: '/mixes'},
    {label: slug},
  ]
</script>

<Editor bind:pageTitle={$post.title} onSave={save} showPreview={selected !== 'Tracks'}>
  <Breadcrumbs trail={breadcrumbs} />

  <MainPanel show={selected === undefined}>
    <PostForm>
      <Menu items={menuItems} onSelect={item => {selected = item}}/>
    </PostForm>
  </MainPanel>

  <SubPanel show={selected === 'Content'} title="Content" onBack={() => {selected = undefined}}>
    <ContentForm bind:post={$post} />
  </SubPanel>

  <SubPanel show={selected === 'Assets'} title="Assets" onBack={() => {selected = undefined}}>
    <AssetsForm bind:post={$post} assets={assets} />
  </SubPanel>

  <SubPanel show={selected === 'Tracks'} title="Tracks" onBack={() => {selected = undefined}}>
    <TrackList bind:post={$post} selected={selectedTrack} onSelect={onSelectTrack} onAdd={() => {}} />
  </SubPanel>

  <SubPanel show={selected === 'Tags'} title="Tags" onBack={() => {selected = undefined}}>
    <TagsForm bind:post={$post} title="GENRES" key="genres" />
    <TagsForm bind:post={$post} title="TAGS" key="tags" />
  </SubPanel>

  <SubPanel show={selected === 'Style'} title="Style" onBack={() => {selected = undefined}}>
    <StyleForm bind:post={$post} />
  </SubPanel>

  {#if selected === 'Tracks' && playlist}
    <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
      <PlaylistForm bind:post={$post} playlist={playlist} track={selectedTrack} onSelect={onSelectTrack}>
        <TextInput id="track-name" label="Name" bind:value={$post.tracks[selectedTrack].name} />
        <TextInput id="track-artist" label="Artist" bind:value={$post.tracks[selectedTrack].artist} />
        <NumberInput id="track-year" label="Year" bind:value={$post.tracks[selectedTrack].year} />
      </PlaylistForm>
    </div>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>