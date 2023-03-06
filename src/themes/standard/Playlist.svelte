<script lang="ts">
  import { MixPlaylist } from '@modules/playlist/playlist';
  import type { MusicMix } from '@modules/playlist/playlist.server';
  import Controls from '@theme/playlist/PlaylistControls.svelte';
  import Tracks from '@theme/playlist/PlaylistTracks.svelte';
  import Post from './common/Post.svelte';

  export let data: MusicMix;
  export let site: any;

  const playlist = MixPlaylist.fromContent(data);
</script>

<Post site={site}>
  <section slot="header-right" class="md:px-8 py-8">
    <div class="relative mb-20 -mt-20">
      <div class="absolute bg-accent aspect-square w-full h-full -ml-10 -rotate-6 shadow-2xl" />
      <div class="block aspect-square rotate-6 shadow-2xl">
        <img class="w-full h-full object-cover shadow-2xl" src={data.image} alt=""/>
      </div>
    </div>
    <h1 class="bg-primary text-primary text-4xl font-title">{data.title}</h1>
    <h2 class="text-accent text-xl">{data.subtitle || ''}</h2>
    <p class="text-p text-white text-sm mt-8">{data.description}</p>
  </section>
  <section slot="header-left">
    <div class="">
      <Controls playlist={playlist}/>
    </div>
    <div class="mt-8 md:mt-20">
      <Tracks playlist={playlist} />
    </div>
  </section>
  <article>
    <slot/>
  </article>
</Post>
