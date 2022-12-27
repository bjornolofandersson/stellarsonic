<script>
  import * as AudioPlayer from "../lib/AudioPlayer";

  export let track;
  export let playlist;

  const {name, artist, year} = playlist.tracks[track];
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
  <li class="p-4 text-sm flex" style="border-bottom: 1px solid #FFFFFF08">
    {#if isPlaying}
      <button class="mt-2 px-2 opacity-30" on:click={onClick}>
        <span class="material-symbols-outlined">pause</span>
      </button>
    {:else}
      <button class="mt-2 px-2 opacity-30" on:click={onClick}>
        <span class="material-symbols-outlined">play_arrow</span>
      </button>
    {/if}
    <div>
      <span class="text-sm">{name}</span><br/>
      <span class="text-xs opacity-30">{artist} ({year})</span>
    </div>
  </li>
</div>
