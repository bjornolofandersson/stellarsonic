<script lang="ts">
  import { MixStore } from '@lib/media/Stellarsonic';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';

  export let slug: string;
  export let data: any;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Playlist bind:post={$post} playlist={playlist}>
  <slot/>
  <slot slot="menu" name="menu"/>
  <slot slot="article" name="article"/>
</Playlist>
