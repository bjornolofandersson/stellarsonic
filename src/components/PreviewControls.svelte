<script lang="ts">
  import { MixAudioPlayer } from "../lib/AudioPlayer";
  import { MusicMix, MusicTrack } from "../lib/interfaces";
  import ProgressBar from "./ProgressBar.svelte";

  export let playlist: MusicMix;

  const player = MixAudioPlayer.getInstance(playlist);

  let isPlaying = false;
  let trackNr: number = 1;
  let track: any = {};

  function update() {
    isPlaying = player.isPlaying();
    trackNr = player.getCurrentTrack();
    track = player.getTrackData(trackNr);
  }

  setInterval(update, 100);

</script>

<div class="w-full">
  <div class="flex justify-between">
    <button class="mt-2 text-slate-600" on:click={() => player.skipPrev()}>
      <span class="material-symbols-outlined">skip_previous</span> 
    </button>

    <div class="text-xs mt-2 opacity-30">{track.name}</div>

    <button class="mt-2 text-slate-600" on:click={() => player.skipNext()}>
      <span class="material-symbols-outlined">skip_next</span> 
    </button>
  </div>

  <ProgressBar player={player} trackColor="#00000020" progressColor="#d77f7a"/>
</div>

<style>
  .material-symbols-outlined {
    font-size: 18px;
  }
</style>
