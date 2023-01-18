<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";

  export let audio: string;
  export let tracks: any[];
  export let onSelect: (track: number) => void;
  export let selected = 0;

  let progress = 0;

  function onSelectTrack(track: number) {
    selected = track;
    onSelect(track);
  }

  let player = MixAudioPlayer.getInstance({audio, tracks} as any);

  function update() {
    progress = player.getProgress() / player.getMixDuration();
  }

  setInterval(update, 100);
</script>

<div class="w-full">
  <div class="w-full flex justify-start">
    {#each tracks as track, i}
      <button on:click={() => onSelectTrack(i)}
        class="border-stone-700 text-stone-300 text-left border-r px-2 py-8 {selected === i ? 'bg-amber-700' : 'hover:bg-stone-700'}"
        style="width: {(player.getTrackDuration(i) / player.getMixDuration()) * 100}%;">
        {i + 1}
      </button>
    {/each}
  </div>
  <div class="w-full h-4 bg-stone-900 relative">
    <div class="bg-stone-500 h-full" style="width: {progress * 100}%"></div>
  </div>
</div>
