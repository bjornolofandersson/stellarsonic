<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import ProgressBar from "./PreviewProgressBar.svelte";

  export let playlist: MixPlaylist;

  let track: any = {};

  function update() {
    track = playlist.currentTrackData;
  }
  setInterval(update, 100);
</script>

{#if playlist && playlist.audio && playlist.tracks.length > 0}
<div class="w-full">
  <div class="flex justify-between">
    <button class="mt-2 text-slate-600 dark:text-slate-200" on:click={() => playlist.skipPrev()}>
      <span class="material-symbols-outlined text-md">skip_previous</span> 
    </button>

    <div class="text-xs mt-2 opacity-30 dark:text-white">{track.name}</div>

    <button class="mt-2 text-slate-600 dark:text-slate-200" on:click={() => playlist.skipNext()}>
      <span class="material-symbols-outlined text-md">skip_next</span> 
    </button>
  </div>

  <ProgressBar playlist={playlist} trackColor="#00000020" progressColor="#d77f7a"/>
</div>
{/if}
