<script lang="ts">
  import Controls from '@theme/playlist/PlaylistControls.svelte';
  import Tracks from '@theme/playlist/PlaylistTracks.svelte';
  import Post from '../common/Post.svelte';

  export let post: any;
  export let page: any
  export let playlist: any;
</script>

<Post image={post.image} palette={page.palette}>
  <div slot="menu">
    <slot name="menu"/>
  </div>
  <article>
    <slot name="article"/>
  </article>
  <section slot="header-left" class="text-palette-2 mt-12 md:px-8 py-8">
    <h1 class="text-4xl font-title">{post.title}</h1>
    <h2 class="text-xl text-palette-2">{post.subtitle || ''}</h2>
    <p class="text-white opacity-40 text-sm mt-8">{post.description}</p>
  </section>
  <section slot="header-right">
    <div class="md:-mt-40">
      <Controls playlist={playlist} palette={page.palette}/>
    </div>
    <div class="mt-8 md:mt-20">
      <Tracks playlist={playlist} />
    </div>
  </section>
</Post>
