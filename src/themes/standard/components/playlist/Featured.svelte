<script lang="ts">
  import PostFeatured from "@theme/layouts/PostFeatured.svelte";

  export let slug: string;
  export let data: any;
</script>

<PostFeatured post={data}>
  <h1 class="text-6xl font-title">{data.title}</h1>
  <h2 class="text-xl text-accent">{data.subtitle}</h2>
  <p class="text-lg block mt-12 font-primary">{data.description}</p>
</PostFeatured>
