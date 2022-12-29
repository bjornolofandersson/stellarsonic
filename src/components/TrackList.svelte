<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix } from "../lib/interfaces";

  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);
  let currentTrack: number = 0;
  let isPlaying: boolean = false;

  function onClick(track: number) {
    if (player.isPlaying(track)) {
      player.pause();
    } else {
      player.play(track)
    }
  }

  function update() {
    currentTrack = player.getCurrentTrack();
    isPlaying = player.isPlaying(currentTrack);
  }

  setInterval(update, 100);
</script>

<div>
  <ul class="columns-1 lg:columns-2 px-8 lg:px-20">
    {#each playlist.tracks as track, index}
      <li class="py-4 text-sm flex">
        {#if (index === currentTrack) && isPlaying}
          <button class="mt-2 px-2 opacity-30" on:click={() => onClick(index)}>
            <span class="material-symbols-outlined">pause</span>
          </button>
        {:else}
          <button class="mt-2 px-2 opacity-30" on:click={() => onClick(index)}>
            <span class="material-symbols-outlined">play_arrow</span>
          </button>
        {/if}
        <div>
          <span class="text-xs" style="color: {currentTrack === index ? playlist.colors[2] : 'white'}">{track.name}</span><br/>
          <span class="text-xs opacity-30 -mt-0.1 block">{track.artist} ({track.year})</span>
        </div>
      </li>
    {/each}
  </ul>
</div>
