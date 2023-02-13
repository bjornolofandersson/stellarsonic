<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore } from '@modules/page/page';
  import { Entity, MusicMixPost } from '@lib/interfaces';

  export let entity: Entity<MusicMixPost>;
  export let page: Entity<any>;

  let {entity: storedPost, playlist} = MixStore.instance(entity);
  let {entity: storedPage} = PageStore.instance(page, {});
</script>

<Playlist bind:post={$storedPost.data} bind:page={$storedPage.data} playlist={playlist}>
  <slot/>
  <slot slot="menu" name="menu"/>

  <Content style={$storedPage.data.style} slot="article">
    <slot name="article"/>
  </Content>
</Playlist>
