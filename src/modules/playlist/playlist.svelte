<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import type { Entity } from '@lib/interfaces';
  import MenuBar from '@theme/MenuBar.svelte';
  import type { MusicMix } from './playlist.server';

  export let entity: Entity<MusicMix>;
  export let navigation: any;

  let {entity: storedPost, playlist} = MixStore.instance(entity);
</script>

<Playlist post={$storedPost.data} playlist={playlist}>
  <div slot="menu">
    <MenuBar sitemap={navigation} />
  </div>
  <slot slot="article" name="article"/>
</Playlist>
