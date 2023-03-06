<script lang="ts">
  import { MixPlaylist } from '@modules/playlist/playlist';

  export let playlist: MixPlaylist;

  let currentTrack: number = 0;

  function update() {
    currentTrack = playlist.currentTrack;
  }

  setInterval(update, 100);
</script>

<ul class="columns-1 lg:columns-2">
  {#each playlist.tracks as track, i}
    <li class="py-4 text-sm flex">
      {#if (i === currentTrack) && !playlist.player.isPaused}
        <button class="play-button mt-2 px-2" on:click={() => playlist.player.pause()}>
          <span class="material-symbols-outlined">pause</span>
        </button>
      {:else}
        <button class="play-button mt-2 px-2" on:click={() => playlist.play(i) }>
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
      {/if}
      <div>
        <span class="text-xs {currentTrack === i ? 'text-accent' : 'text-primary'}">
          {track.name}
        </span>
        <br/>
        <span class="text-xs opacity-40 -mt-0.1 block">{track.artist} ({track.year})</span>
      </div>
    </li>
  {/each}
</ul>

<style>
  .play-button:hover {
    color: var(--theme-cg1-text-accent);
  }
</style>
