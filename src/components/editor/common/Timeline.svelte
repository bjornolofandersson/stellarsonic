<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import { post } from '@lib/MixStore';

  export let playlist: MixPlaylist;
  export let onSelect: (track: number) => void;
  export let selected = 0;

  let progress = 0;

  function onSelectTrack(track: number) {
    selected = track;
    onSelect(track);
  }

  function update() {
    progress = playlist.player.progress / playlist.duration;
  }

  setInterval(update, 100);
</script>

<div class="w-full">
  <div class="w-full flex justify-start">
    {#each playlist.tracks as track, i}
      <button on:click={() => onSelectTrack(i)}
        class="border-stone-700 text-stone-300 text-left border-r px-2 py-8 {selected === i ? 'bg-amber-700' : 'hover:bg-stone-700'}"
        style="width: {(playlist.trackDuration(i) / playlist.duration) * 100}%;">
        {i + 1}
      </button>
    {/each}
  </div>
  <div class="w-full h-4 bg-stone-900 relative">
    <div class="bg-stone-500 h-full" style="width: {progress * 100}%"></div>
  </div>
</div>
