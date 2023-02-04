<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import { NumberInput, TextInput } from "src/editor";
  import PlaylistForm from "./PlaylistForm.svelte";

  export let post: any;
  export let playlist: MixPlaylist;
  export let track: number;
</script>

<PlaylistForm bind:post={post} bind:playlist={playlist} bind:track={track} >
  <TextInput id="track-name" label="Name" bind:value={post.tracks[track].name} />
  <TextInput id="track-artist" label="Artist" bind:value={post.tracks[track].artist} />
  <NumberInput id="track-year" label="Year" bind:value={post.tracks[track].year} />
</PlaylistForm>
