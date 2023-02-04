<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import { NumberInput, TextInput } from "src/editor";
  import PlaylistForm from "./PlaylistForm.svelte";

  export let post: any;
  export let context: {playlist: MixPlaylist, selectedTrack: number};
</script>

<PlaylistForm bind:post={post} bind:context={context}>
  <TextInput id="track-name" label="Name" bind:value={post.tracks[context.selectedTrack].name} />
  <TextInput id="track-artist" label="Artist" bind:value={post.tracks[context.selectedTrack].artist} />
  <NumberInput id="track-year" label="Year" bind:value={post.tracks[context.selectedTrack].year} />
</PlaylistForm>
