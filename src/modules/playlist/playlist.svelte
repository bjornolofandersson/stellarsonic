<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import type { Entity } from '@lib/interfaces';
  import MenuBar from '@theme/MenuBar.svelte';
  import type { MusicMix } from './playlist.server';
  import { loadEntity } from '@lib/store';

  export let entity: Entity<MusicMix>;
  export let page: Entity<any>;
  export let navigation: any;

  let {entity: storedPost, playlist} = MixStore.instance(entity);

  const storedPage = loadEntity(page);
</script>

<Playlist post={$storedPost.data} page={$storedPage.data} playlist={playlist}>
  <div slot="menu" class="{$storedPage.data.menu}">
    <MenuBar sitemap={navigation} />
  </div>
  <slot slot="article" name="article"/>
</Playlist>
