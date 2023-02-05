<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import Timeline from "../Timeline.svelte";
  import Timestamp from "../Timestamp.svelte";

  export let post: any;
  export let playlist: MixPlaylist;
  export let track: number;

  let timerId: any;
  let isPlaying: boolean = false;

  function onUpdateBegin(amount: number) {
    playlist.trackBegin(track, playlist.trackBegin(track) + amount);
    post.tracks[track].duration = "";
  }
  function onUpdateEnd(amount: number) {
    playlist.trackEnd(track, playlist.trackEnd(track) + amount);
    post.tracks[track].duration = "";
  }

  setInterval(() => { isPlaying = !playlist.player.isPaused}, 100);
</script>

<div on:mouseup={() => clearInterval(timerId) } class="text-stone-100 dark flex flex-col h-full">
  <div class="w-full border-b border-stone-900">
    <div class="w-full mt-2 py-3 px-8 flex justify-between">
      <div class="flex">
        <button class="mr-4 px-4 py-2 text-stone-400 hover:text-white" on:click={() => {}}>
          <span class="material-symbols-outlined">skip_previous</span>
        </button>
        {#if !isPlaying }
          <button class="mr-4 px-4 py-2 text-stone-400 hover:text-white" on:click={() => {playlist.play()}}>
            <span class="material-symbols-outlined">play_arrow</span>
          </button>
        {:else}
          <button class="mr-4 px-4 py-2 text-stone-400 hover:text-white" on:click={() => {playlist.player.pause()}}>
            <span class="material-symbols-outlined">pause</span>
          </button>
        {/if}
        <button class="mr-4 px-4 py-2 text-stone-400 hover:text-white" on:click={() => {}}>
          <span class="material-symbols-outlined">skip_next</span>
        </button>
      </div>
      <div class="">
        <slot name="actions"/>
      </div>
    </div>
  </div>
  <Timeline playlist={playlist} onSelect={t => {track = t}} selected={track} />
  <div class="flex-grow">
    <div class="grid grid-cols-2 gap-4">
      <Timestamp label="From" time={playlist.trackBegin(track)} onUpdate={onUpdateBegin} bind:timerId={timerId} editable={track > 0}/>
      <Timestamp label="To" time={playlist.trackEnd(track)} onUpdate={onUpdateEnd} bind:timerId={timerId} />
    </div>

    <div class="mt-8 p-8">
      <slot/>
    </div>
  </div>
</div>
