<script lang="ts">
  import { MixAudioPlayer } from "../../lib/AudioPlayer";
  import { formatTime } from "../../lib/utils";

  export let player: MixAudioPlayer;
  export let trackColor: string;
  export let progressColor: string;

  let progress = 0;
  let duration = 0;
  let seekWidth: number;
  let track: any = {};

  let progressStyle = `background: ${progressColor}; width: ${100 * progress}%`;

  function onSeek(ev: any) {
    const seek = ev.offsetX / seekWidth;
    const seekSec = seek * player.getCurrentTrackDuration();
    player.skipTrackTo(seekSec);
  }

  function onClickTrack(index: number) {
    player.play(index);
  }

  function update() {
    progress = player.getCurrentTrackProgress();
    duration = player.getCurrentTrackDuration();
    progressStyle = `background: ${progressColor}; width: ${100 * (progress / duration)}%`;
    track = player.getTrackData(player.getCurrentTrack());
  }


  setInterval(update, 100);

</script>

<div class="w-full" style="margin-top: -10px;">
  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-1 rounded-md overflow-hidden" style="background: {trackColor}">
    <div class="h-full" style={progressStyle}></div>
  </button>
  <div class="flex justify-between pb-2">
    {#each player.playlist.tracks as t, i}
      {#if t === track}
        <div class="w-full h-4 mr-1 last:mr-0 rounded-sm bg-light-accent dark:bg-dark-accent"></div>
      {:else}
        <button class="w-full h-4 mr-1 last:mr-0 rounded-sm hover:bg-slate-200" style="border: 1px solid #00000030;" on:click={() => onClickTrack(i)}></button>
      {/if}
    {/each}
  </div>

  <div class="flex justify-between">
    <div class="text-xs opacity-30 dark:text-white">{formatTime(progress)}</div>
    <div class="text-xs opacity-30 dark:text-white">{track.artist} · {track.year}</div>
    <div class="text-xs opacity-30 dark:text-white">{formatTime(duration)}</div>
  </div>
</div>
