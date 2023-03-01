<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { loadEntity } from "@lib/store";

  export let template: Entity<any>;
  export let page: Entity<any>;

  const t = loadEntity(template);
  const p = loadEntity(page);
</script>

<main class="bg-slate-100 dark:bg-dark-base" style={`
  --theme-bg-primary: ${$p.data.palette[$t.data.colors.background.primary]};
  --theme-bg-secondary: ${$p.data.palette[$t.data.colors.background.secondary]};
  --theme-bg-tertiary: ${$p.data.palette[$t.data.colors.background.tertiary]};
  --theme-bg-article: ${$p.data.palette[$t.data.colors.background.article]};
  --theme-text-h1: ${$p.data.palette[$t.data.colors.text.h1]};
  --theme-text-h2: ${$p.data.palette[$t.data.colors.text.h2]};
  --theme-text-p: ${$p.data.palette[$t.data.colors.text.p]};
  --theme-text-a: ${$p.data.palette[$t.data.colors.text.a]};
  --theme-text-active: ${$p.data.palette[$t.data.colors.text.active]};
  --theme-text-article-h1: ${$p.data.palette[$t.data.colors.textArticle.h1]};
  --theme-text-article-h2: ${$p.data.palette[$t.data.colors.textArticle.h2]};
  --theme-text-article-p: ${$p.data.palette[$t.data.colors.textArticle.p]};
  --theme-text-article-a: ${$p.data.palette[$t.data.colors.textArticle.a]};
  --theme-palette-1: ${$p.data.palette[0]};
  --theme-palette-2: ${$p.data.palette[1]};
  --theme-palette-3: ${$p.data.palette[2]};
  --theme-palette-4: ${$p.data.palette[3]};
  --theme-font-h1: ${$t.data.fontFamily.h1};
  --theme-font-p: ${$t.data.fontFamily.p};
  --theme-font-button: ${$t.data.fontFamily.button};
  --theme-font-weight-h1: ${$t.data.fontWeight.h1};
  --theme-font-weight-p: ${$t.data.fontWeight.p};
  --theme-font-weight-button: ${$t.data.fontWeight.button};
  --theme-font-size-h1: ${$t.data.fontSize.h1}rem;
  --theme-font-size-p: ${$t.data.fontSize.p}rem;
  --theme-font-size-button: ${$t.data.fontSize.button}rem;
  --theme-text-align: ${$t.data.textAlign};
`}>
  <slot/>
</main>

<style>
  main :global(.bg-primary) {
    background-color: var(--theme-bg-primary);
  }
  main :global(.bg-secondary) {
    background-color: var(--theme-bg-secondary);
  }
  main :global(.bg-tertiary) {
    background-color: var(--theme-bg-tertiary);
  }
  main :global(.bg-article) {
    background-color: var(--theme-bg-article);
  }
  main :global(.text-h1) {
    color: var(--theme-text-h1);
  }
  main :global(.text-h2) {
    color: var(--theme-text-h2);
  }
  main :global(.text-p) {
    color: var(--theme-text-p);
  }
  main :global(.text-a) {
    color: var(--theme-text-a);
  }
  main :global(.text-active) {
    color: var(--theme-text-active);
  }
  main :global(.text-article-h1) {
    color: var(--theme-text-article-h1);
  }
  main :global(.text-article-h2) {
    color: var(--theme-text-article-h2);
  }
  main :global(.text-article-p) {
    color: var(--theme-text-article-p);
  }
  main :global(.text-article-a) {
    color: var(--theme-text-article-a);
  }

  main :global(.bg-palette-1) {
    background-color: var(--theme-palette-1);
  }
  main :global(.bg-palette-2) {
    background-color: var(--theme-palette-2);
  }
  main :global(.bg-palette-3) {
    background-color: var(--theme-palette-3);
  }
  main :global(.bg-palette-4) {
    background-color: var(--theme-palette-4);
  }
  main :global(.text-palette-1) {
    color: var(--theme-palette-1);
  }
  main :global(.text-palette-2) {
    color: var(--theme-palette-2);
  }
  main :global(.text-palette-3) {
    color: var(--theme-palette-3);
  }
  main :global(.text-palette-4) {
    color: var(--theme-palette-4);
  }
  main :global(.font-title) {
    font-family: var(--theme-font-h1);
    font-weight: var(--theme-font-weight-h1);
  }
  main :global(.font-primary) {
    font-family: var(--theme-font-p);
    font-weight: var(--theme-font-weight-p);
  }
  main :global(.site-title) {
    font-family: var(--theme-font-3);
  }
  main :global(h1) {
    font-size: var(--theme-font-size-h1);
  }
  main :global(p) {
    font-family: var(--theme-font-p);
    font-size: var(--theme-font-size-p);
    font-weight: var(--theme-font-weight-p);
  }
  main :global(button) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
  }
  main :global(a) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
  }
  main :global(.article-body) {
    background-color: var(--theme-bg-article);
    text-align: var(--theme-text-align);
  }
  main :global(.article-body h1) {
    font-family: var(--theme-font-h1);
  }
  main :global(.article-body p) {
    padding: 20px 0;
    font-family: var(--theme-font-p);
  }
</style>
