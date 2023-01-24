<script lang="ts">
  import { MixPlaylist } from '@lib/media/MixPlaylist';
  import { Stellarsonic } from '@lib/media/Stellarsonic';
  import { post } from '@lib/MixStore';

  export let slug: string;

  let playlist: MixPlaylist;
  let currentTrack: number = 0;

  const post = Stellarsonic.readablePost('mixes', slug);
  /*
  Stellarsonic.watchCurrentMixPlaylist(p => {
    playlist = p;
    currentTrack = playlist.currentTrack;
  });
  */
</script>

<ul class="columns-1 lg:columns-2">
  {#if playlist}
  {#each playlist.tracks as track, index}
    <li class="py-4 text-sm flex">
      {#if (index === currentTrack) && !playlist.player.isPaused}
        <button class="mt-2 px-2 opacity-30" on:click={() => playlist.player.pause()}>
          <span class="material-symbols-outlined">pause</span>
        </button>
      {:else}
        <button class="mt-2 px-2 opacity-30" on:click={() => playlist.play(index) }>
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
      {/if}
      <div>
        <span class="text-xs" style="color: {currentTrack === index ? $post.colors[1] : 'white'}">{track.name}</span><br/>
        <span class="text-xs opacity-30 -mt-0.1 block">{track.artist} ({track.year})</span>
      </div>
    </li>
  {/each}
  {/if}
</ul>
