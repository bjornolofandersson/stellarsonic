<script lang="ts">
  import { Stellarsonic } from "@lib/media/Stellarsonic";

  export let post: any;
  const playlist = Stellarsonic.mixPlaylist(post.audio, post.tracks);

  let isPlaying = false;

  function onClick() {
    if (!playlist.player.isPaused) {
      playlist.player.pause();
    } else {
      playlist.play()
    }
  }

  function update() {
    isPlaying = !playlist.player.isPaused;
  }

  setInterval(update, 100);
</script>

<div>
  <button class="w-16 mr-6 aspect-square text-slate-600 dark:text-slate-200 hover:text-accent" style="border: 1px solid #CCC" on:click={onClick}>
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
