<script lang="ts">
  import Description from "@components/editor/content/Description.svelte";
  import Headings from "@components/editor/content/Headings.svelte";
  import Image from "@components/editor/content/Image.svelte";
  import type { Article } from "./article.server";

  export let content: Article;
  export let assets: any[];
</script>

<Image bind:post={content} assets={assets} />
<Headings bind:post={content} />
<Description bind:post={content} />
