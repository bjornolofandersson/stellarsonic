<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";
  import { formatTime } from "@lib/utils";
  import { post } from '@lib/MixStore';
  import ControlButton from "../ControlButton.svelte";

  let player: MixAudioPlayer;

  post.subscribe(p => {
    if (p.audio) {
      player = MixAudioPlayer.getInstance({audio: p.audio, tracks: p.tracks} as any);
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
    const seekSec = seek * player.getCurrentTrackDuration();
    player.skipTrackTo(seekSec);
  }

  function update() {
    progress = player.getCurrentTrackProgress();
    duration = player.getCurrentTrackDuration();
    progressStyle = `background: ${$post.colors[1]}; width: ${100 * (progress / duration)}%;`;
    isPlaying = player.isPlaying();
  }
</script>

<div class="w-full h-20 relative">
  {#if player}
  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-2 overflow-hidden absolute bottom-0" style="background: #ffffff06">
    <div class="h-full" style={progressStyle}></div>
  </button>
  <div class="absolute w-full flex justify-between bottom-0 -mb-6">
    <div class="text-xs opacity-30 dark:text-white">{formatTime(progress)}</div>
    <div class="text-xs opacity-30 dark:text-white">{formatTime(duration)}</div>
  </div>
  <div class="flex justify-between">
    <ControlButton icon="skip_previous" onClick={() => player.skipPrev()} />

    {#if isPlaying}
      <ControlButton icon="pause" onClick={() => player.pause()} />
    {:else}
      <ControlButton icon="play_arrow" onClick={() => player.play()} />
    {/if}

    <ControlButton icon="skip_next" onClick={() => player.skipNext()} />
  </div>
  {/if}
</div>
