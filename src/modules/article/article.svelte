<script lang="ts">
  import ArticleTheme from '@theme/Article.svelte';
  import type { Entity } from '@lib/interfaces';
  import type { Article } from './article.server';
  import { loadEntity } from '@lib/store';

  export let entity: Entity<Article>;
  export let site: any;

  const article = loadEntity(entity);
</script>

<ArticleTheme data={$article.data} site={site}>
  <slot/>
</ArticleTheme>
