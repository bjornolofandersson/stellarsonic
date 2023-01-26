<script lang="ts">
  import Controls from './PreviewControls.svelte';
  import PreviewPlayButton from '../PreviewPlayButton.svelte';
  import PostPreview from '../../layouts/PostPreview.svelte';
  import { MixStore } from '@lib/media/Stellarsonic';

  export let slug: string;
  export let data: any;

  const {post, playlist} = MixStore.instance(slug, data);

  const date = new Date($post.date).toDateString();
</script>

<PostPreview image={$post.image} url={`/mixes/${slug}`} categories={$post.genres} date={date}>
  <div class="flex">
    <PreviewPlayButton playlist={playlist} />
    <div>
      <h1 class="font-title text-slate-600 dark:text-slate-200 text-3xl">{$post.title}</h1>
      <h2 class="font-primary text-l text-accent">{$post.subtitle}</h2>
    </div>
  </div>
  <p class="font-primary text-md py-6 opacity-60 dark:text-slate-200">{$post.description}</p>
  <Controls playlist={playlist} />
</PostPreview>
