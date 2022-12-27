<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);

  let isPlaying = false;
  let progress = 0;
  let duration = 0;
  let seekWidth: number;

  let progressStyle = `background: #FFFFFF30; width: ${100 * progress}%`;

  function onClick() {
    if (player.isPlaying()) {
      player.pause();
    } else {
      player.play()
    }
  }

  function onSeek(ev: any) {
    const seek = ev.offsetX / seekWidth;
    const seekSec = seek * player.getCurrentTrackDuration();
    player.skipTrackTo(seekSec);
  }

  function update() {
    isPlaying = player.isPlaying();
    progress = player.getCurrentTrackProgress();
    duration = player.getCurrentTrackDuration();
    progressStyle = `background: #d77f7a; width: ${100 * (progress / duration)}%`;
  }

  function formatTime(t: number) {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    console.log(t);

    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }

  setInterval(update, 100);

</script>

<div class="w-full h-32 rounded-md p-4" style="background: #FFFFFF05">
  <div class="flex justify-between">
    <button class="mt-2 px-2" on:click={() => player.skipPrev()}>
      <span class="material-symbols-outlined">skip_previous</span> 
    </button>

    {#if isPlaying}
      <button class="mt-2 px-2" on:click={onClick}>
        <span class="material-symbols-outlined">pause</span>
      </button>
    {:else}
      <button class="mt-2 px-2" on:click={onClick}>
        <span class="material-symbols-outlined">play_arrow</span>
      </button>
    {/if}

    <button class="mt-2 px-2" on:click={() => player.skipNext()}>
      <span class="material-symbols-outlined">skip_next</span> 
    </button>
  </div>

  <button bind:clientWidth={seekWidth} on:click={onSeek} class="w-full h-2 mt-4 rounded-md overflow-hidden" style="background: #00000030">
    <div class="h-full" style={progressStyle}></div>
  </button>

  <div class="flex justify-between">
    <div class="text-xs opacity-30">{formatTime(progress)}</div>
    <div class="text-xs opacity-30">{formatTime(duration)}</div>
  </div>
</div>