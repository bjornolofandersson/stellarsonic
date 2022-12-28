<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

  export let track: number;
  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);
  const {name, artist, year} = player.getTrackData(track);
  let isPlaying = false;
  let color = '#FFFFFF';

  function onClick() {
    if (player.isPlaying(track)) {
      player.pause();
    } else {
      player.play(track)
    }
  }

  function checkIsPlaying() {
    isPlaying = player.isPlaying(track);
    color = player.getCurrentTrack() === track ? playlist.colors[2] : '#ffffff';
  }

  setInterval(checkIsPlaying, 100);

</script>

<div>
  <li class="py-4 text-sm flex">
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
      <span class="text-xs" style="color: {color}">{name}</span><br/>
      <span class="text-xs opacity-30 -mt-0.1 block">{artist} ({year})</span>
    </div>
  </li>
</div>
