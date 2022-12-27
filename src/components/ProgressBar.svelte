<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";

  export let player: MixAudioPlayer;
  export let trackColor: string;
  export let progressColor: string;

  let progress = 0;
  let duration = 0;
  let seekWidth: number;

  let progressStyle = `background: ${progressColor}; width: ${100 * progress}%`;

  function onSeek(ev: any) {
    const seek = ev.offsetX / seekWidth;
    const seekSec = seek * player.getCurrentTrackDuration();
    player.skipTrackTo(seekSec);
  }

  function update() {
    progress = player.getCurrentTrackProgress();
    duration = player.getCurrentTrackDuration();
    progressStyle = `background: ${progressColor}; width: ${100 * (progress / duration)}%`;
  }

  function formatTime(t: number) {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    console.log(t);

    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }

  setInterval(update, 100);

</script>

<div class="w-full" style="margin-top: -10px;">
  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-1 rounded-md overflow-hidden" style="background: {trackColor}">
    <div class="h-full" style={progressStyle}></div>
  </button>

  <div class="flex justify-between">
    <div class="text-xs opacity-30">{formatTime(progress)}</div>
    <div class="text-xs opacity-30">{formatTime(duration)}</div>
  </div>
</div>
