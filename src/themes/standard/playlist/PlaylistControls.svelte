<script lang="ts">
  import { formatTime } from "@lib/utils";
  import { MixPlaylist } from "@modules/playlist/playlist";
  import ControlButton from "../common/ControlButton.svelte";
  import ProgressBar from "@components/common/ProgressBar.svelte";
    import PlayButton from "@theme/common/PlayButton.svelte";

  export let playlist: MixPlaylist;

  let progress = 0;
  let duration = 0;
  let isPlaying = false;

  function update() {
    progress = playlist.currentTrackProgress;
    duration = playlist.currentTrackDuration;
    isPlaying = !playlist.player.isPaused;
  }
  setInterval(update, 100);

  function onSeek(seek: number) {
    playlist.skipTrackTo(seek * playlist.currentTrackDuration);
  }
</script>

<div class="w-full h-20 relative">
  {#if playlist}
  <ProgressBar onSeek={onSeek} progress={progress / duration} />

  <div class="absolute w-full flex justify-between bottom-0 -mb-6">
    <div class="text-xs opacity-30 dark:text-white">{formatTime(progress)}</div>
    <div class="text-xs opacity-30 dark:text-white">{formatTime(duration)}</div>
  </div>

  <div class="flex justify-center gap-4">
    <ControlButton icon="skip_previous" onClick={() => playlist.skipPrev()} />

    {#if isPlaying}
      <PlayButton icon="pause" onClick={() => playlist.player.pause()} />
    {:else}
      <PlayButton icon="play_arrow" onClick={() => playlist.play()} />
    {/if}

    <ControlButton icon="skip_next" onClick={() => playlist.skipNext()} />
  </div>
  {/if}
</div>
