<script lang="ts">
  import { MixPlaylist } from "@lib/media/MixPlaylist";
  import { Input } from "src/editor";
  import PlaylistForm from "./PlaylistForm.svelte";

  export let post: any;
  export let playlist: MixPlaylist;
  export let track: number;
</script>

<PlaylistForm bind:post={post} bind:playlist={playlist} bind:track={track} >
  <Input type="text" id="track-name" label="Name" bind:value={post.tracks[track].name} />
  <Input type="text" id="track-artist" label="Artist" bind:value={post.tracks[track].artist} />
  <Input type="number" id="track-year" label="Year" bind:value={post.tracks[track].year} />
</PlaylistForm>
