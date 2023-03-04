<script lang="ts">
  import Controls from '@theme/playlist/PlaylistControls.svelte';
  import Tracks from '@theme/playlist/PlaylistTracks.svelte';
  import Post from '../common/Post.svelte';

  export let post: any;
  export let playlist: any;
</script>

<Post image={post.image}>
  <slot name="menu" slot="menu"/>
  <section slot="header-right" class="mt-12 md:px-8 py-8">
    <div class="shadow-lg overflow-hidden relative aspect-square" style="padding-bottom: 100%; margin-top: -250px">
      <img class="absolute w-full h-full object-cover" src={post.image} alt=""/>
    </div>
    <h1 class="text-h1 text-4xl font-title">{post.title}</h1>
    <h2 class="text-h2 text-xl">{post.subtitle || ''}</h2>
    <p class="text-p text-white opacity-40 text-sm mt-8">{post.description}</p>
  </section>
  <section slot="header-left">
    <div class="md:-mt-40">
      <Controls playlist={playlist}/>
    </div>
    <div class="mt-8 md:mt-20">
      <Tracks playlist={playlist} />
    </div>
  </section>
  <article>
    <slot name="article"/>
  </article>
</Post>
