<script lang="ts">
  import { Action, ExpandAdd, ExpandRight, Input, Message, Scrollable, TitleBar } from 'src/editor';
  import DescriptionForm from '@components/editor/forms/DescriptionForm.svelte';
  import HeadingsForm from '@components/editor/forms/HeadingsForm.svelte';
  import ImageForm from '@components/editor/forms/ImageForm.svelte';
  import SplitModal from 'src/editor/SplitModal.svelte';
  import PlaylistForm from '@components/editor/forms/PlaylistForm.svelte';
  import type { MusicMix } from './playlist.server';
  import { MixPlaylist } from './playlist';

  export let content: MusicMix;
  export let assets: string[];

  const playlist = MixPlaylist.fromContent(content);

  let showPlaylist: boolean = false;
  let selectedTrack: number = 0;

  let category: string = '';
  let showAdd = false;

  function addTrack() {
    content.tracks = [...content.tracks, {name: `Track ${content.tracks.length + 1}`, artist: '', year: 0, duration: 'PT3M0S'} as any];
    playlist.setTracks(content.tracks);
  }

  function removeTrack() {
    const copy = content.tracks.slice();
    copy.splice(selectedTrack, 1);
    content.tracks = copy;
    playlist.setTracks(content.tracks);
    selectedTrack = Math.max(Math.min(selectedTrack, content.tracks.length - 1), 0);
  }

  function moveItem(list: any[], from: number, to: number) {
    var f = list.splice(from, 1)[0];
    list.splice(to, 0, f);
  }

  function moveNext() {
    const copy = content.tracks.slice();
    moveItem(copy, selectedTrack, selectedTrack + 1);
    content.tracks = copy;
    selectedTrack = selectedTrack + 1;
  }

  function movePrev() {
    const copy = content.tracks.slice();
    moveItem(copy, selectedTrack, selectedTrack  - 1);
    content.tracks = copy;
    selectedTrack = selectedTrack - 1;
  }

  playlist.load();
</script>


<Scrollable>
  <ImageForm bind:post={content} assets={assets} />
  <HeadingsForm bind:post={content} />
  <DescriptionForm bind:post={content} />
  <ExpandRight icon="queue_music" label="Playlist" on:click={() => {showPlaylist = true}}/>
</Scrollable>

<div class="">
  <TitleBar title="categories">
    <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
  </TitleBar>

  <ExpandAdd show={showAdd} onAdd={() => {}}>
    <Input placeholder="Tag" bind:value={category} />
  </ExpandAdd>

  <Message>
    This content does not have any categories yet
  </Message>
</div>


<SplitModal bind:show={showPlaylist} expand={true}>
  <div slot="header">
    <TitleBar title="tracks">
      <Action icon="add" onClick={addTrack} />
    </TitleBar>
  </div>

  <div slot="sidebar">
    <ul>
      {#each content.tracks as track, i}
        <li class="-ml-8 -mr-8 px-8 {selectedTrack === i ? 'bg-[#00000010]' : 'hover:bg-[#ffffff40]'}">
          <button on:click={() => {selectedTrack = i}} class="w-full py-3 text-left flex">
            <span class="inline-block p-1 w-8 mr-4 bg-stone-700 rounded text-stone-100 text-center">{i + 1}</span>
            <div class="text-stone-500">
              <span class="block text-sm">{track.name}</span>
              <span class="block text-xs opacity-50">{track.artist}</span>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <div slot="content" class="bg-stone-800 h-full">
    {#if content.tracks.length > 0}
    <PlaylistForm bind:post={content} playlist={playlist} bind:track={selectedTrack} >
      <label for="track-name" class="text-xs opacity-40">Name</label>
      <Input id="track-name" type="text" placeholder="Name" bind:value={content.tracks[selectedTrack].name} />
      <label for="artist" class="text-xs opacity-40">Artist</label>
      <Input id="artist" type="text" placeholder="Artist" bind:value={content.tracks[selectedTrack].artist} />
      <label for="year" class="text-xs opacity-40">Year</label>
      <Input id="year" type="number" placeholder="Year" bind:value={content.tracks[selectedTrack].year} />

      <svelte:fragment slot="actions">
        <Action icon="close" onClick={() => {showPlaylist = false}}/>
      </svelte:fragment>

      <div slot="footer" class="flex justify-between">
        <button on:click={removeTrack} class="p-4 rounded-md bg-stone-200 text-stone-700 flex">
          <span class="material-symbols-outlined mr-2">delete</span>
          <span>Remove track</span>
        </button>
        <div class="flex gap-4">
        <button on:click={() => movePrev()} class="p-4 rounded-md border border-stone-600 text-stone-400 flex">
          <span class="material-symbols-outlined mr-2">text_select_move_back_word</span>
          <span>Move Prev</span>
        </button>
        <button on:click={() => moveNext()} class="p-4 rounded-md border border-stone-600 text-stone-400 flex">
          <span class="material-symbols-outlined mr-2">text_select_move_forward_word</span>
          <span>Move Next</span>
        </button>
        </div>
      </div>
    </PlaylistForm>
    {/if}
  </div>
</SplitModal>