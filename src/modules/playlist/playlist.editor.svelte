<script lang="ts">
  import { Accordion, AccordionItem, Action, BackArrow, Editor, MainPanel, Scrollable, TitleBar } from 'src/editor';
  import DescriptionForm from '@components/editor/forms/DescriptionForm.svelte';
  import HeadingsForm from '@components/editor/forms/HeadingsForm.svelte';
  import ImageForm from '@components/editor/forms/ImageForm.svelte';
  import StyleForm from '@components/editor/forms/StyleForm.svelte';
  import { MixStore } from './playlist';
  import SplitModal from 'src/editor/SplitModal.svelte';
  import Timeline from '@components/editor/Timeline.svelte';
    import MusicMixView from '@components/editor/forms/MusicMixView.svelte';

  export let slug: string;
  export let data: any;
  export let assets: string[];
  export let parentUrl: string;

  let store = MixStore.instance(slug, data);
  let {post, playlist} = store;
  let showPlaylist: boolean = false;
  let selectedTrack: number = 0;
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

  <SplitModal title="Tracks" icon="queue_music" bind:show={showPlaylist} expand={true}>
    <div slot="header">
      <TitleBar title="tracks">
        <Action icon="add" onClick={() => {}} />
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

    <div slot="footer" class="">
      <button on:click={() => store.save()} type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-stone-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm">Save</button>
      <button on:click={() => {showPlaylist = false}} type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
    </div>

    <div slot="content" class="bg-stone-800 h-full">
      <MusicMixView bind:post={$post} playlist={playlist} bind:track={selectedTrack} />
      <!---<Timeline playlist={playlist} onSelect={t => {selectedTrack = t}} selected={selectedTrack}/>-->
    </div>
  </SplitModal>

  <div slot="preview"><slot/></div>
</Editor>
