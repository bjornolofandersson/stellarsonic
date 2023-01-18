<script lang="ts">
  import { post } from '@lib/MixStore';
  import SubPanel from './SubPanel.svelte';
  import Timeline from './Timeline.svelte';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import Menu from './Menu.svelte';
  import Editor from './Editor.svelte';
  import MainPanel from './MainPanel.svelte';
  import AssetsForm from './forms/AssetsForm.svelte';
  import ContentForm from './forms/ContentForm.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import { savePost } from '@lib/editor';
  import StyleForm from './forms/StyleForm.svelte';
  import TagsForm from './forms/TagsForm.svelte';
  import PostForm from './forms/PostForm.svelte';

  export let slug: string;
  export let assets: string[];

  let selectedTrack = 0;

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

<Editor bind:pageTitle={$post.title} onSave={() => savePost('mixes', slug, $post)} showPreview={selected !== 'Tracks'}>
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
    <TextInput id="track-name" label="Name" bind:value={$post.tracks[selectedTrack].name} />
    <TextInput id="track-artist" label="Artist" bind:value={$post.tracks[selectedTrack].artist} />
    <NumberInput id="track-year" label="Year" bind:value={$post.tracks[selectedTrack].year} />
  </SubPanel>

  <SubPanel show={selected === 'Tags'} title="Tags" onBack={() => {selected = undefined}}>
    <TagsForm bind:post={$post} />
  </SubPanel>

  <SubPanel show={selected === 'Style'} title="Style" onBack={() => {selected = undefined}}>
    <StyleForm bind:post={$post} />
  </SubPanel>

  {#if selected === 'Tracks'}
    <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
      <Timeline audio={$post.audio} tracks={$post.tracks} onSelect={() => {}} />

      <div class="container mx-auto text-stone-100 p-20 dark overflow-y-auto" style="height: calc(100vh - 100px)">
        <ul class="w-full">
          {#each $post.tracks as track}
          <li class="flex gap-5 w-full">
            <div class="flex-1"><TextInput id="track-name" bind:value={track.name} /></div>
            <div class="flex-1"><TextInput id="track-artist" bind:value={track.artist} /></div>
            <div class="flex-initial"><NumberInput id="track-year" bind:value={track.year} /></div>
          </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>

