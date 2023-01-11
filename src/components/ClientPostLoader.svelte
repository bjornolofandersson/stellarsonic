<script lang="ts">
  import * as store from '@lib/MixStore';

  export let collection: string;
  export let slug: string;

  fetch(`/${collection}/${slug}.json`).then(async resp => {
    const post = await resp.json();
    store.post.set(post);
    store.slug.set(slug);
  });
</script>
