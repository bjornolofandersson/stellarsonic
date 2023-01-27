<script lang="ts">
  import PostPreview from '../layouts/PostPreview.svelte';

  export let collection: string;
  export let slug: string;
  export let post: any;

  const date = new Date(post.date).toDateString();
</script>

<PostPreview image={post.image} url={`/${collection}/${slug}`} categories={post.genres} date={date}>
  <div class="flex">
    <div>
      <h1 class="font-title text-slate-600 dark:text-slate-200 text-3xl">{post.title}</h1>
      <h2 class="font-primary text-l text-accent">{post.subtitle}</h2>
    </div>
  </div>
  <p class="font-primary text-md py-6 opacity-60 dark:text-slate-200">{post.description}</p>
</PostPreview>
