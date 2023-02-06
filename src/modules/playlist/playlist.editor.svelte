<script lang="ts">
  import { Accordion, AccordionItem, Action, BackArrow, Editor, Input, Label, MainPanel, Scrollable, TitleBar } from 'src/editor';
  import DescriptionForm from '@components/editor/forms/DescriptionForm.svelte';
  import HeadingsForm from '@components/editor/forms/HeadingsForm.svelte';
  import ImageForm from '@components/editor/forms/ImageForm.svelte';
  import StyleForm from '@components/editor/forms/StyleForm.svelte';
  import { MixStore } from './playlist';
  import SplitModal from 'src/editor/SplitModal.svelte';
  import PlaylistForm from '@components/editor/forms/PlaylistForm.svelte';

  export let slug: string;
  export let data: any;
  export let assets: string[];
  export let parentUrl: string;

  let store = MixStore.instance(slug, data);
  let {post, playlist} = store;
  let showPlaylist: boolean = false;
  let selectedTrack: number = 0;

  function addTrack() {
    $post.tracks = [...$post.tracks, {name: `Track ${$post.tracks.length + 1}`, artist: '', year: 0, duration: 'PT3M0S'} as any];
    playlist.setTracks($post.tracks);
  }

  function removeTrack() {
    const copy = $post.tracks.slice();
    copy.splice(selectedTrack, 1);
    $post.tracks = copy;
    playlist.setTracks($post.tracks);
    selectedTrack = Math.max(Math.min(selectedTrack, $post.tracks.length - 1), 0);
  }

  function moveItem(list: any[], from: number, to: number) {
    var f = list.splice(from, 1)[0];
    list.splice(to, 0, f);
  }

  function moveNext() {
    const copy = $post.tracks.slice();
    moveItem(copy, selectedTrack, selectedTrack + 1);
    $post.tracks = copy;
    selectedTrack = selectedTrack + 1;
  }

  function movePrev() {
    const copy = $post.tracks.slice();
    moveItem(copy, selectedTrack, selectedTrack  - 1);
    $post.tracks = copy;
    selectedTrack = selectedTrack - 1;
  }

  playlist.load();
</script>

<Editor pageTitle={$post.title} onSave={() => {}}>
  <MainPanel>
    <BackArrow url={parentUrl} />

    <TitleBar title={$post.title}>
      <Action icon="queue_music" onClick={() => {showPlaylist = true}} />
    </TitleBar>

    <div class="mt-8">
      <Scrollable>
        <Accordion>
          <AccordionItem name="Headings" icon="title">
            <HeadingsForm bind:post={$post} />
          </AccordionItem>
          <AccordionItem name="Description" icon="description">
            <DescriptionForm bind:post={$post} />
          </AccordionItem>
          <AccordionItem name="Image" icon="image">
            <ImageForm bind:post={$post} assets={assets} />
          </AccordionItem>
          <AccordionItem name="Style" icon="format_paint">
            <StyleForm bind:post={$post} />
          </AccordionItem>
        </Accordion>
      </Scrollable>
    </div>
  </MainPanel>

  <SplitModal bind:show={showPlaylist} expand={true}>
    <div slot="header">
      <TitleBar title="tracks">
        <Action icon="add" onClick={addTrack} />
      </TitleBar>
    </div>

    <div slot="sidebar">
      <ul>
        {#each $post.tracks as track, i}
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
      {#if $post.tracks.length > 0}
      <PlaylistForm bind:post={$post} bind:playlist={playlist} bind:track={selectedTrack} >
        <label for="track-name" class="text-xs opacity-40">Name</label>
        <Input id="track-name" type="text" placeholder="Name" bind:value={$post.tracks[selectedTrack].name} />
        <label for="artist" class="text-xs opacity-40">Artist</label>
        <Input id="artist" type="text" placeholder="Artist" bind:value={$post.tracks[selectedTrack].artist} />
        <label for="year" class="text-xs opacity-40">Year</label>
        <Input id="year" type="number" placeholder="Year" bind:value={$post.tracks[selectedTrack].year} />

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

  <div slot="preview"><slot/></div>
</Editor>
