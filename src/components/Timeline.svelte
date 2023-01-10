<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";

  export let audio: string;
  export let tracks: any[];
  export let onSelect: any;

  let selected = 0;
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
        class="border-stone-400 text-stone-700 text-left border px-2 py-4 {selected === i ? 'bg-stone-100' : 'hover:bg-stone-200'}"
        style="width: {(player.getTrackDuration(i) / player.getMixDuration()) * 100}%;">{i + 1}</button>
    {/each}
  </div>
  <div class="w-full h-2 bg-stone-800 relative">
    <div class="bg-stone-500 h-full" style="width: {progress * 100}%"></div>
  </div>
</div>
