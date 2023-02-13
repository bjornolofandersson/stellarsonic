<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import Content from '@components/common/Content.svelte';

  export let slug: string;
  export let data: any;
  export let page: any;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Playlist bind:post={$post} playlist={playlist}>
  <slot/>
  <slot slot="menu" name="menu"/>

  <Content style={page.data.style} slot="article">
    <slot name="article"/>
  </Content>
</Playlist>
