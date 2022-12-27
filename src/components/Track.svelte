<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

  export let track: number;
  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);
  const {name, artist, year} = player.getTrackData(track);
  let isPlaying = false;

  function onClick() {
    if (player.isPlaying(track)) {
      player.pause();
    } else {
      player.play(track)
    }
  }

  function checkIsPlaying() {
    isPlaying = player.isPlaying(track);
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
