<script lang="ts">
  import { title, subtitle, description, colorPrimary, colorSecondary, initialize } from '@lib/MixStore';
  import Post from './Post.svelte';

  export let post: any;
  export let slug: string;

  initialize(post, slug);

</script>

<Post image={post.image} colorPrimary={$colorPrimary}>
  <article>
    <slot name="article"/>
  </article>
  <section slot="header-left" class="text-white mt-12 md:px-8 py-8">
    <h1 class="text-4xl font-title">{$title}</h1>
    <h2 class="text-xl" style={`color: ${$colorSecondary}`}>{$subtitle}</h2>
    <p class="text-white opacity-40 text-sm mt-8">{$description}</p>
  </section>
  <section slot="header-right">
    <div class="md:-mt-40">
      <slot name="controls"/>
    </div>
    <div class="mt-8 md:mt-20">
      <slot name="tracks"/>
    </div>
  </section>
</Post>
