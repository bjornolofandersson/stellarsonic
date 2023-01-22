<script lang="ts">
  import { formatTime } from "@lib/utils";
  import { post } from '@lib/MixStore';
  import ControlButton from "../ControlButton.svelte";
  import { Stellarsonic } from "@lib/media/Stellarsonic";
  import { MixPlaylist } from "@lib/media/MixPlaylist";

  let player = Stellarsonic.audioPlayer();
  let playlist: MixPlaylist;

  post.subscribe(p => {
    if (p.audio) {
      playlist = Stellarsonic.mixPlaylist(p.audio, p.tracks);
      setInterval(update, 100);
    }
  });

  let progress = 0;
  let duration = 0;
  let seekWidth: number;
  let isPlaying = false;

  let progressStyle = `background: ${$post.colors[1]}; width: ${100 * progress}%`;

  function onSeek(ev: any) {
    const seek = ev.offsetX / seekWidth;
    const seekSec = seek * playlist.currentTrackDuration;
    playlist.skipTrackTo(seekSec);
  }

  function update() {
    progress = playlist.currentTrackProgress;
    duration = playlist.currentTrackDuration;
    progressStyle = `background: ${$post.colors[1]}; width: ${100 * (progress / duration)}%;`;
    isPlaying = !player.isPaused;
  }
</script>

<div class="w-full h-20 relative">
  {#if playlist}
  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-2 overflow-hidden absolute bottom-0" style="background: #ffffff06">
    <div class="h-full" style={progressStyle}></div>
  </button>
  <div class="absolute w-full flex justify-between bottom-0 -mb-6">
    <div class="text-xs opacity-30 dark:text-white">{formatTime(progress)}</div>
    <div class="text-xs opacity-30 dark:text-white">{formatTime(duration)}</div>
  </div>
  <div class="flex justify-between">
    <ControlButton icon="skip_previous" onClick={() => playlist.skipPrev()} />

    {#if isPlaying}
      <ControlButton icon="pause" onClick={() => player.pause()} />
    {:else}
      <ControlButton icon="play_arrow" onClick={() => playlist.play()} />
    {/if}

    <ControlButton icon="skip_next" onClick={() => playlist.skipNext()} />
  </div>
  {/if}
</div>
