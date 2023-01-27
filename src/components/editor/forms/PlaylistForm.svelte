<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import Timeline from "../common/Timeline.svelte";
  import Timestamp from "../common/Timestamp.svelte";

  export let post: any;
  export let context: {playlist: MixPlaylist, selectedTrack: number};

  let playlist = context.playlist;

  let timerId: any;

  function onUpdateBegin(amount: number) {
    playlist.trackBegin(context.selectedTrack, playlist.trackBegin(context.selectedTrack) + amount);
    post.tracks[context.selectedTrack].duration = "";
  }
  function onUpdateEnd(amount: number) {
    playlist.trackEnd(context.selectedTrack, playlist.trackEnd(context.selectedTrack) + amount);
    post.tracks[context.selectedTrack].duration = "";
  }
</script>


<Timeline playlist={playlist} onSelect={t => {context.selectedTrack = t}} selected={context.selectedTrack} />

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
    <Timestamp label="From" time={playlist.trackBegin(context.selectedTrack)} onUpdate={onUpdateBegin} bind:timerId={timerId} editable={context.selectedTrack > 0}/>
    <Timestamp label="To" time={playlist.trackEnd(context.selectedTrack)} onUpdate={onUpdateEnd} bind:timerId={timerId} />
  </div>

  <div class="mt-8">
    <slot/>
  </div>
</div>
