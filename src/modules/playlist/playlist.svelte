<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import { PageStore } from '@modules/page/page';
  import { Entity, MusicMixPost } from '@lib/interfaces';
  import MenuBar from '@theme/MenuBar.svelte';

  export let entity: Entity<MusicMixPost>;
  export let page: Entity<any>;
  export let navigation: any;

  let {entity: storedPost, playlist} = MixStore.instance(entity);
  let {entity: storedPage} = PageStore.instance(page);
</script>

<Playlist bind:post={$storedPost.data} bind:page={$storedPage.data} playlist={playlist}>
  <div slot="menu" class="{$storedPage.data.menu}">
    <MenuBar sitemap={navigation} />
  </div>
  <slot slot="article" name="article"/>
</Playlist>
