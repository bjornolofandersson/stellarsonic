<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

  export let playlist: MusicMix;
  export let progressColor: string;

  const player = MixAudioPlayer.getInstance(playlist);

  let progress = 0;
  let duration = 0;
  let seekWidth: number;
  let isPlaying = false;

  let progressStyle = `background: ${progressColor}; width: ${100 * progress}%`;

  function onSeek(ev: any) {
    const seek = ev.offsetX / seekWidth;
    const seekSec = seek * player.getCurrentTrackDuration();
    player.skipTrackTo(seekSec);
  }

  function update() {
    progress = player.getCurrentTrackProgress();
    duration = player.getCurrentTrackDuration();
    progressStyle = `background: ${progressColor}; width: ${100 * (progress / duration)}%;`;
    isPlaying = player.isPlaying();
  }

  function formatTime(t: number) {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    console.log(t);

    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }

  setInterval(update, 100);
</script>

<div class="w-full h-20 relative">
  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-2 overflow-hidden absolute bottom-0" style="background: #ffffff06">
    <div class="h-full" style={progressStyle}></div>
  </button>
  <div class="absolute w-full flex justify-between bottom-0 -mb-6">
    <div class="text-xs opacity-30 dark:text-white">{formatTime(progress)}</div>
    <div class="text-xs opacity-30 dark:text-white">{formatTime(duration)}</div>
  </div>
  <div class="flex justify-between">
    <button class="mt-2 p-2 w-14" style="border: 1px solid #ffffff30" on:click={() => player.skipPrev()}>
      <span class="material-symbols-outlined mt-1">skip_previous</span> 
    </button>

    {#if isPlaying}
      <button class="mt-2 p-2 w-14" style="border: 1px solid #ffffff30" on:click={() => player.pause()}>
        <span class="material-symbols-outlined mt-1">pause</span>
      </button>
    {:else}
      <button class="mt-2 px-2 w-14" style="border: 1px solid #ffffff30" on:click={() => player.play()}>
        <span class="material-symbols-outlined mt-1">play_arrow</span>
      </button>
    {/if}

    <button class="mt-2 px-2 w-14" style="border: 1px solid #ffffff30" on:click={() => player.skipNext()}>
      <span class="material-symbols-outlined mt-1">skip_next</span> 
    </button>
  </div>
</div>
