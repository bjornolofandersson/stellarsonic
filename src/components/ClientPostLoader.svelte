<script lang="ts">
  import { initialize } from '@lib/MixStore';

  export let collection: string;
  export let slug: string;

  fetch(`/${collection}/${slug}.json`).then(async resp => {
    const post = await resp.json();
    initialize(post, slug);
  });
</script>
