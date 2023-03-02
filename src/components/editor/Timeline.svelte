<script lang="ts">
  import ProgressBar from "@components/common/ProgressBar.svelte";
  import { MixPlaylist } from "@modules/playlist/playlist";

  export let playlist: MixPlaylist;
  export let onSelect: (track: number) => void;
  export let selected = 0;

  let progress = playlist.player.progress / playlist.player.duration;
  let totalDuration = Math.max(playlist.duration, playlist.player.duration);
  let track = playlist.currentTrack;
  let tracksWidth = 0;

  function onSelectTrack(track: number) {
    selected = track;
    onSelect(track);
  }

  function onPlayTrack(track: number) {
    onSelectTrack(track);
    playlist.play(track);
  }

  function onSeek(t: number) {
    playlist.player.skipTo(t * playlist.player.duration);
  }

  function update() {
    progress = playlist.player.progress / playlist.player.duration;
    totalDuration = Math.max(playlist.duration, playlist.player.duration);
    track = playlist.currentTrack;
  }

  setInterval(update, 100);
</script>

<div class="w-full">
  <div class="h-3 bg-stone-900 relative w-full">
    <div class="h-3 bg-stone-800 relative" style="width: {(playlist.player.duration / totalDuration) * 100}%">
      <ProgressBar progress={progress} onSeek={onSeek} />
    </div>
  </div>
  <div class="w-full flex justify-start" bind:clientWidth={tracksWidth}>
    {#each playlist.tracks as _, i}
      <button on:click={() => onPlayTrack(i)}
        class="border-stone-900 text-stone-300 text-left border-r h-5 {track === i ? 'bg-amber-900 hover:bg-amber-800' : 'bg-[#00000020] hover:bg-stone-700'}"
        style="width: {(playlist.trackDuration(i) / totalDuration) * tracksWidth}px;">
      </button>
    {/each}
  </div>
  <div class="w-full flex justify-start" bind:clientWidth={tracksWidth}>
    {#each playlist.tracks as track, i}
      <button on:click={() => onSelectTrack(i)}
        class="border-stone-900 text-stone-300 text-left border-r px-2 py-7 {selected === i ? 'bg-amber-700' : 'bg-[#00000010] hover:bg-stone-700'}"
        style="width: {(playlist.trackDuration(i) / totalDuration) * tracksWidth}px;">
        {i + 1}
      </button>
    {/each}
  </div>
</div>
