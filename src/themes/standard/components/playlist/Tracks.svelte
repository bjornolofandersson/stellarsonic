<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";
  import { post } from '@lib/MixStore';

  let player: MixAudioPlayer;
  let currentTrack: number = 0;
  let isPlaying: boolean = false;
  
  function update() {
    currentTrack = player.getCurrentTrack();
    isPlaying = player.isPlaying(currentTrack);
  }

  post.subscribe(p => {
    if (p.audio) {
      player = MixAudioPlayer.getInstance(p.audio);
      player.setTracks(p.tracks);
      setInterval(update, 100);
    }
  });
</script>

<ul class="columns-1 lg:columns-2">
  {#if player}
  {#each $post.tracks as track, index}
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
        <span class="text-xs" style="color: {currentTrack === index ? $post.colors[1] : 'white'}">{track.name}</span><br/>
        <span class="text-xs opacity-30 -mt-0.1 block">{track.artist} ({track.year})</span>
      </div>
    </li>
  {/each}
  {/if}
</ul>
