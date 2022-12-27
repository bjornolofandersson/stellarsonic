<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";
  import ProgressBar from "./ProgressBar.svelte";

  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);

  let isPlaying = false;

  function onClick() {
    if (player.isPlaying()) {
      player.pause();
    } else {
      player.play()
    }
  }

  function update() {
    isPlaying = player.isPlaying();
  }

  setInterval(update, 100);

</script>

<div class="w-full h-32 shadow-md p-4" style="background: #FFFFFF05">
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

  <ProgressBar player={player} trackColor="#00000030" progressColor="#d77f7a"/>
</div>
