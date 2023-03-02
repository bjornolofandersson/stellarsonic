<script lang="ts">
  import { MixPlaylist } from "@modules/playlist/playlist";
  import { formatTime } from "@lib/utils";
  import Action from "src/editor/Action.svelte";
  import Toolbar from "src/editor/Toolbar.svelte";
  import Timeline from "../Timeline.svelte";
  import Timestamp from "../Timestamp.svelte";

  export let post: any;
  export let playlist: MixPlaylist;
  export let track: number;

  let timerId: any;
  let isPlaying: boolean = false;
  let progress: number = 0;
  const hasAudio = playlist.player.duration > 0;

  function onUpdateBegin(amount: number) {
    playlist.trackBegin(track, playlist.trackBegin(track) + amount);
    post.tracks[track].duration = "";
  }
  function onUpdateEnd(amount: number) {
    playlist.trackEnd(track, playlist.trackEnd(track) + amount);
    post.tracks[track].duration = "";
  }

  setInterval(() => {
    isPlaying = !playlist.player.isPaused;
    progress = playlist.player.progress;
  }, 100);
</script>

<div on:mouseup={() => clearInterval(timerId) } class="text-stone-100 dark flex flex-col h-full">
  <Toolbar>
    <svelte:fragment slot="left">
      <Action icon="skip_previous" disabled={!hasAudio} onClick={() => {}}/>
      {#if !isPlaying }
        <Action icon="play_arrow" disabled={!hasAudio} onClick={() => {playlist.play()}}/>
      {:else}
        <Action icon="pause" disabled={!hasAudio} onClick={() => {playlist.player.pause()}}/>
      {/if}
      <Action icon="skip_next" disabled={!hasAudio} onClick={() => {}}/>
    </svelte:fragment>

    <svelte:fragment slot="middle">
      <span class="text-sm text-stone-400">{formatTime(progress)}</span>
    </svelte:fragment>
    
    <slot name="actions" slot="right" />
  </Toolbar>

  {#key post}
    <Timeline playlist={playlist} onSelect={t => {track = t}} selected={track} />
    <div class="flex-grow">
      <div class="grid grid-cols-2 gap-4">
        <Timestamp label="From" time={playlist.trackBegin(track)} onUpdate={onUpdateBegin} bind:timerId={timerId} editable={track > 0}/>
        <Timestamp label="To" time={playlist.trackEnd(track)} onUpdate={onUpdateEnd} bind:timerId={timerId} />
      </div>

      <div class="mt-8 p-8">
        <slot/>
      </div>
    </div>
    <div class="p-8">
      <slot name="footer"/>
    </div>
  {/key}
</div>
