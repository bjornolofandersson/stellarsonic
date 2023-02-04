<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import Timeline from "../Timeline.svelte";
  import Timestamp from "../Timestamp.svelte";

  export let post: any;
  export let playlist: MixPlaylist;
  export let track: number;

  let timerId: any;

  function onUpdateBegin(amount: number) {
    playlist.trackBegin(track, playlist.trackBegin(track) + amount);
    post.tracks[track].duration = "";
  }
  function onUpdateEnd(amount: number) {
    playlist.trackEnd(track, playlist.trackEnd(track) + amount);
    post.tracks[track].duration = "";
  }
</script>

<div on:mouseup={() => clearInterval(timerId) } class="text-stone-100 dark flex flex-col h-full">
  <div class="w-full border-b border-stone-900">
    <div class="w-full py-4 px-8 flex justify-between">
      <div class="flex">
        <button class="m-3" on:click={() => {}}>
          <span class="material-symbols-outlined">skip_previous</span>
        </button>
        <button class="m-3" on:click={() => {}}>
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
        <button class="m-3" on:click={() => {}}>
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
