<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";
  import { MusicMix } from "@lib/interfaces";

  export let slug: string;

  let tracks: any[] = [];
  let highlightColor = '#ffffff';
  let player: MixAudioPlayer;
  let currentTrack: number = 0;
  let isPlaying: boolean = false;

  function update() {
    currentTrack = player.getCurrentTrack();
    isPlaying = player.isPlaying(currentTrack);
  }

  fetch(`/mixes/${slug}.json`).then(async resp => {
    const playlist: MusicMix = await resp.json();
    tracks = playlist.tracks;
    highlightColor = playlist.colors[1];
    player = MixAudioPlayer.getInstance(playlist);
    setInterval(update, 100);
  });
</script>

<ul class="columns-1 lg:columns-2">
  {#if player}
  {#each tracks as track, index}
    <li class="py-4 text-sm flex">
      {#if (index === currentTrack) && isPlaying}
        <button class="mt-2 px-2 opacity-30" on:click={() => player.pause()}>
          <span class="material-symbols-outlined">pause</span>
        </button>
      {:else}
        <button class="mt-2 px-2 opacity-30" on:click={() => player.play(index) }>
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
      {/if}
      <div>
        <span class="text-xs" style="color: {currentTrack === index ? highlightColor : 'white'}">{track.name}</span><br/>
        <span class="text-xs opacity-30 -mt-0.1 block">{track.artist} ({track.year})</span>
      </div>
    </li>
  {/each}
  {/if}
</ul>
