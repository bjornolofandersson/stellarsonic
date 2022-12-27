<script>
  import * as AudioPlayer from "./AudioPlayer";

  export let track;
  export let playlist;

  const {byArtist, name, copyrightYear} = playlist.track[track];
  let isPlaying = false;

  function onClick() {
    if (AudioPlayer.isPlaying(track)) {
      AudioPlayer.pause();
    } else {
      AudioPlayer.play(playlist, track)
    }
  }

  function checkIsPlaying() {
    isPlaying = AudioPlayer.isPlaying(track);
  }

  setInterval(checkIsPlaying, 100);

</script>

<div>
  <li class="p-4 text-sm">
    {#if isPlaying}
      <button class="mt-2 px-2" on:click={onClick}>
        <span class="material-symbols-outlined">pause</span>
      </button>
    {:else}
      <button class="mt-2 px-2" on:click={onClick}>
        <span class="material-symbols-outlined">play_arrow</span>
      </button>
    {/if}
    <span>{byArtist} - {name} ({copyrightYear})</span>
  </li>
</div>
