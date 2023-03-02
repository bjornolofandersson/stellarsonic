<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import type { Entity } from '@lib/interfaces';
  import MenuBar from '@theme/MenuBar.svelte';
  import type { MusicMix } from './playlist.server';
  import * as store from '@lib/store';

  export let entity: Entity<MusicMix>;
  export let site: any;

  let {entity: storedPost, playlist} = MixStore.instance(entity);
  store.site.set(site);
  const s = store.site;
</script>

<Playlist post={$storedPost.data} playlist={playlist}>
  <div slot="menu">
    <MenuBar site={$s} />
  </div>
  <slot slot="article" name="article"/>
</Playlist>
