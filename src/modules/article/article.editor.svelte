<script lang="ts">
  import DescriptionForm from "@components/editor/forms/DescriptionForm.svelte";
  import HeadingsForm from "@components/editor/forms/HeadingsForm.svelte";
  import ImageForm from "@components/editor/forms/ImageForm.svelte";
  import type { Entity } from "@lib/interfaces";
  import { loadEntity } from "@lib/store";
  import type { Article } from "./article.server";

  export let entity: Entity<Article>;
  export let assets: any[];

  const article = loadEntity(entity);
</script>

<ImageForm bind:post={$article.data} assets={assets} />
<HeadingsForm bind:post={$article.data} />
<DescriptionForm bind:post={$article.data} />
