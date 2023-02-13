<script lang="ts">
  import { MixStore } from './playlist';
  import Playlist from '@theme/playlist/PlaylistPost.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore } from '@modules/page/page';

  export let slug: string;
  export let data: any;
  export let page: any;

  let {post, playlist} = MixStore.instance(slug, data);
  let {page: storedPage} = PageStore.instance(page, {});
</script>

<Playlist bind:post={$post} bind:page={$storedPage.data} playlist={playlist}>
  <slot/>
  <slot slot="menu" name="menu"/>

  <Content style={page.data.style} slot="article">
    <slot name="article"/>
  </Content>
</Playlist>
