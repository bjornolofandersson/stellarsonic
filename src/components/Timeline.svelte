<script lang="ts">
  import { MixAudioPlayer } from "@lib/AudioPlayer";

  export let audio: string;
  export let tracks: any[];
  export let onSelect: any;

  let selected = 0;

  function onSelectTrack(track: number) {
    selected = track;
    onSelect(track);
  }

  let player = MixAudioPlayer.getInstance({audio, tracks} as any);
</script>

<div class="w-full flex">
  {#each tracks as track, i}
    <button on:click={() => onSelectTrack(i)}
      class="border-stone-400 text-stone-700 text-left border px-2 py-4 {selected === i ? 'bg-stone-100' : 'hover:bg-stone-200'}"
      style="width: {player.getTrackDuration(i)}px;">{i + 1}</button>
  {/each}
</div>
