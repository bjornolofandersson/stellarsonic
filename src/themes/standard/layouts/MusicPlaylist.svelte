<script lang="ts">
  import { post } from '@lib/MixStore';
  import Post from './Post.svelte';
</script>

<Post image={$post.image} colorPrimary={$post.colors[0]}>
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
      <slot name="controls"/>
    </div>
    <div class="mt-8 md:mt-20">
      <slot name="tracks"/>
    </div>
  </section>
</Post>
