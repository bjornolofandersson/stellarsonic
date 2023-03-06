<script lang="ts">
  import DescriptionForm from "@components/editor/forms/DescriptionForm.svelte";
  import HeadingsForm from "@components/editor/forms/HeadingsForm.svelte";
  import ImageForm from "@components/editor/forms/ImageForm.svelte";
  import type { Article } from "./article.server";

  export let content: Article;
  export let assets: any[];
</script>

<ImageForm bind:post={content} assets={assets} />
<HeadingsForm bind:post={content} />
<DescriptionForm bind:post={content} />
