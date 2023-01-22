<script lang="ts">
  import { post } from '@lib/MixStore';
  import { savePost } from '@lib/editor';
  import Editor from './common/Editor.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import Timeline from './common/Timeline.svelte';
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
  import Button from './common/Button.svelte';
  import { hours, minutes, seconds } from '@lib/utils';
  import { MixPlaylist } from '@lib/media/MixPlaylist';
  import { Stellarsonic } from '@lib/media/Stellarsonic';

  export let slug: string;
  export let assets: string[];

  let selectedTrack = 0;
  let playlist: MixPlaylist;

  post.subscribe(p => {
    if (p.audio) {
      playlist = Stellarsonic.mixPlaylist(p.audio, p.tracks);
    }
  });

  function onUpdateBegin(amount: number) {
    playlist.trackBegin(selectedTrack, playlist.trackBegin(selectedTrack) + amount);
    $post.tracks[selectedTrack].duration = "";
  }
  function onUpdateEnd(amount: number) {
    playlist.trackEnd(selectedTrack, playlist.trackEnd(selectedTrack) + amount);
    $post.tracks[selectedTrack].duration = "";
  }

  let timerID: any;

  function onBeginDown(amount: number) {
    timerID = setTimeout(() => {
      timerID = setInterval(() => onUpdateBegin(amount), 100);
    }, 400);
  }
  function onEndDown(amount: number) {
    timerID = setTimeout(() => {
      timerID = setInterval(() => onUpdateEnd(amount), 100);
    }, 400);
  }

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

  function pad(value: number) {
    return value < 10 ? '0' + value : value;
  }
</script>

<div on:mouseup={() => clearInterval(timerID) }>
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
    <Button label="Add" icon="add" onClick={() => {}} />

    <ul class="mt-8">
      {#each $post.tracks as track, i}
        <li class="px-4 rounded-md {selectedTrack === i ? 'bg-[#ffffff60]' : 'hover:bg-[#ffffff40]'}">
          <button on:click={() => onSelectTrack(i)} class="w-full py-3 text-left">{i + 1}. {track.name}</button></li>
      {/each}
    </ul>
  </SubPanel>

  <SubPanel show={selected === 'Tags'} title="Tags" onBack={() => {selected = undefined}}>
    <TagsForm bind:post={$post} />
  </SubPanel>

  <SubPanel show={selected === 'Style'} title="Style" onBack={() => {selected = undefined}}>
    <StyleForm bind:post={$post} />
  </SubPanel>

  {#if selected === 'Tracks' && playlist}
    <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
      <Timeline playlist={playlist} onSelect={onSelectTrack} selected={selectedTrack} />

      <div class="container mx-auto text-stone-100 px-20 py-8 dark overflow-y-auto" style="height: calc(100vh - 100px)">
        <button on:click={() => {}}>
          <span class="material-symbols-outlined">skip_next</span>
        </button>
        <button on:click={() => {}}>
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
        <button on:click={() => {}}>
          <span class="material-symbols-outlined">skip_previous</span>
        </button>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-10 bg-[#00000030] rounded-md mt-10 relative">
            {#if selectedTrack > 0}
            <div class="absolute right-4 text-amber-600">
              <button on:mousedown={() => onBeginDown(-1)} on:click={() => onUpdateBegin(-1)}>
                <span class="material-symbols-outlined">first_page</span>
              </button>
              <button on:mousedown={() => onBeginDown(1)} on:click={() => onUpdateBegin(1)}>
                <span class="material-symbols-outlined">last_page</span>
              </button>
            </div>
            {/if}
            <h3>From</h3>
            <div class="flex gap-2 text-6xl">
              <span>{pad(hours(playlist.trackBegin(selectedTrack)))}</span>
              <span>:</span>
              <span>{pad(minutes(playlist.trackBegin(selectedTrack)))}</span>
              <span>:</span>
              <span>{pad(seconds(playlist.trackBegin(selectedTrack)))}</span>
            </div>
          </div>
          <div class="p-10 bg-[#00000030] rounded-md mt-10 relative">
            <div class="absolute right-4 text-amber-600">
              <button on:mousedown={() => onEndDown(-1)} on:click={() => onUpdateEnd(-1)}>
                <span class="material-symbols-outlined">first_page</span>
              </button>
              <button on:mousedown={() => onEndDown(1)} on:click={() => onUpdateEnd(1)}>
                <span class="material-symbols-outlined">last_page</span>
              </button>
            </div>
            <h3>To</h3>
            <div class="flex gap-2 text-6xl">
              <span>{pad(hours(playlist.trackEnd(selectedTrack)))}</span>
              <span>:</span>
              <span>{pad(minutes(playlist.trackEnd(selectedTrack)))}</span>
              <span>:</span>
              <span>{pad(seconds(playlist.trackEnd(selectedTrack)))}</span>
            </div>
          </div>
        </div>
          <div class="mt-8">
            <TextInput id="track-name" label="Name" bind:value={$post.tracks[selectedTrack].name} />
            <TextInput id="track-artist" label="Artist" bind:value={$post.tracks[selectedTrack].artist} />
            <NumberInput id="track-year" label="Year" bind:value={$post.tracks[selectedTrack].year} />
          </div>
      </div>
    </div>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>
</div>

