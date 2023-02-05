<script lang="ts">
  import ProgressBar from "@components/common/ProgressBar.svelte";
  import { MixPlaylist } from "@lib/media/MixPlaylist";

  export let playlist: MixPlaylist;
  export let onSelect: (track: number) => void;
  export let selected = 0;

  let progress = playlist.player.progress / playlist.player.duration;
  let totalDuration = Math.max(playlist.duration, playlist.player.duration);
  let tracksWidth = 0;

  console.log(playlist.duration);
  console.log(playlist.player.duration);

  function onSelectTrack(track: number) {
    selected = track;
    onSelect(track);
  }

  function onSeek(t: number) {
    playlist.player.skipTo(t * playlist.player.duration);
  }

  function update() {
    progress = playlist.player.progress / playlist.player.duration;
    totalDuration = Math.max(playlist.duration, playlist.player.duration);
  }

  setInterval(update, 100);
</script>

<div class="w-full">
  <div class="w-full flex justify-start" bind:clientWidth={tracksWidth}>
    {#each playlist.tracks as track, i}
      <button on:click={() => onSelectTrack(i)}
        class="border-stone-900 text-stone-300 text-left border-r px-2 py-7 {selected === i ? 'bg-amber-700' : 'bg-[#00000010] hover:bg-stone-700'}"
        style="width: {(playlist.trackDuration(i) / totalDuration) * tracksWidth}px;">
        {i + 1}
      </button>
    {/each}
  </div>
  <div class="h-3 bg-stone-900 relative w-full">
  <div class="h-3 bg-stone-800 relative" style="width: {(playlist.player.duration / totalDuration) * 100}%">
    <ProgressBar progress={progress} colorProgress="#67b9b5" onSeek={onSeek} />
    <!--<div class="bg-stone-500 h-full" style="width: {progress * 100}%"></div>-->
  </div>
  </div>
</div>
