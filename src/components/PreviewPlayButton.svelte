<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

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

<div>
  <button class="w-16 mr-6 aspect-square text-slate-600 hover:text-accent" style="border: 1px solid #CCC" on:click={onClick}>
    <span class="mt-2 material-symbols-outlined">
      {#if isPlaying}
        pause
      {:else}
        play_arrow
      {/if}
    </span>
  </button>
</div>

<style>
  .material-symbols-outlined {
    font-size: 18px;
  }
</style>
