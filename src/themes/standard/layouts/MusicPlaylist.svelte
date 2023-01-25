<script lang="ts">
  import { MixStore } from '@lib/media/Stellarsonic';
  import Controls from '@theme/components/playlist/Controls.svelte';
  import Tracks from '@theme/components/playlist/Tracks.svelte';
  import Post from './Post.svelte';

  export let slug: string;
  export let data: any;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Post image={$post.image} colorPrimary={$post.colors[0]}>
  <div slot="menu">
    <slot name="menu"/>
  </div>
  <article>
    <slot name="article"/>
  </article>
  <section slot="header-left" class="text-white mt-12 md:px-8 py-8">
    <h1 class="text-4xl font-title">{$post.title}</h1>
    <h2 class="text-xl" style={`color: ${$post.colors[1]}`}>{$post.subtitle || ''}</h2>
    <p class="text-white opacity-40 text-sm mt-8">{$post.description}</p>
  </section>
  <section slot="header-right">
    <div class="md:-mt-40">
      <Controls playlist={playlist} bind:post={post}/>
    </div>
    <div class="mt-8 md:mt-20">
      <Tracks playlist={playlist} bind:post={post} />
    </div>
  </section>
</Post>
