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


<Timeline playlist={playlist} onSelect={t => {track = t}} selected={track} />

<div on:mouseup={() => clearInterval(timerId) } class="container mx-auto text-stone-100 px-20 py-8 dark overflow-y-auto" style="height: calc(100vh - 100px)">
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
    <Timestamp label="From" time={playlist.trackBegin(track)} onUpdate={onUpdateBegin} bind:timerId={timerId} editable={track > 0}/>
    <Timestamp label="To" time={playlist.trackEnd(track)} onUpdate={onUpdateEnd} bind:timerId={timerId} />
  </div>

  <div class="mt-8">
    <slot/>
  </div>
</div>
